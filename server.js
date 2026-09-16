const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, 'public');
const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(__dirname, 'data.json');
const MYSTERY_FILE = path.join(__dirname, 'mystery.json');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const DUEL_STAKES = [50000,100000,200000,500000,1000000,5000000,10000000];
const JOBS = {mine:{reward:120,seconds:30,real:5},cyber:{reward:1000,seconds:15,real:15},stock:{reward:4000,seconds:5,real:45}};
const DUEL_CATS = ['Auto','Mansión','Animal','Joya','Yate','Jet'];
const MYSTERY_REWARDS = [
  {id:'mystery_emerald_hoodie',type:'Prenda',name:'Emerald Wealth Hoodie',icon:'🧥',value:25000},
  {id:'mystery_shadow_gt',type:'Vehículo',name:'Shadow GT — Wealth Edition',icon:'🏎️',value:850000}
];
let ITEMS=[];
try { ITEMS=JSON.parse(fs.readFileSync(path.join(root,'items-catalog.json'),'utf8')); } catch {}
const itemById = id => ITEMS.find(x=>x.id===id);
const assetsOf = a => (a.owned||[]).map(itemById).filter(Boolean).reduce((n,x)=>n+Number(x.price||0),0);
const netWorth = a => Number(a.money||0)+assetsOf(a);
const levelOf = a => Math.floor(Number(a.xp||0)/100)+1;

function readJson(file, fallback){ try{return JSON.parse(fs.readFileSync(file,'utf8'));}catch{return fallback;} }
let db = readJson(DATA_FILE, {accounts:{}});
let mystery = readJson(MYSTERY_FILE, {startedAt:null,sold:0,claims:[]});
const sessions = new Map();
const resetTokens = new Map();
const duelLocks = new Set();

function saveDb(){ fs.writeFileSync(DATA_FILE, JSON.stringify(db,null,2)); }
function saveMystery(){ fs.writeFileSync(MYSTERY_FILE, JSON.stringify(mystery,null,2)); }
function json(res, code, data){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
function body(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',c=>{raw+=c;if(raw.length>1e6) req.destroy();});req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{});}catch{reject(new Error('JSON inválido'));}});req.on('error',reject);});}
function hashPassword(pass,salt){return crypto.scryptSync(pass,salt,64).toString('hex');}
function makeAccount(overrides={}){return {money:100000,xp:0,owned:[],profile:{country:'República Dominicana',bio:'',instagram:'',tiktok:'',youtube:'',x:'',telegram:'',discord:''},email:'',generators:{},generatorSeconds:0,generatorSecondsDate:new Date().toISOString().slice(0,10),...overrides};}
function publicAccount(a){const x=JSON.parse(JSON.stringify(a));delete x.passwordHash;delete x.salt;delete x.email;return x;}
function authUser(req){const token=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');return sessions.get(token)||null;}
function cleanName(v){return String(v||'').trim().toLowerCase();}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||'').trim());}
function publicMap(){const out={};for(const [n,a] of Object.entries(db.accounts))out[n]=publicAccount(a);return out;}
function ensureSeedAccounts(){
  const seed=(name,email,password,money,xp,owned,bio)=>{
    if(db.accounts[name]) return;
    const salt=crypto.randomBytes(16).toString('hex');
    const a=makeAccount({email,salt,passwordHash:hashPassword(password,salt),money,xp,owned,profile:{country:'República Dominicana',bio,instagram:'',tiktok:'',youtube:'',x:'',telegram:'',discord:''}});
    db.accounts[name]=a;
  };
  const all=ITEMS.map(x=>x.id);
  seed('wealthking','demo@wealthduels.test','WealthDuels2026!',9999999999,5000,all,'Cuenta de demostración con patrimonio gigante para probar el juego.');
  seed('duelbot','bot@wealthduels.test','DuelBot2026!',250000000,1200,['chiron','koenig','pagani','dubai','beverly','miami','superyacht','global','private','daytona','astronomia','ring'],'Rival automático de práctica.');
  seed('luxurypro','pro@wealthduels.test','Luxury2026!',75000000,850,['sf90','urus','rolls','penthouse','monaco','ocean','gulf','nautilus','cartierlove'],'Coleccionista de prueba.');
  saveDb();
}
ensureSeedAccounts();

function mysteryStatus(){
  const now=Date.now();
  if(mystery.startedAt && now-mystery.startedAt>=24*3600000){mystery={startedAt:null,sold:0,claims:[]};saveMystery();}
  const remaining=mystery.startedAt?Math.max(0,24*3600000-(now-mystery.startedAt)):24*3600000;
  return {sold:mystery.sold,limit:100,remainingMs:remaining,active:mystery.sold<100&&(!mystery.startedAt||remaining>0),startsOnFirstPurchase:!mystery.startedAt};
}
function sendRecoveryEmail(email,link){
  if(!process.env.RESEND_API_KEY||!process.env.FROM_EMAIL) return Promise.resolve(false);
  return fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.FROM_EMAIL,to:[email],subject:'Wealth Duels — Recupera tu contraseña',html:`<div style="font-family:Arial;background:#07100b;color:#fff;padding:32px"><h1>WEALTH DUELS</h1><p>Recibimos una solicitud para cambiar tu contraseña.</p><p><a href="${link}" style="display:inline-block;background:#39dc88;color:#07100b;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:bold">CAMBIAR CONTRASEÑA</a></p><p>Este enlace expira en 30 minutos.</p></div>`})}).then(r=>r.ok).catch(()=>false);
}
function duelScore(a,cat){const vals=(a.owned||[]).map(itemById).filter(x=>x&&x.cat===cat).map(x=>Number(x.price||0));return vals.length?Math.max(...vals):0;}
function pickOpponent(name,stake){const candidates=Object.entries(db.accounts).filter(([n,a])=>n!==name&&Number(a.money||0)>=stake);if(!candidates.length)return null;return candidates[Math.floor(Math.random()*candidates.length)];}

async function api(req,res,p){
  if(p==='/api/health') return json(res,200,{ok:true,version:'1.2.0'});
  if(p==='/api/accounts'&&req.method==='GET') return json(res,200,{accounts:publicMap()});
  if(p==='/api/me'&&req.method==='GET'){const name=authUser(req);if(!name)return json(res,401,{error:'Sesión no válida.'});return json(res,200,{name,account:publicAccount(db.accounts[name])});}
  if(p==='/api/register'&&req.method==='POST'){
    const b=await body(req),name=cleanName(b.name),email=String(b.email||'').trim().toLowerCase(),pass=String(b.password||'');
    if(!/^[a-z0-9_]{3,20}$/.test(name))return json(res,400,{error:'Usuario: 3-20 caracteres (a-z, 0-9, _).'});
    if(!validEmail(email))return json(res,400,{error:'Introduce un correo electrónico válido.'});
    if(pass.length<6)return json(res,400,{error:'La contraseña debe tener mínimo 6 caracteres.'});
    if(db.accounts[name])return json(res,409,{error:'Ese usuario ya existe.'});
    if(Object.values(db.accounts).some(a=>a.email===email))return json(res,409,{error:'Ese correo ya está registrado.'});
    const salt=crypto.randomBytes(16).toString('hex');const a=makeAccount({email,salt,passwordHash:hashPassword(pass,salt)});db.accounts[name]=a;saveDb();
    const token=crypto.randomBytes(32).toString('hex');sessions.set(token,name);return json(res,201,{token,name,account:publicAccount(a)});
  }
  if(p==='/api/login'&&req.method==='POST'){
    const b=await body(req),name=cleanName(b.name),pass=String(b.password||''),a=db.accounts[name];
    if(!a)return json(res,401,{error:'Cuenta no encontrada.'});
    if(!a.passwordHash||hashPassword(pass,a.salt)!==a.passwordHash)return json(res,401,{error:'Contraseña incorrecta.'});
    const token=crypto.randomBytes(32).toString('hex');sessions.set(token,name);return json(res,200,{token,name,account:publicAccount(a)});
  }
  if(p==='/api/forgot'&&req.method==='POST'){
    const b=await body(req),email=String(b.email||'').trim().toLowerCase(),entry=Object.entries(db.accounts).find(([,a])=>a.email===email);
    if(!entry)return json(res,200,{ok:true,message:'Si el correo existe, recibirás un enlace de recuperación.'});
    const [name]=entry,token=crypto.randomBytes(32).toString('hex');resetTokens.set(token,{name,expires:Date.now()+30*60000});
    const base=process.env.PUBLIC_URL||`http://localhost:${PORT}`;const link=`${base}/?reset=${token}`;const sent=await sendRecoveryEmail(email,link);
    return json(res,200,{ok:true,message:sent?'Revisa tu correo para cambiar la contraseña.':'La recuperación por correo necesita configurar RESEND_API_KEY y FROM_EMAIL en Render.'});
  }
  if(p==='/api/reset'&&req.method==='POST'){
    const b=await body(req),token=String(b.token||''),pass=String(b.password||''),r=resetTokens.get(token);
    if(!r||r.expires<Date.now())return json(res,400,{error:'Enlace de recuperación inválido o vencido.'});
    if(pass.length<6)return json(res,400,{error:'La contraseña debe tener mínimo 6 caracteres.'});
    const a=db.accounts[r.name],salt=crypto.randomBytes(16).toString('hex');a.salt=salt;a.passwordHash=hashPassword(pass,salt);saveDb();resetTokens.delete(token);return json(res,200,{ok:true});
  }
  const name=authUser(req);
  if(p==='/api/collect'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const a=db.accounts[name];a.money=Number(a.money||0)+20;a.xp=Number(a.xp||0)+2;saveDb();return json(res,200,{account:publicAccount(a)});
  }
  if(p==='/api/profile'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),a=db.accounts[name];a.profile={...a.profile,country:String(b.country||a.profile.country),bio:String(b.bio||'').slice(0,500),instagram:String(b.instagram||'').slice(0,80),tiktok:String(b.tiktok||'').slice(0,80),youtube:String(b.youtube||'').slice(0,120),x:String(b.x||'').slice(0,80),telegram:String(b.telegram||'').slice(0,80),discord:String(b.discord||'').slice(0,80)};saveDb();return json(res,200,{account:publicAccount(a)});
  }
  if(p==='/api/generator'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),id=String(b.id||''),action=String(b.action||''),j=JOBS[id],a=db.accounts[name];
    if(!j)return json(res,404,{error:'Generador no encontrado.'});a.generators=a.generators||{};a.generatorSeconds=Number(a.generatorSeconds||0);a.generatorSecondsDate=a.generatorSecondsDate||new Date().toISOString().slice(0,10);if(a.generatorSecondsDate!==new Date().toISOString().slice(0,10)){a.generatorSeconds=0;a.generatorSecondsDate=new Date().toISOString().slice(0,10);}
    const g=a.generators[id]||{owned:false,active:false,elapsed:0,lastTick:Date.now()};
    if(action==='buy'){g.owned=true;g.active=false;g.elapsed=0;g.lastTick=Date.now();a.generators[id]=g;saveDb();return json(res,200,{account:publicAccount(a)});}
    if(action==='toggle'){if(!g.owned)return json(res,400,{error:'Primero activa el generador.'});if(!g.active){if(a.generatorSeconds>=7200)return json(res,400,{error:'Ya utilizaste las 2 horas máximas de hoy.'});g.active=true;g.lastTick=Date.now();}else{g.active=false;g.lastTick=Date.now();}a.generators[id]=g;saveDb();return json(res,200,{account:publicAccount(a)});}
    return json(res,400,{error:'Acción no válida.'});
  }
  if(p==='/api/tick'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const a=db.accounts[name];a.generators=a.generators||{};const today=new Date().toISOString().slice(0,10);if(a.generatorSecondsDate!==today){a.generatorSeconds=0;a.generatorSecondsDate=today;}
    let available=Math.max(0,7200-Number(a.generatorSeconds||0));for(const [id,j] of Object.entries(JOBS)){const g=a.generators[id];if(!g?.active)continue;const now=Date.now(),delta=Math.max(0,Math.floor((now-(g.lastTick||now))/1000)),consume=Math.min(delta,available);if(consume>0){g.elapsed=(g.elapsed||0)+consume;g.lastTick=(g.lastTick||now)+consume*1000;a.generatorSeconds+=consume;available-=consume;while(g.elapsed>=j.seconds){g.elapsed-=j.seconds;a.money+=j.reward*levelOf(a);a.xp+=10;}}if(consume<delta||available<=0){g.active=false;g.lastTick=now;}}
    saveDb();return json(res,200,{account:publicAccount(a)});
  }
  if(p==='/api/buy'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),id=String(b.id||''),x=itemById(id),a=db.accounts[name];
    if(!x)return json(res,404,{error:'Artículo no encontrado.'});if((a.owned||[]).includes(id))return json(res,409,{error:'Ya tienes este artículo.'});if(Number(a.money||0)<Number(x.price))return json(res,400,{error:'Dinero virtual insuficiente.'});a.money-=Number(x.price);a.owned=[...(a.owned||[]),id];a.xp=Number(a.xp||0)+25;saveDb();return json(res,200,{account:publicAccount(a),item:x});
  }
  if(p==='/api/match'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),stake=Number(b.stake),a=db.accounts[name];
    if(!DUEL_STAKES.includes(stake))return json(res,400,{error:'Apuesta no válida.'});if(Number(a.money||0)<stake)return json(res,400,{error:'No tienes suficiente dinero virtual.'});const opp=pickOpponent(name,stake);if(!opp)return json(res,409,{error:'No hay otro jugador con fondos suficientes para esta apuesta.'});return json(res,200,{opponent:opp[0],account:publicAccount(opp[1])});
  }
  if(p==='/api/duel'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),opponent=cleanName(b.opponent),stake=Number(b.stake),key=[name,opponent].sort().join(':');if(duelLocks.has(key))return json(res,409,{error:'Ese duelo ya está en proceso.'});duelLocks.add(key);
    try{const me=db.accounts[name],opp=db.accounts[opponent];if(!me||!opp||name===opponent)return json(res,400,{error:'Rival no válido.'});if(!DUEL_STAKES.includes(stake))return json(res,400,{error:'Apuesta no válida.'});if(Number(me.money||0)<stake||Number(opp.money||0)<stake)return json(res,400,{error:'Fondos virtuales insuficientes.'});
      const results=DUEL_CATS.map(cat=>({cat,mine:duelScore(me,cat),his:duelScore(opp,cat)}));let mine=results.filter(x=>x.mine>x.his).length,his=results.filter(x=>x.his>x.mine).length;
      if(mine===his)return json(res,200,{draw:true,mine,his,results,opponent:publicAccount(opp)});
      const win=mine>his;me.money+=win?stake:-stake;opp.money+=win?-stake:stake;me.xp=Math.max(0,Number(me.xp||0)+(win?25:-10));opp.xp=Math.max(0,Number(opp.xp||0)+(win?-10:25));saveDb();return json(res,200,{draw:false,win,mine,his,results,stake,account:publicAccount(me),opponent:publicAccount(opp)});
    } finally{duelLocks.delete(key);}
  }
  if(p==='/api/mystery/status'&&req.method==='GET')return json(res,200,mysteryStatus());
  if(p==='/api/mystery/checkout'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Inicia sesión primero.'});const status=mysteryStatus();if(!status.active)return json(res,409,{error:'La caja está agotada o la ventana de 24 horas terminó.'});if(!process.env.STRIPE_SECRET_KEY)return json(res,503,{error:'Pago real no configurado todavía.',setupRequired:true});if(!mystery.startedAt){mystery.startedAt=Date.now();saveMystery();}
    const base=process.env.PUBLIC_URL||`http://localhost:${PORT}`;const params=new URLSearchParams();params.set('mode','payment');params.set('success_url',`${base}/?mystery_session={CHECKOUT_SESSION_ID}`);params.set('cancel_url',`${base}/?mystery_cancelled=1`);params.set('line_items[0][price_data][currency]','usd');params.set('line_items[0][price_data][product_data][name]','Wealth Duels — Caja Misteriosa Exclusiva');params.set('line_items[0][price_data][unit_amount]','500');params.set('line_items[0][quantity]','1');params.set('metadata[account]',name);
    const r=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body:params});const out=await r.json();if(!r.ok)return json(res,502,{error:'Stripe no pudo crear el checkout.',detail:out.error?.message});return json(res,200,{url:out.url});
  }
  if(p==='/api/mystery/claim'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),sid=String(b.sessionId||'');if(!sid||mystery.claims.includes(sid))return json(res,409,{error:'Esta compra ya fue entregada.'});if(!process.env.STRIPE_SECRET_KEY)return json(res,503,{error:'Pago real no configurado todavía.'});const r=await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sid)}`,{headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`}});const session=await r.json();if(!r.ok||session.payment_status!=='paid'||session.amount_total!==500||session.metadata?.account!==name)return json(res,402,{error:'El pago no aparece como completado.'});const status=mysteryStatus();if(!status.active||mystery.sold>=100)return json(res,409,{error:'La caja se agotó.'});const reward=MYSTERY_REWARDS[Math.floor(Math.random()*MYSTERY_REWARDS.length)],a=db.accounts[name];mystery.claims.push(sid);mystery.sold++;a.owned=Array.from(new Set([...(a.owned||[]),reward.id]));saveMystery();saveDb();return json(res,200,{reward,sold:mystery.sold,remaining:100-mystery.sold,account:publicAccount(a)});
  }
  return json(res,404,{error:'API no encontrada'});
}

const server=http.createServer(async(req,res)=>{const p=decodeURIComponent((req.url||'/').split('?')[0]);if(p.startsWith('/api/')){try{return await api(req,res,p);}catch(e){return json(res,500,{error:e.message||'Error del servidor'});}}if(p==='/health'){res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});return res.end('ok');}const requested=p==='/'?'/index.html':p;const file=path.resolve(root,'.'+requested);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end('Forbidden');}fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res);});});
server.listen(PORT,'0.0.0.0',()=>console.log(`WEALTH DUELS 1.2 online on port ${PORT}`));

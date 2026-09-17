const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, 'public');
const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(__dirname, 'data.json');
const MYSTERY_FILE = path.join(__dirname, 'mystery.json');
const DUEL_STAKES = [50000,100000,200000,500000,1000000,5000000,10000000];
const DUEL_CATS = ['Auto','Mansión','Animal','Joya','Yate','Jet'];
const JOBS = {
  mine:{id:'mine',name:'Minador',icon:'⛏️',desc:'Extrae recursos ficticios para producir dinero virtual.',reward:120,seconds:30,real:5},
  cyber:{id:'cyber',name:'Ciberdelincuente',icon:'🕶️',desc:'Rol ficticio dentro del juego. Genera ingresos virtuales.',reward:1000,seconds:15,real:15},
  stock:{id:'stock',name:'Accionista',icon:'📈',desc:'Tu cartera virtual produce ingresos automáticos.',reward:4000,seconds:5,real:45},
  entrepreneur:{id:'entrepreneur',name:'Empresario',icon:'🏢',desc:'Construye una empresa virtual y acelera tu patrimonio.',reward:15000,seconds:5,real:60}
};
const MYSTERY_REWARDS = [
  {id:'mystery_emerald_hoodie',type:'Prenda',name:'Emerald Wealth Hoodie',icon:'🧥',value:25000},
  {id:'mystery_shadow_gt',type:'Vehículo',name:'Shadow GT — Wealth Edition',icon:'🏎️',value:850000}
];

let ITEMS=[];
try { ITEMS=JSON.parse(fs.readFileSync(path.join(root,'items-catalog.json'),'utf8')); } catch {}
const itemById=id=>ITEMS.find(x=>x.id===id);
const assetsOf=a=>(a.owned||[]).map(itemById).filter(Boolean).reduce((n,x)=>n+Number(x.price||0),0);
const netWorth=a=>Number(a.money||0)+assetsOf(a);
const levelOf=a=>Math.floor(Number(a.xp||0)/100)+1;
function wealthTier(a){
  const n=netWorth(a);
  if(n>=1e15)return 'Cuatrillonario';
  if(n>=1e12)return 'Trillonario';
  if(n>=1e9)return 'Billonario';
  if(n>=1e6)return 'Millonario';
  if(n>=1e3)return 'Miles de $';
  return 'En ascenso';
}
function readJson(file,fallback){try{return JSON.parse(fs.readFileSync(file,'utf8'));}catch{return fallback;}}
let db=readJson(DATA_FILE,{accounts:{},globalChat:[],friendChats:{}});
db.globalChat=db.globalChat||[];db.friendChats=db.friendChats||{};db.duelInvites=db.duelInvites||[];
let mystery=readJson(MYSTERY_FILE,{startedAt:null,sold:0,claims:[]});
const sessions=new Map();
const resetTokens=new Map();
const chatRate=new Map();
const matchmaking=new Map(); // stake -> waiting player name
const matches=new Map();

function saveDb(){fs.writeFileSync(DATA_FILE,JSON.stringify(db,null,2));}
function saveMystery(){fs.writeFileSync(MYSTERY_FILE,JSON.stringify(mystery,null,2));}
function json(res,code,data){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
function body(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',c=>{raw+=c;if(raw.length>1e6)req.destroy();});req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{});}catch{reject(new Error('JSON inválido'));}});req.on('error',reject);});}
function hashPassword(pass,salt){return crypto.scryptSync(pass,salt,64).toString('hex');}
function makeAccount(overrides={}){return {money:100000,xp:0,owned:[],profile:{country:'República Dominicana',bio:'',instagram:'',tiktok:'',youtube:'',x:'',telegram:'',discord:''},email:'',friends:[],friendRequests:[],generators:{},generatorSeconds:0,generatorSecondsDate:new Date().toISOString().slice(0,10),...overrides};}
function generatorLevel(a,id){const g=(a.generators||{})[id];return Math.floor(Number(g?.xp||0)/100)+1;}
function friendPair(a,b){return [a,b].sort().join('::');}
function isFriend(a,b){return !!db.accounts[a]&&!!db.accounts[b]&&(db.accounts[a].friends||[]).includes(b);}
function pushChat(arr,msg,max=200){arr.push(msg);if(arr.length>max)arr.splice(0,arr.length-max);}
function publicChatMessage(m){return {id:m.id,from:m.from,text:m.text,at:m.at};}
function publicAccount(a){const x=JSON.parse(JSON.stringify(a));delete x.passwordHash;delete x.salt;delete x.email;delete x.friendRequests;x.friends=Array.isArray(a.friends)?a.friends.slice():[];x.netWorth=netWorth(a);x.level=levelOf(a);x.wealthTier=wealthTier(a);x.generatorLevels={};for(const id of Object.keys(JOBS))x.generatorLevels[id]=generatorLevel(a,id);return x;}
function authUser(req){const token=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');return sessions.get(token)||null;}
function cleanName(v){return String(v||'').trim().toLowerCase();}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||'').trim());}
function wealthSort(){return Object.entries(db.accounts).sort((a,b)=>netWorth(b[1])-netWorth(a[1]));}
function accountSummary(name,a){return {name,account:publicAccount(a)};}
function ensureSeedAccounts(){
  const seed=(name,email,password,money,xp,owned,bio)=>{
    if(db.accounts[name])return;
    const salt=crypto.randomBytes(16).toString('hex');
    db.accounts[name]=makeAccount({email,salt,passwordHash:hashPassword(password,salt),money,xp,owned,profile:{country:'República Dominicana',bio,instagram:'',tiktok:'',youtube:'',x:'',telegram:'',discord:''}});
  };
  const all=ITEMS.map(x=>x.id);
  seed('wealthking','demo@wealthduels.test','WealthDuels2026!',999999999999999,8000,all,'Cuenta especial de demostración para probar el ranking, perfiles, colección y duelos.');
  // Nunca se agregan bots ni rivales automáticos al matchmaking.
  if(db.accounts.duelbot){delete db.accounts.duelbot;}
  if(db.accounts.luxurypro){delete db.accounts.luxurypro;}
  saveDb();
}
ensureSeedAccounts();
for(const a of Object.values(db.accounts)){a.friends=Array.isArray(a.friends)?a.friends:[];a.friendRequests=Array.isArray(a.friendRequests)?a.friendRequests:[];a.generators=a.generators||{};}
saveDb();

function mysteryStatus(){
  const now=Date.now();
  if(mystery.startedAt&&now-mystery.startedAt>=24*3600000){mystery={startedAt:null,sold:0,claims:[]};saveMystery();}
  const remaining=mystery.startedAt?Math.max(0,24*3600000-(now-mystery.startedAt)):24*3600000;
  return {sold:mystery.sold,limit:100,remainingMs:remaining,active:mystery.sold<100&&(!mystery.startedAt||remaining>0),startsOnFirstPurchase:!mystery.startedAt};
}
function sendRecoveryEmail(email,link){
  if(!process.env.RESEND_API_KEY||!process.env.FROM_EMAIL)return Promise.resolve(false);
  return fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.FROM_EMAIL,to:[email],subject:'Wealth Duels — Recupera tu contraseña',html:`<div style="font-family:Arial;background:#07100b;color:#fff;padding:32px"><h1>WEALTH DUELS</h1><p>Recibimos una solicitud para cambiar tu contraseña.</p><p><a href="${link}" style="display:inline-block;background:#39dc88;color:#07100b;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:bold">CAMBIAR CONTRASEÑA</a></p><p>Este enlace expira en 30 minutos.</p></div>`})}).then(r=>r.ok).catch(()=>false);
}
function itemScore(a,cat,id){const x=itemById(id);return x&&x.cat===cat&&(a.owned||[]).includes(id)?Number(x.price||0):0;}
function categoryItems(a,cat){return (a.owned||[]).map(itemById).filter(x=>x&&x.cat===cat);}
function ensureStarterCollection(a){
  a.owned=Array.isArray(a.owned)?a.owned:[];
  const starterByCat={Auto:'starter_auto','Mansión':'starter_mansion','Animal':'starter_animal','Joya':'starter_jewel','Yate':'starter_yacht','Jet':'starter_jet'};
  for(const cat of DUEL_CATS){
    if(!categoryItems(a,cat).length && itemById(starterByCat[cat])) a.owned.push(starterByCat[cat]);
  }
  a.owned=Array.from(new Set(a.owned));
}
function hasDuelLoadout(a){return DUEL_CATS.every(cat=>categoryItems(a,cat).length>0);}
function randomCats(){return [...DUEL_CATS].sort(()=>Math.random()-.5);}
function findWaiting(stake,name){const waiting=matchmaking.get(stake);if(!waiting||waiting===name)return null;if(![...sessions.values()].includes(waiting)){matchmaking.delete(stake);return null;}const a=db.accounts[waiting];if(!a||Number(a.money||0)<stake||!hasDuelLoadout(a)){matchmaking.delete(stake);return null;}return waiting;}
function removeFromQueues(name){for(const [stake,n] of matchmaking.entries())if(n===name)matchmaking.delete(stake);}
function createMatch(a,b,stake){
  const id=crypto.randomBytes(12).toString('hex');
  const cats=randomCats();
  const match={id,stake,players:[a,b],categories:cats,round:0,choices:{},scores:{[a]:0,[b]:0},status:'ready',createdAt:Date.now(),finished:false};
  matches.set(id,match);return match;
}
function matchView(m,name){
  const opp=m.players.find(x=>x!==name);const me=db.accounts[name],oa=db.accounts[opp];
  const cat=m.categories[m.round];
  const submitted=!!(m.choices[m.round]&&m.choices[m.round][name]);
  const otherSubmitted=!!(m.choices[m.round]&&m.choices[m.round][opp]);
  return {id:m.id,stake:m.stake,status:m.status,round:m.round+1,totalRounds:m.categories.length,category:cat,submitted,otherSubmitted,scores:m.scores,me:accountSummary(name,me),opponent:accountSummary(opp,oa),finished:m.finished,winner:m.winner||null,roundResult:m.roundResult||null};
}
function settleRound(m){
  const r=m.round, cat=m.categories[r], choices=m.choices[r]||{};
  const [a,b]=m.players;const ai=choices[a],bi=choices[b];
  const ascore=itemScore(db.accounts[a],cat,ai),bscore=itemScore(db.accounts[b],cat,bi);
  let winner=null;if(ascore>bscore){m.scores[a]++;winner=a;}else if(bscore>ascore){m.scores[b]++;winner=b;}
  const result={round:r+1,category:cat,players:{[a]:{item:ai,score:ascore},[b]:{item:bi,score:bscore}},winner};
  m.roundResult=result;
  m.round++;
  m.choices[m.round]={};
  if(m.round>=m.categories.length){
    m.status='finished';m.finished=true;
    const sa=m.scores[a],sb=m.scores[b];
    if(sa===sb){m.winner=null;}else m.winner=sa>sb?a:b;
    if(m.winner){const loser=m.players.find(x=>x!==m.winner);const w=db.accounts[m.winner],l=db.accounts[loser];w.money+=m.stake;l.money-=m.stake;w.xp+=25;l.xp=Math.max(0,Number(l.xp||0)-10);saveDb();}
  } else {m.status='ready';}
}

async function api(req,res,p){
  if(p==='/api/health')return json(res,200,{ok:true,version:'1.4.0',onlinePlayers:sessions.size});
  if(p==='/api/accounts'&&req.method==='GET'){
    const rows=wealthSort().map(([name,a],i)=>({rank:i+1,name,account:publicAccount(a)}));
    return json(res,200,{players:rows});
  }
  if(p==='/api/me'&&req.method==='GET'){const name=authUser(req);if(!name)return json(res,401,{error:'Sesión no válida.'});ensureStarterCollection(db.accounts[name]);saveDb();return json(res,200,{name,account:publicAccount(db.accounts[name])});}
  if(p==='/api/register'&&req.method==='POST'){
    const b=await body(req),name=cleanName(b.name),email=String(b.email||'').trim().toLowerCase(),pass=String(b.password||'');
    if(!/^[a-z0-9_]{3,20}$/.test(name))return json(res,400,{error:'Usuario: 3-20 caracteres (a-z, 0-9, _).'});
    if(!validEmail(email))return json(res,400,{error:'Introduce un correo electrónico válido.'});
    if(pass.length<6)return json(res,400,{error:'La contraseña debe tener mínimo 6 caracteres.'});
    if(db.accounts[name])return json(res,409,{error:'Ese usuario ya existe.'});
    if(Object.values(db.accounts).some(a=>a.email===email))return json(res,409,{error:'Ese correo ya está registrado.'});
    const salt=crypto.randomBytes(16).toString('hex');const a=makeAccount({email,salt,passwordHash:hashPassword(pass,salt)});ensureStarterCollection(a);db.accounts[name]=a;saveDb();const token=crypto.randomBytes(32).toString('hex');sessions.set(token,name);return json(res,201,{token,name,account:publicAccount(a)});
  }
  if(p==='/api/login'&&req.method==='POST'){
    const b=await body(req),name=cleanName(b.name),pass=String(b.password||''),a=db.accounts[name];if(!a)return json(res,401,{error:'Cuenta no encontrada.'});if(!a.passwordHash||hashPassword(pass,a.salt)!==a.passwordHash)return json(res,401,{error:'Contraseña incorrecta.'});ensureStarterCollection(a);saveDb();const token=crypto.randomBytes(32).toString('hex');sessions.set(token,name);return json(res,200,{token,name,account:publicAccount(a)});
  }
  if(p==='/api/forgot'&&req.method==='POST'){
    const b=await body(req),email=String(b.email||'').trim().toLowerCase(),entry=Object.entries(db.accounts).find(([,a])=>a.email===email);if(!entry)return json(res,200,{ok:true,message:'Si el correo existe, recibirás un enlace de recuperación.'});const [name]=entry,token=crypto.randomBytes(32).toString('hex');resetTokens.set(token,{name,expires:Date.now()+30*60000});const base=process.env.PUBLIC_URL||`http://localhost:${PORT}`;const link=`${base}/?reset=${token}`;const sent=await sendRecoveryEmail(email,link);return json(res,200,{ok:true,message:sent?'Revisa tu correo para cambiar la contraseña.':'La recuperación por correo necesita configurar RESEND_API_KEY y FROM_EMAIL en Render.'});
  }
  if(p==='/api/reset'&&req.method==='POST'){
    const b=await body(req),token=String(b.token||''),pass=String(b.password||''),r=resetTokens.get(token);if(!r||r.expires<Date.now())return json(res,400,{error:'Enlace de recuperación inválido o vencido.'});if(pass.length<6)return json(res,400,{error:'La contraseña debe tener mínimo 6 caracteres.'});const a=db.accounts[r.name],salt=crypto.randomBytes(16).toString('hex');a.salt=salt;a.passwordHash=hashPassword(pass,salt);saveDb();resetTokens.delete(token);return json(res,200,{ok:true});
  }
  const name=authUser(req);
  if(p==='/api/collect'&&req.method==='POST'){if(!name)return json(res,401,{error:'Sesión no válida.'});const a=db.accounts[name];a.money=Number(a.money||0)+20;a.xp=Number(a.xp||0)+2;saveDb();return json(res,200,{account:publicAccount(a)});}
  if(p==='/api/profile'&&req.method==='POST'){if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),a=db.accounts[name];a.profile={...a.profile,country:String(b.country||a.profile.country),bio:String(b.bio||'').slice(0,500),instagram:String(b.instagram||'').slice(0,80),tiktok:String(b.tiktok||'').slice(0,80),youtube:String(b.youtube||'').slice(0,120),x:String(b.x||'').slice(0,80),telegram:String(b.telegram||'').slice(0,80),discord:String(b.discord||'').slice(0,80)};saveDb();return json(res,200,{account:publicAccount(a)});}
  if(p==='/api/generator'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),id=String(b.id||''),action=String(b.action||''),j=JOBS[id],a=db.accounts[name];if(!j)return json(res,404,{error:'Generador no encontrado.'});a.generators=a.generators||{};a.generatorSeconds=Number(a.generatorSeconds||0);a.generatorSecondsDate=a.generatorSecondsDate||new Date().toISOString().slice(0,10);if(a.generatorSecondsDate!==new Date().toISOString().slice(0,10)){a.generatorSeconds=0;a.generatorSecondsDate=new Date().toISOString().slice(0,10);}
    const g=a.generators[id]||{owned:false,active:false,elapsed:0,lastTick:Date.now()};
    if(action==='buy'){g.owned=true;g.active=false;g.elapsed=0;g.xp=Number(g.xp||0);g.lastTick=Date.now();a.generators[id]=g;saveDb();return json(res,200,{account:publicAccount(a)});}
    if(action==='toggle'){
      if(!g.owned)return json(res,400,{error:'Primero activa el generador.'});
      if(!g.active){
        if(a.generatorSeconds>=7200)return json(res,400,{error:'Ya utilizaste las 2 horas máximas de hoy.'});
        const another=Object.entries(a.generators).find(([otherId,other])=>otherId!==id&&other.active);
        if(another)return json(res,409,{error:`Solo puedes usar un generador a la vez. Detén ${JOBS[another[0]]?.name||'el otro generador'} primero.`});
        g.active=true;g.lastTick=Date.now();
      } else {g.active=false;g.lastTick=Date.now();}
      a.generators[id]=g;saveDb();return json(res,200,{account:publicAccount(a)});
    }
    return json(res,400,{error:'Acción no válida.'});
  }
  if(p==='/api/tick'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const a=db.accounts[name];a.generators=a.generators||{};const today=new Date().toISOString().slice(0,10);if(a.generatorSecondsDate!==today){a.generatorSeconds=0;a.generatorSecondsDate=today;}
    let available=Math.max(0,7200-Number(a.generatorSeconds||0));
    for(const [id,j] of Object.entries(JOBS)){const g=a.generators[id];if(!g?.active)continue;const now=Date.now(),delta=Math.max(0,Math.floor((now-(g.lastTick||now))/1000)),consume=Math.min(delta,available);if(consume>0){g.elapsed=(g.elapsed||0)+consume;g.lastTick=(g.lastTick||now)+consume*1000;a.generatorSeconds+=consume;available-=consume;while(g.elapsed>=j.seconds){g.elapsed-=j.seconds;a.money+=j.reward*levelOf(a);a.xp+=10;g.xp=Number(g.xp||0)+10;}}if(consume<delta||available<=0){g.active=false;g.lastTick=now;}}
    saveDb();return json(res,200,{account:publicAccount(a)});
  }
  if(p==='/api/buy'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),id=String(b.id||''),x=itemById(id),a=db.accounts[name];if(!x)return json(res,404,{error:'Artículo no encontrado.'});if((a.owned||[]).includes(id))return json(res,409,{error:'Ya tienes este artículo.'});if(Number(a.money||0)<Number(x.price))return json(res,400,{error:'Dinero virtual insuficiente.'});a.money-=Number(x.price);a.owned=[...(a.owned||[]),id];a.xp=Number(a.xp||0)+25;saveDb();return json(res,200,{account:publicAccount(a),item:x});
  }
  // -------- SOCIAL: AMIGOS + CHAT GLOBAL + CHAT PRIVADO --------
  if(p==='/api/friends'&&req.method==='GET'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});
    const a=db.accounts[name];const friends=(a.friends||[]).filter(n=>db.accounts[n]).map(n=>({name:n,account:publicAccount(db.accounts[n]),online:[...sessions.values()].includes(n)}));
    const requests=(a.friendRequests||[]).filter(n=>db.accounts[n]).map(n=>({name:n,account:publicAccount(db.accounts[n])}));
    return json(res,200,{friends,requests});
  }
  if(p==='/api/friends/request'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),target=cleanName(b.name);
    if(!db.accounts[target])return json(res,404,{error:'Jugador no encontrado.'});if(target===name)return json(res,400,{error:'No puedes agregarte a ti mismo.'});
    if(isFriend(name,target))return json(res,409,{error:'Ya son amigos.'});
    const me=db.accounts[name],ta=db.accounts[target];if((ta.friendRequests||[]).includes(name))return json(res,409,{error:'La solicitud ya está enviada.'});
    ta.friendRequests=ta.friendRequests||[];ta.friendRequests.push(name);saveDb();return json(res,200,{ok:true,message:`Solicitud enviada a @${target}.`});
  }
  if(p==='/api/friends/respond'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),other=cleanName(b.name),accept=!!b.accept;const me=db.accounts[name],ta=db.accounts[other];
    if(!ta)return json(res,404,{error:'Jugador no encontrado.'});me.friendRequests=(me.friendRequests||[]).filter(x=>x!==other);if(accept){me.friends=Array.from(new Set([...(me.friends||[]),other]));ta.friends=Array.from(new Set([...(ta.friends||[]),name]));}saveDb();return json(res,200,{ok:true,accepted:accept});
  }
  if(p==='/api/friends/remove'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),other=cleanName(b.name),me=db.accounts[name],ta=db.accounts[other];if(!ta)return json(res,404,{error:'Jugador no encontrado.'});me.friends=(me.friends||[]).filter(x=>x!==other);ta.friends=(ta.friends||[]).filter(x=>x!==name);saveDb();return json(res,200,{ok:true});
  }
  if(p==='/api/chat/global'&&req.method==='GET'){
    return json(res,200,{messages:(db.globalChat||[]).slice(-100).map(publicChatMessage)});
  }
  if(p==='/api/chat/global'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),text=String(b.text||'').trim().slice(0,240);if(!text)return json(res,400,{error:'Escribe un mensaje.'});
    const now=Date.now(),last=chatRate.get(name)||0;if(now-last<900)return json(res,429,{error:'Espera un momento antes de enviar otro mensaje.'});chatRate.set(name,now);
    pushChat(db.globalChat,{id:crypto.randomBytes(8).toString('hex'),from:name,text,at:now});saveDb();return json(res,200,{ok:true});
  }
  if(p==='/api/chat/friend'&&req.method==='GET'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const other=cleanName(new URL(req.url,`http://${req.headers.host||'localhost'}`).searchParams.get('with'));if(!isFriend(name,other))return json(res,403,{error:'Solo puedes chatear con amigos.'});return json(res,200,{with:other,messages:(db.friendChats[friendPair(name,other)]||[]).slice(-100).map(publicChatMessage)});
  }
  if(p==='/api/chat/friend'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),other=cleanName(b.with),text=String(b.text||'').trim().slice(0,500);if(!isFriend(name,other))return json(res,403,{error:'Solo puedes chatear con amigos.'});if(!text)return json(res,400,{error:'Escribe un mensaje.'});
    const now=Date.now(),last=chatRate.get(name)||0;if(now-last<700)return json(res,429,{error:'Espera un momento antes de enviar otro mensaje.'});chatRate.set(name,now);const key=friendPair(name,other);db.friendChats[key]=db.friendChats[key]||[];pushChat(db.friendChats[key],{id:crypto.randomBytes(8).toString('hex'),from:name,text,at:now});saveDb();return json(res,200,{ok:true});
  }
  // -------- INVITACIONES DE DUELO ENTRE AMIGOS --------
  if(p==='/api/duel/invite'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),target=cleanName(b.name),stake=Number(b.stake),a=db.accounts[name];if(!db.accounts[target])return json(res,404,{error:'Jugador no encontrado.'});if(target===name)return json(res,400,{error:'No puedes retarte a ti mismo.'});if(!isFriend(name,target))return json(res,403,{error:'Primero deben ser amigos.'});if(!DUEL_STAKES.includes(stake))return json(res,400,{error:'Apuesta no válida.'});if(Number(a.money||0)<stake)return json(res,400,{error:'No tienes suficiente dinero virtual.'});ensureStarterCollection(a);ensureStarterCollection(db.accounts[target]);saveDb();if(!hasDuelLoadout(a)||!hasDuelLoadout(db.accounts[target]))return json(res,400,{error:'Ambos jugadores necesitan una pieza en cada categoría para competir.'});
    const invId=crypto.randomBytes(10).toString('hex');const inv={id:invId,from:name,to:target,stake,createdAt:Date.now()};db.duelInvites=db.duelInvites||[];db.duelInvites=db.duelInvites.filter(x=>Date.now()-x.createdAt<10*60*1000);db.duelInvites.push(inv);saveDb();return json(res,200,{ok:true,id:invId});
  }
  if(p==='/api/duel/invites'&&req.method==='GET'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});db.duelInvites=db.duelInvites||[];db.duelInvites=db.duelInvites.filter(x=>Date.now()-x.createdAt<10*60*1000);saveDb();return json(res,200,{invites:db.duelInvites.filter(x=>x.to===name)});
  }
  if(p==='/api/duel/respond'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),id=String(b.id||''),accept=!!b.accept;db.duelInvites=db.duelInvites||[];const i=db.duelInvites.find(x=>x.id===id&&x.to===name);if(!i)return json(res,404,{error:'Invitación no encontrada o vencida.'});db.duelInvites=db.duelInvites.filter(x=>x.id!==id);if(!accept){saveDb();return json(res,200,{ok:true,accepted:false});}ensureStarterCollection(db.accounts[name]);ensureStarterCollection(db.accounts[i.from]);if(Number(db.accounts[name].money||0)<i.stake||Number(db.accounts[i.from].money||0)<i.stake){saveDb();return json(res,400,{error:'Uno de los jugadores ya no tiene suficiente dinero virtual.'});}if(!hasDuelLoadout(db.accounts[name])||!hasDuelLoadout(db.accounts[i.from])){saveDb();return json(res,400,{error:'Ambos jugadores necesitan una pieza en cada categoría para competir.'});}const m=createMatch(i.from,name,i.stake);saveDb();return json(res,200,{ok:true,accepted:true,match:matchView(m,name)});
  }
  // -------- MATCHMAKING 100% JUGADORES REALES --------
  if(p==='/api/match/queue'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),stake=Number(b.stake),a=db.accounts[name];ensureStarterCollection(a);saveDb();if(!DUEL_STAKES.includes(stake))return json(res,400,{error:'Apuesta no válida.'});if(Number(a.money||0)<stake)return json(res,400,{error:'No tienes suficiente dinero virtual.'});if(!hasDuelLoadout(a))return json(res,400,{error:'Tu colección debe tener al menos un artículo en cada categoría.'});
    for(const m of matches.values()){if(m.players.includes(name)&&!m.finished)return json(res,200,matchView(m,name));}
    removeFromQueues(name);
    const waiting=findWaiting(stake,name);
    if(waiting){matchmaking.delete(stake);const m=createMatch(waiting,name,stake);return json(res,200,matchView(m,name));}
    matchmaking.set(stake,name);return json(res,200,{queued:true,stake,message:'Buscando a otro jugador real...',account:publicAccount(a)});
  }
  if(p==='/api/match/status'&&req.method==='GET'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});
    for(const m of matches.values()) if(m.players.includes(name)) return json(res,200,matchView(m,name));
    return json(res,200,{queued:[...matchmaking.values()].includes(name)});
  }
  if(p==='/api/match/cancel'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});for(const [stake,n] of matchmaking.entries())if(n===name)matchmaking.delete(stake);return json(res,200,{ok:true});
  }
  if(p==='/api/match/choose'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),id=String(b.matchId||''),item=String(b.itemId||'');const m=matches.get(id);if(!m||!m.players.includes(name)||m.finished)return json(res,404,{error:'Duelo no encontrado.'});const cat=m.categories[m.round],x=itemById(item),a=db.accounts[name];if(!x||x.cat!==cat||(a.owned||[]).includes(item)===false)return json(res,400,{error:`Selecciona un artículo de categoría ${cat} que esté en tu colección.`});m.choices[m.round]=m.choices[m.round]||{};if(m.choices[m.round][name])return json(res,409,{error:'Ya elegiste tu artículo en esta ronda.'});m.choices[m.round][name]=item;
    const [p1,p2]=m.players;if(m.choices[m.round][p1]&&m.choices[m.round][p2])settleRound(m);
    return json(res,200,matchView(m,name));
  }
  for(const [id,m] of matches.entries()) if(m.finished && Date.now()-m.createdAt>15*60*1000) matches.delete(id);
  // Legacy endpoints intentionally no longer select arbitrary opponents.
  if(p==='/api/match'&&req.method==='POST')return json(res,410,{error:'El matchmaking antiguo fue reemplazado. Usa el duelo online aleatorio.'});
  if(p==='/api/duel'&&req.method==='POST')return json(res,410,{error:'Los duelos ahora se juegan ronda por ronda entre dos jugadores reales.'});

  if(p==='/api/mystery/status'&&req.method==='GET')return json(res,200,mysteryStatus());
  if(p==='/api/mystery/test'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Inicia sesión primero.'});
    const reward=MYSTERY_REWARDS[Math.floor(Math.random()*MYSTERY_REWARDS.length)],a=db.accounts[name];a.owned=Array.from(new Set([...(a.owned||[]),reward.id]));saveDb();return json(res,200,{test:true,reward,account:publicAccount(a)});
  }
  if(p==='/api/mystery/checkout'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Inicia sesión primero.'});const status=mysteryStatus();if(!status.active)return json(res,409,{error:'La caja está agotada o la ventana de 24 horas terminó.'});if(!process.env.STRIPE_SECRET_KEY)return json(res,503,{error:'Pago real no configurado todavía.',setupRequired:true});if(!mystery.startedAt){mystery.startedAt=Date.now();saveMystery();}const base=process.env.PUBLIC_URL||`http://localhost:${PORT}`;const params=new URLSearchParams();params.set('mode','payment');params.set('success_url',`${base}/?mystery_session={CHECKOUT_SESSION_ID}`);params.set('cancel_url',`${base}/?mystery_cancelled=1`);params.set('line_items[0][price_data][currency]','usd');params.set('line_items[0][price_data][product_data][name]','Wealth Duels — Caja Misteriosa Exclusiva');params.set('line_items[0][price_data][unit_amount]','500');params.set('line_items[0][quantity]','1');params.set('metadata[account]',name);const r=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'},body:params});const out=await r.json();if(!r.ok)return json(res,502,{error:'Stripe no pudo crear el checkout.',detail:out.error?.message});return json(res,200,{url:out.url});
  }
  if(p==='/api/mystery/claim'&&req.method==='POST'){
    if(!name)return json(res,401,{error:'Sesión no válida.'});const b=await body(req),sid=String(b.sessionId||'');if(!sid||mystery.claims.includes(sid))return json(res,409,{error:'Esta compra ya fue entregada.'});if(!process.env.STRIPE_SECRET_KEY)return json(res,503,{error:'Pago real no configurado todavía.'});const r=await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sid)}`,{headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`}});const session=await r.json();if(!r.ok||session.payment_status!=='paid'||session.amount_total!==500||session.metadata?.account!==name)return json(res,402,{error:'El pago no aparece como completado.'});const status=mysteryStatus();if(!status.active||mystery.sold>=100)return json(res,409,{error:'La caja se agotó.'});const reward=MYSTERY_REWARDS[Math.floor(Math.random()*MYSTERY_REWARDS.length)],a=db.accounts[name];mystery.claims.push(sid);mystery.sold++;a.owned=Array.from(new Set([...(a.owned||[]),reward.id]));saveMystery();saveDb();return json(res,200,{reward,sold:mystery.sold,remaining:100-mystery.sold,account:publicAccount(a)});
  }
  return json(res,404,{error:'API no encontrada'});
}

const server=http.createServer(async(req,res)=>{const p=decodeURIComponent((req.url||'/').split('?')[0]);if(p.startsWith('/api/')){try{return await api(req,res,p);}catch(e){console.error(e);return json(res,500,{error:e.message||'Error del servidor'});}}if(p==='/health'){res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});return res.end('ok');}const requested=p==='/'?'/index.html':p;const file=path.resolve(root,'.'+requested);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end('Forbidden');}fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8'}[path.extname(file).toLowerCase()]||'application/octet-stream'),'Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);});});
server.listen(PORT,'0.0.0.0',()=>console.log(`WEALTH DUELS 1.4 online on port ${PORT}`));

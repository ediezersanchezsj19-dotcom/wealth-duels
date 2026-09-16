const ITEMS=[
{id:'m4',cat:'Auto',name:'BMW M4 CSL',price:140000,icon:'🏎️'},
{id:'gt3',cat:'Auto',name:'Porsche 911 GT3 RS',price:245000,icon:'🏎️'},
{id:'huracan',cat:'Auto',name:'Lamborghini Huracán STO',price:330000,icon:'🏎️'},
{id:'ferrari296',cat:'Auto',name:'Ferrari 296 GTB',price:340000,icon:'🏎️'},
{id:'chiron',cat:'Auto',name:'Bugatti Chiron Super Sport',price:3800000,icon:'🏎️'},
{id:'sf90',cat:'Auto',name:'Ferrari SF90 Stradale',price:575000,icon:'🏎️'},
{id:'revuelto',cat:'Auto',name:'Lamborghini Revuelto',price:608000,icon:'🏎️'},
{id:'urus',cat:'Auto',name:'Lamborghini Urus',price:250000,icon:'🚙'},
{id:'gt63',cat:'Auto',name:'Mercedes-AMG GT 63',price:180000,icon:'🏎️'},
{id:'s680',cat:'Auto',name:'Mercedes-Maybach S 680',price:240000,icon:'🚘'},
{id:'bentley',cat:'Auto',name:'Bentley Continental GT',price:300000,icon:'🚘'},
{id:'mclaren750',cat:'Auto',name:'McLaren 750S',price:330000,icon:'🏎️'},
{id:'aston',cat:'Auto',name:'Aston Martin DB12',price:250000,icon:'🏎️'},
{id:'rolls',cat:'Auto',name:'Rolls-Royce Ghost',price:350000,icon:'🚘'},
{id:'rollscullinan',cat:'Auto',name:'Rolls-Royce Cullinan',price:400000,icon:'🚙'},
{id:'koenig',cat:'Auto',name:'Koenigsegg Jesko',price:3000000,icon:'🏎️'},
{id:'pagani',cat:'Auto',name:'Pagani Huayra',price:3500000,icon:'🏎️'},
{id:'daytona',cat:'Joya',name:'Rolex Daytona Rainbow',price:450000,icon:'⌚'},
{id:'nautilus',cat:'Joya',name:'Patek Philippe Nautilus',price:120000,icon:'⌚'},
{id:'royaloak',cat:'Joya',name:'Audemars Piguet Royal Oak',price:280000,icon:'⌚'},
{id:'astronomia',cat:'Joya',name:'Jacob & Co. Astronomia',price:1000000,icon:'⌚'},
{id:'cartierlove',cat:'Joya',name:'Cartier Love Pavé',price:46000,icon:'💎'},
{id:'cuban',cat:'Joya',name:'Cadena Cubana 20mm Diamantes',price:150000,icon:'💎'},
{id:'ring',cat:'Joya',name:'Harry Winston Anillo 10ct',price:850000,icon:'💎'},
{id:'diamondset',cat:'Joya',name:'Set Diamantes Imperial',price:1200000,icon:'💎'},
{id:'emerald',cat:'Joya',name:'Collar Esmeralda Verde',price:600000,icon:'💚'},
{id:'sapphire',cat:'Joya',name:'Brazalete Zafiro Real',price:400000,icon:'💎'},
{id:'goldchain',cat:'Joya',name:'Cadena Oro Macizo 24K',price:85000,icon:'⛓️'},
{id:'villa',cat:'Mansión',name:'Villa Moderna',price:2500000,icon:'🏡'},
{id:'beverly',cat:'Mansión',name:'Mansión Beverly Hills',price:12000000,icon:'🏰'},
{id:'miami',cat:'Mansión',name:'Mansión Miami Oceanfront',price:18000000,icon:'🌴'},
{id:'dubai',cat:'Mansión',name:'Palacio Privado Dubai',price:35000000,icon:'🏰'},
{id:'monaco',cat:'Mansión',name:'Villa Costa Azul',price:28000000,icon:'🌊'},
{id:'malibu',cat:'Mansión',name:'Estate Malibu',price:22000000,icon:'🏖️'},
{id:'penthouse',cat:'Mansión',name:'Penthouse Manhattan',price:30000000,icon:'🏙️'},
{id:'lake',cat:'Mansión',name:'Lakefront Estate',price:9000000,icon:'🏞️'},
{id:'azimut',cat:'Yate',name:'Azimut Grande 30M',price:8000000,icon:'🛥️'},
{id:'sunseeker',cat:'Yate',name:'Sunseeker 95 Yacht',price:12000000,icon:'🛥️'},
{id:'ferretti',cat:'Yate',name:'Ferretti 1000',price:20000000,icon:'🛥️'},
{id:'ocean',cat:'Yate',name:'Ocean Explorer 50M',price:45000000,icon:'🛳️'},
{id:'superyacht',cat:'Yate',name:'Superyacht Imperial',price:75000000,icon:'🛥️'},
{id:'gulf',cat:'Jet',name:'Gulfstream G650',price:70000000,icon:'✈️'},
{id:'global',cat:'Jet',name:'Bombardier Global 7500',price:80000000,icon:'✈️'},
{id:'falcon',cat:'Jet',name:'Dassault Falcon 10X',price:75000000,icon:'✈️'},
{id:'legacy',cat:'Jet',name:'Embraer Praetor 600',price:30000000,icon:'✈️'},
{id:'private',cat:'Jet',name:'Wealth Duels Private Jet',price:150000000,icon:'🛩️'}
];
const EXTRA_ITEMS={
Auto:[['Lamborghini Revuelto',604000,'🏎️'],['Ferrari SF90 Stradale',528000,'🏎️'],['McLaren 750S',324000,'🏎️'],['Aston Martin DB12',245000,'🏎️'],['Rolls-Royce Ghost',357750,'🚘'],['Rolls-Royce Cullinan',526150,'🚙'],['Bentley Continental GT',250000,'🚘'],['Mercedes-Maybach S 680',240000,'🚘'],['Porsche 911 GT3 RS',241300,'🏎️'],['Ferrari 296 GTB',342205,'🏎️'],['Lamborghini Urus SE',254000,'🚙'],['Mercedes-AMG GT 63 S',190000,'🏎️'],['Koenigsegg Jesko',3000000,'🏎️'],['Pagani Huayra',3400000,'🏎️'],['Bugatti Chiron Super Sport',3900000,'🏎️'],['Rimac Nevera',2500000,'🏎️'],['Aston Martin Valkyrie',3000000,'🏎️'],['Ferrari Daytona SP3',2200000,'🏎️'],['Mercedes-AMG One',2700000,'🏎️'],['Gordon Murray T.50',2500000,'🏎️']],
Joya:[['Rolex Daytona Rainbow',100000,'⌚'],['Patek Philippe Nautilus',150000,'⌚'],['Audemars Piguet Royal Oak',95000,'⌚'],['Jacob & Co Astronomia',280000,'⌚'],['Cartier Love Pavé',56000,'💎'],['Harry Winston Diamond Ring',180000,'💎'],['Graff Diamond Necklace',1200000,'💎'],['Bvlgari Serpenti High Jewelry',500000,'💎'],['Chopard High Jewelry Set',750000,'💎'],['24K Gold Cuban Chain',35000,'⛓️'],['Blue Sapphire Bracelet',220000,'💎'],['Emerald Necklace',310000,'💚'],['Diamond Tennis Bracelet',95000,'💎'],['Van Cleef High Jewelry',400000,'💎']],
Mansión:[['Beverly Hills Estate',38000000,'🏰'],['Miami Oceanfront Mansion',22000000,'🌴'],['Dubai Private Palace',45000000,'🏰'],['Malibu Beach Estate',32000000,'🏖️'],['Manhattan Penthouse',35000000,'🏙️'],['Palm Jumeirah Villa',30000000,'🌴'],['Bel Air Mega Mansion',95000000,'🏰'],['Monaco Luxury Penthouse',55000000,'🏙️'],['French Riviera Villa',28000000,'🌊'],['Lake Como Villa',18000000,'🏞️']],
Yate:[['Azimut Grande 30M',9000000,'🛥️'],['Sunseeker 95',11000000,'🛥️'],['Ferretti 1000',12000000,'🛥️'],['Benetti Oasis 40M',22000000,'🛥️'],['Heesen 50M',45000000,'🛥️'],['Feadship 60M',80000000,'🛥️'],['Lürssen 90M Superyacht',250000000,'🛥️'],['Oceanco 100M',300000000,'🛥️']],
Jet:[['Gulfstream G650',65000000,'✈️'],['Gulfstream G700',80000000,'✈️'],['Bombardier Global 7500',78000000,'✈️'],['Dassault Falcon 10X',75000000,'✈️'],['Embraer Praetor 600',26000000,'✈️'],['Bombardier Global 8000',80000000,'✈️'],['Gulfstream G800',75000000,'✈️'],['Boeing Business Jet',100000000,'✈️']],
Animal:[['Caballo Árabe',25000,'🐎'],['Caballo Frisón',20000,'🐎'],['Akhal-Teke',100000,'🐎'],['Caballo de Carrera Campeón',500000,'🏇'],['Halcón Peregrino',100000,'🦅'],['Halcón de Cetrería',80000,'🦅'],['León Blanco (santuario)',150000,'🦁'],['Tigre de Bengala (santuario)',200000,'🐅'],['Loro Exótico',5000,'🦜'],['Perro de Exhibición Campeón',30000,'🐕']]
};
const seenNames=new Set(ITEMS.map(x=>x.name));
Object.entries(EXTRA_ITEMS).forEach(([cat,list])=>list.forEach(([name,price,icon],i)=>{if(!seenNames.has(name)){ITEMS.push({id:`extra_${cat}_${i}`,cat,name,price,icon});seenNames.add(name)}}));
ITEMS.push({id:'mystery_emerald_hoodie',cat:'Exclusivo',name:'Emerald Wealth Hoodie',price:25000,icon:'🧥'});
ITEMS.push({id:'mystery_shadow_gt',cat:'Auto',name:'Shadow GT — Wealth Edition',price:850000,icon:'🏎️'});

const JOBS=[
{id:'mine',icon:'⛏️',name:'Minador',desc:'Generador automático de minería. Actívalo y trabaja solo.',real:5,reward:120,seconds:30},
{id:'cyber',icon:'🕶️',name:'Ciberdelincuente',desc:'Trabajo ficticio del juego que genera dinero automáticamente.',real:15,reward:1000,seconds:15},
{id:'stock',icon:'📈',name:'Accionista',desc:'Bot bursátil ficticio que genera dinero automáticamente.',real:45,reward:4000,seconds:5}
];
const DUEL_STAKES=[50000,100000,200000,500000,1000000,5000000,10000000];
const DUEL_CATEGORIES=[
{id:'Auto',label:'🏎️ Mejor Auto'},
{id:'Mansión',label:'🏠 Mejor Mansión'},
{id:'Animal',label:'🐎 Mejor Animal'},
{id:'Joya',label:'💎 Mejor Joya'},
{id:'Yate',label:'🛥️ Mejor Bote'},
{id:'Jet',label:'✈️ Mejor Jet'}
];
const COUNTRIES={'República Dominicana':'🇩🇴','Estados Unidos':'🇺🇸','México':'🇲🇽','España':'🇪🇸','Colombia':'🇨🇴','Argentina':'🇦🇷','Venezuela':'🇻🇪','Puerto Rico':'🇵🇷','Brasil':'🇧🇷','Canadá':'🇨🇦','Francia':'🇫🇷','Italia':'🇮🇹','Reino Unido':'🇬🇧','Alemania':'🇩🇪','Japón':'🇯🇵','China':'🇨🇳','Emiratos Árabes Unidos':'🇦🇪','Otro':'🌎'};

let user=null,state=null,generatorLoop=null;
const ACC='wd_accounts_v2',OWN='wd_session_v2',TOKEN='wd_online_token_v1';
let onlineAccountsCache=null;
async function apiFetch(path,options={}){const headers={'Content-Type':'application/json',...(options.headers||{})};const token=localStorage.getItem(TOKEN);if(token)headers.Authorization='Bearer '+token;const r=await fetch(path,{...options,headers});let data={};try{data=await r.json()}catch{}if(!r.ok)throw Object.assign(new Error(data.error||'Error de red'),data);return data;}
async function fetchOnlineAccounts(){try{const d=await apiFetch('/api/accounts');onlineAccountsCache=d.accounts||{};return onlineAccountsCache}catch{return accounts()}}
const allAccounts=()=>onlineAccountsCache||accounts();
const accounts=()=>JSON.parse(localStorage.getItem(ACC)||'{}');
const saveAccounts=a=>localStorage.setItem(ACC,JSON.stringify(a));
const fmt=n=>'$'+Math.floor(Number(n)||0).toLocaleString('en-US');
const money=n=>fmt(n);
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const findItem=id=>ITEMS.find(x=>x.id===id);
const assetsOf=s=>(s.owned||[]).map(findItem).filter(Boolean).reduce((n,x)=>n+x.price,0);
const levelOf=s=>Math.floor((Number(s.xp)||0)/100)+1;
function todayKey(){return new Date().toISOString().slice(0,10)}
function ensureProfile(a){a.profile=a.profile||{};a.profile.country=a.profile.country||'República Dominicana';a.profile.bio=a.profile.bio||'';a.profile.instagram=a.profile.instagram||'';a.profile.tiktok=a.profile.tiktok||'';a.profile.youtube=a.profile.youtube||'';a.profile.x=a.profile.x||'';a.profile.telegram=a.profile.telegram||'';a.profile.discord=a.profile.discord||'';return a.profile}
function flagOf(a){return COUNTRIES[ensureProfile(a).country]||'🌎'}
function initGenerators(){
 state.generators=state.generators||{};
 JOBS.forEach(j=>{const old=state.generators[j.id];state.generators[j.id]=typeof old==='boolean'?{owned:old,active:false,elapsed:0,lastTick:Date.now()}:{owned:false,active:false,elapsed:0,lastTick:Date.now(),...(old||{})}});
 if(typeof state.generatorSeconds!=='number')state.generatorSeconds=0;
 if(state.generatorSecondsDate!==todayKey()){state.generatorSeconds=0;state.generatorSecondsDate=todayKey()}
}
function save(){const a=accounts();a[user]=state;saveAccounts(a);const token=localStorage.getItem(TOKEN);if(token)apiFetch('/api/sync',{method:'POST',body:JSON.stringify({account:state})}).catch(()=>{});}
function update(){
 const cash=document.querySelector('#cash');if(cash)cash.textContent=fmt(state.money);
 const net=document.querySelector('#networth');if(net)net.textContent=fmt(state.money+assetsOf(state));
 const assets=document.querySelector('#assets');if(assets)assets.textContent=(state.owned||[]).length;
 const level=document.querySelector('#level');if(level)level.textContent=levelOf(state);
 const xp=document.querySelector('#xp');if(xp)xp.textContent=state.xp||0;
 const bar=document.querySelector('#xpbar');if(bar)bar.style.width=((state.xp||0)%100)+'%';
 const un=document.querySelector('#userName');if(un)un.textContent='@'+user;
}
function toast(t){let x=document.querySelector('#toast');if(!x){x=document.createElement('div');x.id='toast';document.body.appendChild(x)}x.textContent=t;x.classList.add('show');clearTimeout(x._t);x._t=setTimeout(()=>x.classList.remove('show'),1800)}
async function login(name,pass,create=false){
 name=name.trim().toLowerCase();if(!name||!pass)return document.querySelector('#authMsg').textContent='Completa usuario y contraseña.';
 const msg=document.querySelector('#authMsg');msg.textContent='Conectando...';
 try{const d=await apiFetch(create?'/api/register':'/api/login',{method:'POST',body:JSON.stringify({name,password:pass})});localStorage.setItem(TOKEN,d.token);user=d.name;state=d.account;ensureProfile(state);initGenerators();saveAccounts({...accounts(),[user]:state});save();await fetchOnlineAccounts();openApp();startGeneratorLoop();claimMystery();return}catch(e){
   const a=accounts();
   if(!create && a[name]){
     try{const d=await apiFetch('/api/register',{method:'POST',body:JSON.stringify({name,password:pass})});localStorage.setItem(TOKEN,d.token);user=name;state=a[name];ensureProfile(state);initGenerators();save();await fetchOnlineAccounts();openApp();startGeneratorLoop();claimMystery();return}catch(_){}
   }
   msg.textContent=e.message||'No se pudo iniciar sesión.';
 }
}
document.querySelector('#loginBtn').onclick=()=>login(document.querySelector('#username').value,document.querySelector('#password').value);
document.querySelector('#createBtn').onclick=()=>login(document.querySelector('#username').value,document.querySelector('#password').value,true);
document.querySelector('#logout').onclick=logout;
document.querySelector('#collect').onclick=collectMoney;
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>go(b.dataset.page));
document.querySelectorAll('[data-page]').forEach(b=>{if(!b.classList.contains('nav'))b.onclick=()=>go(b.dataset.page)});
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('hidden',p.id!==id));document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===id));if(id==='top')renderTop();if(id==='duel')renderDuel();if(id==='mystery')renderMystery();if(id==='jobs')renderJobs();if(id==='items')renderItems();if(id==='profile')renderProfile()}
function collectMoney(){
 state.money+=20;state.xp+=2;save();update();renderTop();toast('💰 +$20 · +2 XP');
}
function renderTop(){
 const el=document.querySelector('#leader');if(!el)return;
 const rows=Object.entries(allAccounts()).map(([name,s])=>{ensureProfile(s);return{name,s,wealth:Number(s.money||0)+assetsOf(s),lv:levelOf(s)}}).sort((a,b)=>b.wealth-a.wealth).slice(0,50);
 el.innerHTML=`<div class="rank rank-head"><div>#</div><div>Jugador</div><div>Patrimonio</div><div>Nivel</div><div></div></div>`+rows.map((r,i)=>`<div class="rank"><div class="pos">#${i+1}</div><div class="player"><b>${flagOf(r.s)} ${esc(r.name)}${r.name===user?' <small>(TÚ)</small>':''}</b><small>${esc(r.s.profile.country)}</small></div><div class="wealth">${fmt(r.wealth)}</div><div class="lv">Nivel ${r.lv}</div><div><button class="small-btn" onclick="showPublicProfile('${esc(r.name)}')">VER PERFIL</button></div></div>`).join('');
}
function renderItems(){
 const root=document.querySelector('#itemsGrid');if(!root)return;
 root.innerHTML=ITEMS.map(x=>{const own=state.owned.includes(x.id);return `<div class="item"><div class="icon">${x.icon}</div><h3>${esc(x.name)}</h3><p>${esc(x.cat)} · artículo de colección</p><div class="price">${fmt(x.price)}</div><button class="${own?'owned':''}" ${own?'disabled':''} data-item="${x.id}">${own?'EN TU COLECCIÓN':'COMPRAR'}</button></div>`}).join('');
 root.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>buy(b.dataset.item));
}
function buy(id){const x=findItem(id);if(!x||state.owned.includes(id))return;if(state.money<x.price)return toast('Dinero virtual insuficiente.');state.money-=x.price;state.owned.push(id);state.xp+=25;save();update();renderItems();renderTop();toast(`💎 Compraste ${x.name}`)}
function renderProfile(){
 const el=document.querySelector('#profileContent');if(!el||!state)return;ensureProfile(state);const net=state.money+assetsOf(state);
 el.innerHTML=`<div class="panel profile-card"><div class="profile-head"><div class="avatar">${flagOf(state)}</div><div><h2>${esc(user)}</h2><div class="muted">${flagOf(state)} ${esc(state.profile.country)} · Nivel ${levelOf(state)} · ${state.xp||0} XP</div></div></div><div class="profile-grid">
 <label>País<select id="profileCountry">${Object.keys(COUNTRIES).map(c=>`<option ${state.profile.country===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>
 <label>Instagram<input id="social_instagram" value="${esc(state.profile.instagram)}" placeholder="@usuario"></label><label>TikTok<input id="social_tiktok" value="${esc(state.profile.tiktok)}" placeholder="@usuario"></label><label>YouTube<input id="social_youtube" value="${esc(state.profile.youtube)}" placeholder="Canal"></label><label>X<input id="social_x" value="${esc(state.profile.x)}" placeholder="@usuario"></label><label>Telegram<input id="social_telegram" value="${esc(state.profile.telegram)}" placeholder="@usuario"></label><label>Discord<input id="social_discord" value="${esc(state.profile.discord)}" placeholder="usuario"></label><label class="full">Bio<textarea id="profileBio" placeholder="Escribe algo sobre ti...">${esc(state.profile.bio)}</textarea></label></div><button class="gold" onclick="saveProfile()">GUARDAR PERFIL</button><div class="stats-row"><div><b>${fmt(state.money)}</b><span>Dinero</span></div><div><b>${fmt(net)}</b><span>Patrimonio</span></div><div><b>${state.owned.length}</b><span>Artículos</span></div></div><h3>Mi colección</h3><div class="mini-collection">${state.owned.length?state.owned.map(id=>{const x=findItem(id);return x?`<span class="tag">${x.icon} ${esc(x.name)}</span>`:''}).join(''):'<span class="muted">Sin artículos todavía.</span>'}</div></div>`;
}
function saveProfile(){ensureProfile(state);state.profile.country=document.querySelector('#profileCountry').value;['instagram','tiktok','youtube','x','telegram','discord'].forEach(k=>state.profile[k]=document.querySelector('#social_'+k)?.value.trim()||'');state.profile.bio=document.querySelector('#profileBio').value.trim();save();renderProfile();renderTop();toast('Perfil guardado')}
function showPublicProfile(name){const a=accounts()[name];if(!a)return;ensureProfile(a);const net=Number(a.money||0)+assetsOf(a),owned=(a.owned||[]).map(findItem).filter(Boolean);const el=document.querySelector('#leader');el.innerHTML=`<div class="public-profile"><button class="ghost" onclick="renderTop()">← Volver al ranking</button><div class="profile-head"><div class="avatar">${flagOf(a)}</div><div><h2>${esc(name)}</h2><div class="muted">${flagOf(a)} ${esc(a.profile.country)} · Nivel ${levelOf(a)} · ${a.xp||0} XP</div></div></div><p>${esc(a.profile.bio||'Este jugador todavía no tiene una bio.')}</p><div class="stats-row"><div><b>${fmt(a.money||0)}</b><span>Dinero</span></div><div><b>${fmt(net)}</b><span>Patrimonio</span></div><div><b>${owned.length}</b><span>Artículos</span></div></div><h3>Colección</h3><div class="mini-collection">${owned.length?owned.map(x=>`<span class="tag">${x.icon} ${esc(x.name)}</span>`).join(''):'<span class="muted">Sin artículos.</span>'}</div><div class="socials">${['instagram','tiktok','youtube','x','telegram','discord'].filter(k=>a.profile[k]).map(k=>`<span>${k.toUpperCase()}: ${esc(a.profile[k])}</span>`).join(' · ')}</div></div>`}

function usedToday(){return state.generatorSecondsDate===todayKey()?state.generatorSeconds||0:0}
function buyGenerator(id){const j=JOBS.find(x=>x.id===id);if(!j)return;if(!confirm(`Comprar acceso a ${j.name} por US$${j.real}?\n\nEl pago real todavía NO está conectado en esta beta.`))return;initGenerators();state.generators[id]={owned:true,active:false,elapsed:0,lastTick:Date.now()};save();renderJobs();toast('Acceso activado')}
function toggleGenerator(id){initGenerators();const g=state.generators[id];if(!g?.owned)return;if(!g.active){if(usedToday()>=7200)return toast('Ya utilizaste las 2 horas máximas de hoy.');g.active=true;g.lastTick=Date.now()}else{g.active=false;g.lastTick=Date.now()}save();renderJobs()}
function processGenerators(){if(!state)return;initGenerators();const now=Date.now();let changed=false,available=Math.max(0,7200-usedToday());JOBS.forEach(j=>{const g=state.generators[j.id];if(!g.owned||!g.active)return;const delta=Math.max(0,Math.floor((now-(g.lastTick||now))/1000));if(delta<=0)return;const consume=Math.min(delta,available);if(consume>0){g.elapsed=(g.elapsed||0)+consume;g.lastTick=(g.lastTick||now)+consume*1000;state.generatorSeconds+=consume;available-=consume;changed=true;while(g.elapsed>=j.seconds){g.elapsed-=j.seconds;state.money+=j.reward*levelOf(state);state.xp+=10}}if(consume<delta||available<=0){g.active=false;g.lastTick=now}});if(changed){save();update();renderJobs();renderTop()}}
function startGeneratorLoop(){if(generatorLoop)clearInterval(generatorLoop);generatorLoop=setInterval(processGenerators,1000)}
function renderJobs(){initGenerators();const root=document.querySelector('#jobgrid');if(!root)return;root.innerHTML=JOBS.map(j=>{const g=state.generators[j.id],remaining=Math.max(0,j.seconds-(g.elapsed||0)),pct=Math.min(100,((g.elapsed||0)/j.seconds)*100);return `<div class="job"><div class="icon">${j.icon}</div><h3>${j.name}</h3><p>${j.desc}</p><div class="income">+$${(j.reward*levelOf(state)).toLocaleString()} cada ${j.seconds}s</div><div class="muted">Acceso: US$${j.real} · Máximo diario: 2 horas</div>${g.owned?`<div class="gen-status">${g.active?'🟢 ACTIVADO':'⚪ DETENIDO'}</div><div class="timer"><i style="width:${pct}%"></i></div><div class="muted">${g.active?'Siguiente pago en '+remaining+'s':'Generador detenido'}</div><button class="${g.active?'running':''}" onclick="toggleGenerator('${j.id}')">${g.active?'DESACTIVAR':'ACTIVAR'}</button>`:`<button onclick="buyGenerator('${j.id}')">COMPRAR ACCESO · US$${j.real}</button>`}</div>`}).join('')}

function categoryScore(player,cat){const vals=(player.owned||[]).map(findItem).filter(x=>x&&x.cat===cat).map(x=>x.price);return vals.length?Math.max(...vals):0}
function otherPlayers(){const a=accounts();return Object.entries(a).filter(([name])=>name!==user)}
function openDuel(stake){if(state.money<stake)return toast('No tienes suficiente dinero virtual.');if(!otherPlayers().length)return toast('Necesitas al menos otro jugador registrado para un 1 VS 1.');state.duelPending={stake};save();renderDuel()}
function renderDuel(){const root=document.querySelector('#duelArea');if(!root)return;const pending=state.duelPending;const others=otherPlayers();root.innerHTML=`<div class="duel-panel"><p class="muted">Elige una apuesta y luego selecciona un rival. Solo dinero virtual no retirable.</p><div class="stake-grid">${DUEL_STAKES.map(s=>`<button class="stake ${pending?.stake===s?'active':''}" onclick="openDuel(${s})">${fmt(s)}</button>`).join('')}</div>${pending?`<div class="duel-select"><h3>Selecciona rival</h3><div class="opponents">${others.map(([name,a])=>`<button class="opponent" onclick="challengeDuel('${esc(name)}')"><b>${flagOf(a)} ${esc(name)}</b><small>Nivel ${levelOf(a)} · ${fmt(Number(a.money||0)+assetsOf(a))}</small></button>`).join('')}</div></div>`:''}<div class="duel-rules"><h3>🏆 Competencias</h3>${DUEL_CATEGORIES.map((x,i)=>`<div>${i+1}. ${x.label}</div>`).join('')}<p class="muted">Se compara el artículo de mayor valor de cada categoría. Gana quien consiga más categorías.</p></div></div>`}
async function challengeDuel(opponentName){
 const d=state.duelPending;if(!d)return;
 try{const token=localStorage.getItem(TOKEN);if(token){save();const out=await apiFetch('/api/duel',{method:'POST',body:JSON.stringify({opponent:opponentName,stake:d.stake})});if(out.draw){state.duelPending=null;save();renderDuel();return alert(`⚔️ EMPATE\n\nTú: ${out.mine}\n${opponentName}: ${out.his}\n\nLa apuesta no cambia.`)}state.money+=out.win?d.stake:-d.stake;state.xp=Math.max(0,(state.xp||0)+(out.win?25:-10));state.duelPending=null;save();await fetchOnlineAccounts();update();renderTop();renderDuel();return alert(`RESULTADO 1 VS 1\n\nTú: ${out.mine} competencias\n${opponentName}: ${out.his} competencias\n\n${out.win?'🏆 GANASTE':'💀 PERDISTE'}\n${out.win?'+':'-'}${fmt(d.stake)}\n\n${out.results.map(r=>`${r.label}: ${fmt(r.mine)} vs ${fmt(r.his)}`).join('\n')}`)}
 }catch(e){return toast(e.message||'No se pudo realizar el duelo.')}
}


async function renderMystery(){const sold=document.querySelector('#mysterySold'),timer=document.querySelector('#mysteryTimer'),btn=document.querySelector('#mysteryBuy');if(!sold||!timer)return;try{const d=await apiFetch('/api/mystery/status');sold.textContent=`${d.sold} / ${d.limit}`;btn.disabled=!d.active;btn.textContent=d.active?'COMPRAR POR US$5':(d.sold>=d.limit?'AGOTADA':'FINALIZADA');timer.textContent=formatCountdown(d.remainingMs);if(window.mysteryTick)clearInterval(window.mysteryTick);window.mysteryTick=setInterval(async()=>{try{const x=await apiFetch('/api/mystery/status');sold.textContent=`${x.sold} / ${x.limit}`;timer.textContent=formatCountdown(x.remainingMs);btn.disabled=!x.active;if(!x.active)btn.textContent=x.sold>=x.limit?'AGOTADA':'FINALIZADA'}catch{}},1000)}catch(e){timer.textContent='No disponible'}}
function formatCountdown(ms){let s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),x=s%60;return [h,m,x].map(v=>String(v).padStart(2,'0')).join(':')}
async function buyMystery(){try{const d=await apiFetch('/api/mystery/checkout',{method:'POST'});if(d.url){location.href=d.url;return}}catch(e){if(e.setupRequired)return toast('⚙️ Falta configurar Stripe en Render para cobrar los US$5 reales.');return toast(e.message||'No se pudo abrir el checkout.')}}
async function claimMystery(){const params=new URLSearchParams(location.search),sid=params.get('mystery_session');if(!sid)return;try{const d=await apiFetch('/api/mystery/claim',{method:'POST',body:JSON.stringify({sessionId:sid})});const box=document.querySelector('#mysteryReward');box.classList.remove('hidden');box.innerHTML=`<div class="reward-icon">${d.reward.icon}</div><h3>🎉 ¡CAJA ABIERTA!</h3><p>Ganaste <b>${esc(d.reward.name)}</b>.</p><p class="muted">Exclusivo · Valor virtual: ${fmt(d.reward.value)}</p>`;state.owned=Array.from(new Set([...(state.owned||[]),d.reward.id]));save();renderItems();history.replaceState({},'',location.pathname);go('mystery');toast('🎁 Recompensa entregada')}catch(e){toast(e.message||'No se pudo entregar la recompensa.')}}
document.querySelector('#mysteryBuy')?.addEventListener('click',buyMystery);

let session=localStorage.getItem(OWN);if(session&&accounts()[session]){user=session;state=accounts()[session];ensureProfile(state);initGenerators();save();openApp();startGeneratorLoop();claimMystery()}

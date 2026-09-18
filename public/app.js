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
const SUPABASE_URL='https://vaqnrnzrglnzwugiewla.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_Y1F-PUt1exfsTZKWwEaykw__3iVrrr-';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const accounts=()=>({});
const saveAccounts=()=>{};
const fmt=n=>'$'+Math.floor(Number(n)||0).toLocaleString('en-US');
const money=n=>fmt(n);
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const findItem=id=>ITEMS.find(x=>x.id===id);
const assetsOf=s=>(s.owned||[]).map(findItem).filter(Boolean).reduce((n,x)=>n+x.price,0);
const levelOf=s=>Math.floor((Number(s.xp)||0)/100)+1;
function ensureProfile(a){a.profile=a.profile||{};a.profile.country=a.profile.country||'República Dominicana';a.profile.bio=a.profile.bio||'';['instagram','tiktok','youtube','x','telegram','discord'].forEach(k=>a.profile[k]=a.profile[k]||'');return a.profile}
function flagOf(a){return COUNTRIES[ensureProfile(a).country]||'🌎'}
function stateFromProfile(p, owned=[]){return {money:Number(p.virtual_cash||0),xp:Number(p.xp||0),owned:owned.map(x=>x.slug||x).filter(Boolean),profile:{country:p.country||'República Dominicana',bio:p.bio||'',instagram:p.instagram||'',tiktok:p.tiktok||'',youtube:p.youtube||'',x:p.x||'',telegram:p.telegram||'',discord:p.discord||''}}}
async function refreshState(){const {data:{user:au},error:ue}=await db.auth.getUser();if(ue||!au)throw ue||new Error('Sesión no encontrada');const {data:p,error:pe}=await db.from('profiles').select('*').eq('id',au.id).single();if(pe)throw pe;const {data:owned,error:oe}=await db.from('user_items').select('quantity, items(slug)').eq('user_id',au.id);if(oe)throw oe;state=stateFromProfile(p,(owned||[]).flatMap(r=>Array(Math.max(1,Number(r.quantity)||1)).fill(r.items||{})));user=p.username;ensureProfile(state)}
async function syncAfterMutation(p){if(!p)return;const {data:owned}=await db.from('user_items').select('quantity, items(slug)').eq('user_id',p.id);state=stateFromProfile(p,(owned||[]).flatMap(r=>Array(Math.max(1,Number(r.quantity)||1)).fill(r.items||{})));user=p.username;ensureProfile(state);update()}
function initGenerators(){state.generators=state.generators||{}}
function save(){}
function openApp(){document.querySelector('#loginScreen').classList.add('hidden');document.querySelector('#app').classList.remove('hidden');update();renderTop();renderItems();renderJobs();go('home')}
async function logout(){await db.auth.signOut();location.reload()}
async function login(email,pass,create=false,name=''){email=email.trim().toLowerCase();name=name.trim().toLowerCase();if(!email||!pass)return document.querySelector('#authMsg').textContent='Completa correo y contraseña.';if(create&&!name)return document.querySelector('#authMsg').textContent='Escribe un nombre de usuario.';document.querySelector('#authMsg').textContent=create?'Creando cuenta...':'Iniciando sesión...';const result=create?await db.auth.signUp({email,password:pass,options:{data:{username:name}}}):await db.auth.signInWithPassword({email,password:pass});if(result.error)return document.querySelector('#authMsg').textContent=result.error.message;if(create&&!result.data.session)return document.querySelector('#authMsg').textContent='Cuenta creada. Revisa tu correo para confirmar la cuenta y luego inicia sesión.';try{await refreshState();openApp();}catch(e){document.querySelector('#authMsg').textContent='No se pudo cargar tu perfil: '+e.message;}}
document.querySelector('#loginBtn').onclick=()=>login(document.querySelector('#email').value,document.querySelector('#password').value,false);
document.querySelector('#createBtn').onclick=()=>login(document.querySelector('#email').value,document.querySelector('#password').value,true,document.querySelector('#username').value);
document.querySelector('#logout').onclick=logout;
document.querySelector('#collect').onclick=collectMoney;
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>go(b.dataset.page));
document.querySelectorAll('[data-page]').forEach(b=>{if(!b.classList.contains('nav'))b.onclick=()=>go(b.dataset.page)});
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('hidden',p.id!==id));document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===id));if(id==='top')renderTop();if(id==='duel')renderDuel();if(id==='jobs')renderJobs();if(id==='items')renderItems();if(id==='profile')renderProfile()}
async function collectMoney(){const {data:p,error}=await db.rpc('collect_money');if(error)return toast(error.message||'No se pudo recoger el dinero.');await syncAfterMutation(p);renderTop();toast('💰 +$20 · +2 XP')}
async function renderTop(){const el=document.querySelector('#leader');if(!el)return;const {data:rows,error}=await db.from('profiles').select('username,country,xp,virtual_cash,instagram,tiktok,youtube,x,telegram,discord').order('virtual_cash',{ascending:false}).limit(50);if(error){el.innerHTML='<p class="muted">No se pudo cargar el ranking.</p>';return;}el.innerHTML=`<div class="rank rank-head"><div>#</div><div>Jugador</div><div>Patrimonio</div><div>Nivel</div><div></div></div>`+(rows||[]).map((r,i)=>{const a={profile:r};return `<div class="rank"><div class="pos">#${i+1}</div><div class="player"><b>${flagOf(a)} ${esc(r.username)}${r.username===user?' <small>(TÚ)</small>':''}</b><small>${esc(r.country||'')}</small></div><div class="wealth">${fmt(r.virtual_cash)}</div><div class="lv">Nivel ${levelOf(r)}</div><div><button class="small-btn" onclick="showPublicProfile('${esc(r.username)}')">VER PERFIL</button></div></div>`}).join('')}
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
async function saveProfile(){ensureProfile(state);state.profile.country=document.querySelector('#profileCountry').value;['instagram','tiktok','youtube','x','telegram','discord'].forEach(k=>state.profile[k]=document.querySelector('#social_'+k)?.value.trim()||'');state.profile.bio=document.querySelector('#profileBio').value.trim();const {data:p,error}=await db.rpc('update_my_profile',{p_country:state.profile.country,p_bio:state.profile.bio,p_instagram:state.profile.instagram,p_tiktok:state.profile.tiktok,p_youtube:state.profile.youtube,p_x:state.profile.x,p_telegram:state.profile.telegram,p_discord:state.profile.discord});if(error)return toast(error.message||'No se pudo guardar el perfil.');await syncAfterMutation(p);renderProfile();renderTop();toast('Perfil guardado')}
async function showPublicProfile(name){const {data:a,error}=await db.from('profiles').select('*').eq('username',name).single();if(error||!a)return;const {data:owned}=await db.from('user_items').select('quantity, items(slug,name,value,image_url)').eq('user_id',a.id);const items=(owned||[]).flatMap(r=>Array(Math.max(1,Number(r.quantity)||1)).fill(r.items||{}));const net=Number(a.virtual_cash||0)+items.reduce((n,x)=>n+Number(x.value||0),0);const el=document.querySelector('#leader');el.innerHTML=`<div class="public-profile"><button class="ghost" onclick="renderTop()">← Volver al ranking</button><div class="profile-head"><div class="avatar">${flagOf({profile:a})}</div><div><h2>${esc(name)}</h2><div class="muted">${flagOf({profile:a})} ${esc(a.country||'')} · Nivel ${levelOf(a)} · ${a.xp||0} XP</div></div></div><p>${esc(a.bio||'Este jugador todavía no tiene una bio.')}</p><div class="stats-row"><div><b>${fmt(a.virtual_cash||0)}</b><span>Dinero</span></div><div><b>${fmt(net)}</b><span>Patrimonio</span></div><div><b>${items.length}</b><span>Artículos</span></div></div><h3>Colección</h3><div class="mini-collection">${items.length?items.map(x=>`<span class="tag">${esc(x.image_url||'💎')} ${esc(x.name)}</span>`).join(''):'<span class="muted">Sin artículos.</span>'}</div><div class="socials">${['instagram','tiktok','youtube','x','telegram','discord'].filter(k=>a[k]).map(k=>`<span>${k.toUpperCase()}: ${esc(a[k])}</span>`).join(' · ')}</div></div>`}

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
function challengeDuel(opponentName){const d=state.duelPending;if(!d)return;const a=accounts(),opp=a[opponentName];if(!opp)return;if(state.money<d.stake)return toast('Fondos insuficientes.');if(Number(opp.money||0)<d.stake)return toast('Ese rival no tiene suficiente dinero virtual para cubrir la apuesta.');let me=0,them=0,results=[];DUEL_CATEGORIES.forEach(c=>{const mine=categoryScore(state,c.id),his=categoryScore(opp,c.id);if(mine>his)me++;else if(his>mine)them++;results.push({label:c.label,mine,his})});if(me===them)return alert(`⚔️ EMPATE\n\nTú: ${me}\n${opponentName}: ${them}\n\nLa apuesta no cambia.`);const win=me>them;if(win){state.money+=d.stake;opp.money-=d.stake}else{state.money-=d.stake;opp.money+=d.stake}state.xp=Math.max(0,(state.xp||0)+(win?25:-10));opp.xp=Math.max(0,(opp.xp||0)+(win?-10:25));state.duelPending=null;a[user]=state;a[opponentName]=opp;saveAccounts(a);save();update();renderTop();renderDuel();alert(`RESULTADO 1 VS 1\n\nTú: ${me} competencias\n${opponentName}: ${them} competencias\n\n${win?'🏆 GANASTE':'💀 PERDISTE'}\n${win?'+':'-'}${fmt(d.stake)}\n\n${results.map(r=>`${r.label}: ${fmt(r.mine)} vs ${fmt(r.his)}`).join('\n')}`)}

(async function bootstrap(){try{const {data:{session}}=await db.auth.getSession();if(session){await refreshState();openApp();}}catch(e){console.error(e)}})();
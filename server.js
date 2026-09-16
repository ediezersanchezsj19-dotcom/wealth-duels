const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, 'public');
const PORT = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

// Lightweight online state. For durable production data, connect a database before launch.
const onlineAccounts = new Map();
const sessions = new Map();
const mysteryClaims = new Set();
const mystery = { startedAt: null, sold: 0, limit: 100, hours: 24 };
const MYSTERY_REWARDS = [
  { id: 'mystery_emerald_hoodie', type: 'Prenda', name: 'Emerald Wealth Hoodie', icon: '🧥', value: 25000 },
  { id: 'mystery_shadow_gt', type: 'Vehículo', name: 'Shadow GT — Wealth Edition', icon: '🏎️', value: 850000 }
];

function json(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}
function body(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', c => { raw += c; if (raw.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('JSON inválido')); } });
    req.on('error', reject);
  });
}
function hashPassword(pass, salt) { return crypto.scryptSync(pass, salt, 64).toString('hex'); }
function makeAccount() { return { money: 100000, xp: 0, owned: [], profile: { country: 'República Dominicana', bio: '', instagram: '', tiktok: '', youtube: '', x: '', telegram: '', discord: '' }, generators: {}, generatorSeconds: 0, generatorSecondsDate: new Date().toISOString().slice(0,10) }; }
function publicAccount(a) { const x = { ...a }; delete x.passwordHash; delete x.salt; return x; }
function authUser(req) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  return sessions.get(token) || null;
}
function syncAccount(name, data) {
  if (!name || !data) return;
  const current = onlineAccounts.get(name) || makeAccount();
  const safe = JSON.parse(JSON.stringify(data));
  delete safe.passwordHash; delete safe.salt;
  onlineAccounts.set(name, { ...current, ...safe });
}
function mysteryStatus() {
  const now = Date.now();
  if (mystery.startedAt && now - mystery.startedAt >= mystery.hours * 3600000) {
    mystery.startedAt = null; mystery.sold = 0; mysteryClaims.clear();
  }
  const remaining = mystery.startedAt ? Math.max(0, mystery.hours * 3600000 - (now - mystery.startedAt)) : mystery.hours * 3600000;
  return { sold: mystery.sold, remainingMs: remaining, limit: mystery.limit, active: mystery.sold < mystery.limit && (!mystery.startedAt || remaining > 0), startsOnFirstPurchase: !mystery.startedAt };
}

async function api(req, res, urlPath) {
  if (urlPath === '/api/health') return json(res, 200, { ok: true });
  if (urlPath === '/api/accounts') return json(res, 200, { accounts: Object.fromEntries([...onlineAccounts].map(([n,a]) => [n, publicAccount(a)])) });
  if (urlPath === '/api/mystery/status') return json(res, 200, mysteryStatus());

  if (urlPath === '/api/register' && req.method === 'POST') {
    const b = await body(req); const name = String(b.name || '').trim().toLowerCase(); const pass = String(b.password || '');
    if (!/^[a-z0-9_]{3,20}$/.test(name) || pass.length < 4) return json(res, 400, { error: 'Usuario: 3-20 caracteres (a-z, 0-9, _). Contraseña: mínimo 4.' });
    if (onlineAccounts.has(name)) return json(res, 409, { error: 'Ese usuario ya existe.' });
    const salt = crypto.randomBytes(16).toString('hex'); const a = makeAccount(); a.salt = salt; a.passwordHash = hashPassword(pass, salt); onlineAccounts.set(name, a);
    const token = crypto.randomBytes(32).toString('hex'); sessions.set(token, name); return json(res, 201, { token, name, account: publicAccount(a) });
  }
  if (urlPath === '/api/login' && req.method === 'POST') {
    const b = await body(req); const name = String(b.name || '').trim().toLowerCase(); const pass = String(b.password || ''); const a = onlineAccounts.get(name);
    if (!a) return json(res, 401, { error: 'Cuenta no encontrada.' });
    if (a.passwordHash && hashPassword(pass, a.salt) !== a.passwordHash) return json(res, 401, { error: 'Contraseña incorrecta.' });
    const token = crypto.randomBytes(32).toString('hex'); sessions.set(token, name); return json(res, 200, { token, name, account: publicAccount(a) });
  }
  if (urlPath === '/api/sync' && req.method === 'POST') {
    const name = authUser(req); if (!name) return json(res, 401, { error: 'Sesión no válida.' }); const b = await body(req); syncAccount(name, b.account); return json(res, 200, { ok: true });
  }
  if (urlPath === '/api/mystery/checkout' && req.method === 'POST') {
    const name = authUser(req); if (!name) return json(res, 401, { error: 'Inicia sesión primero.' });
    const status = mysteryStatus(); if (!status.active) return json(res, 409, { error: 'La caja está agotada o la ventana de 24 horas terminó.' });
    // Stripe is required for real money. Never advertise a live charge until the secret key is configured.
    if (!process.env.STRIPE_SECRET_KEY) return json(res, 503, { error: 'Pago real no configurado todavía.', setupRequired: true });
    if (!mystery.startedAt) mystery.startedAt = Date.now();
    const base = process.env.PUBLIC_URL || `http://localhost:${PORT}`;
    const params = new URLSearchParams(); params.set('mode','payment'); params.set('success_url', `${base}/?mystery_session={CHECKOUT_SESSION_ID}`); params.set('cancel_url', `${base}/?mystery_cancelled=1`); params.set('line_items[0][price_data][currency]','usd'); params.set('line_items[0][price_data][product_data][name]','Wealth Duels — Caja Misteriosa Exclusiva'); params.set('line_items[0][price_data][unit_amount]','500'); params.set('line_items[0][quantity]','1'); params.set('metadata[account]', name);
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', { method:'POST', headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded'}, body:params });
    const out = await r.json(); if (!r.ok) return json(res, 502, { error: 'Stripe no pudo crear el checkout.', detail: out.error?.message });
    return json(res, 200, { url: out.url });
  }
  if (urlPath === '/api/mystery/claim' && req.method === 'POST') {
    const name = authUser(req); if (!name) return json(res, 401, { error: 'Sesión no válida.' }); const b = await body(req); const sid = String(b.sessionId || '');
    if (!sid || mysteryClaims.has(sid)) return json(res, 409, { error: 'Esta compra ya fue entregada.' });
    if (!process.env.STRIPE_SECRET_KEY) return json(res, 503, { error: 'Pago real no configurado todavía.' });
    const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sid)}`, { headers:{Authorization:`Bearer ${process.env.STRIPE_SECRET_KEY}`} }); const session = await r.json();
    if (!r.ok || session.payment_status !== 'paid' || session.amount_total !== 500 || session.metadata?.account !== name) return json(res, 402, { error: 'El pago no aparece como completado.' });
    const status = mysteryStatus(); if (!status.active || mystery.sold >= mystery.limit) return json(res, 409, { error: 'La caja se agotó.' });
    const reward = MYSTERY_REWARDS[Math.floor(Math.random()*MYSTERY_REWARDS.length)]; mysteryClaims.add(sid); mystery.sold++;
    const a = onlineAccounts.get(name) || makeAccount(); a.owned = Array.from(new Set([...(a.owned||[]), reward.id])); onlineAccounts.set(name, a);
    return json(res, 200, { reward, sold:mystery.sold, remaining:Math.max(0,mystery.limit-mystery.sold) });
  }
  if (urlPath === '/api/duel' && req.method === 'POST') {
    const name = authUser(req); if (!name) return json(res, 401, { error: 'Sesión no válida.' }); const b = await body(req); const opponent=String(b.opponent||'').toLowerCase(); const stake=Number(b.stake); const me=onlineAccounts.get(name), opp=onlineAccounts.get(opponent);
    if (!me || !opp || name===opponent) return json(res,400,{error:'Rival no válido.'}); if(![50000,100000,200000,500000,1000000,5000000,10000000].includes(stake)) return json(res,400,{error:'Apuesta no válida.'}); if(Number(me.money||0)<stake||Number(opp.money||0)<stake)return json(res,400,{error:'Uno de los jugadores no tiene fondos virtuales suficientes.'});
    const cats=[['Auto','🏎️ Mejor Auto'],['Mansión','🏠 Mejor Mansión'],['Animal','🐎 Mejor Animal'],['Joya','💎 Mejor Joya'],['Yate','🛥️ Mejor Bote'],['Jet','✈️ Mejor Jet']]; const score=(a,c)=>{const vals=(a.owned||[]).map(id=>{const catalog=globalThis.__WD_ITEMS||[];return catalog.find(x=>x.id===id)}).filter(x=>x&&x.cat===c).map(x=>x.price);return vals.length?Math.max(...vals):0};
    let mine=0,his=0,results=[]; cats.forEach(([id,label])=>{const x=score(me,id),y=score(opp,id);if(x>y)mine++;else if(y>x)his++;results.push({label,mine:x,his:y})}); if(mine===his)return json(res,200,{draw:true,mine,his,results}); const win=mine>his; me.money += win?stake:-stake; opp.money += win?-stake:stake; me.xp=Math.max(0,(me.xp||0)+(win?25:-10)); opp.xp=Math.max(0,(opp.xp||0)+(win?-10:25)); onlineAccounts.set(name,me);onlineAccounts.set(opponent,opp);return json(res,200,{draw:false,win,mine,his,results,stake});
  }
  return json(res, 404, { error: 'API no encontrada' });
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath.startsWith('/api/')) { try { return await api(req,res,urlPath); } catch(e) { return json(res,500,{error:e.message||'Error del servidor'}); } }
  if (urlPath === '/health') { res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}); return res.end('ok'); }
  const requested = urlPath === '/' ? '/index.html' : urlPath;
  const file = path.resolve(root, '.' + requested);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file,(err,stat)=>{ if(err||!stat.isFile()){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');} res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res); });
});

// Catalog used by the duel endpoint; prices/categories match the client catalog.
try { globalThis.__WD_ITEMS = JSON.parse(fs.readFileSync(path.join(root,'items-catalog.json'),'utf8')); } catch {}
server.listen(PORT,'0.0.0.0',()=>console.log(`WEALTH DUELS online on port ${PORT}`));

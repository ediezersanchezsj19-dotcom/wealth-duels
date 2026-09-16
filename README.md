# WEALTH DUELS 1.2

Juego web social de patrimonio virtual. El dinero del juego no es retirable.

## Estructura
- `public/index.html`
- `public/app.js`
- `public/style.css`
- `public/items-catalog.json`
- `server.js`
- `package.json`

## Render
- Build Command: `npm install`
- Start Command: `npm start`
- Branch: `main`

## Cuenta de demostración
- Usuario: `wealthking`
- Contraseña: `WealthDuels2026!`
- Patrimonio virtual inicial: muy alto para pruebas

También se incluyen `duelbot` y `luxurypro` como rivales de prueba.

## Recuperación por correo
Crear cuenta exige un correo. Para enviar enlaces reales de recuperación configura `RESEND_API_KEY`, `FROM_EMAIL` y `PUBLIC_URL` como variables de entorno en Render.

## Caja Misteriosa
La interfaz y el endpoint de Stripe están preparados para US$5 reales y máximo 100 entregas durante una ventana de 24 horas. No se habilita el cobro hasta configurar `STRIPE_SECRET_KEY`.

Antes de aceptar pagos reales, revisa requisitos legales y de protección al consumidor aplicables al producto y a los sorteos/recompensas aleatorias.

# WEALTH DUELS — ONLINE DEPLOYMENT

Esta build queda preparada para desplegarse en un hosting Node.js.

## Opción rápida: Render / Railway / VPS
1. Sube este proyecto a GitHub.
2. Crea un servicio Web Service/Node.
3. Build: `npm install` (si no hay dependencias, puede ser instantáneo).
4. Start: `npm start`
5. El hosting debe inyectar `PORT`; el servidor ya escucha en `0.0.0.0`.
6. Abre la URL HTTPS que te entregue el hosting.

## IMPORTANTE
Esta versión todavía es una build online/pre-release:
- El estado de cuentas/economía no debe considerarse seguro para producción masiva.
- Antes de abrirla al público hay que migrar el estado a una base de datos central.
- Hay que implementar autenticación de sesión segura, rate limiting y validación server-side de dinero/XP/compras.
- El matchmaking/resolución de duelos debe quedar server-side.
- La moneda sigue siendo virtual y no redimible.

## Dominio
Cuando tengas una URL del hosting, puedes conectar un dominio como:
`wealthduels.com`
desde el panel DNS del registrador.

## Local
`npm start`
y abre `http://localhost:3000`.

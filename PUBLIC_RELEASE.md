# Wealth Duels v1.0 PUBLIC

Base: Wealth Duels Beta 1.8 CLEAN

## Public-release rules
- Currency is virtual and non-redeemable.
- Duel stakes are virtual only.
- Demo generator purchases are not connected to a payment processor.
- Do not treat client-side state as secure for a real public economy.

## Run locally
npm run dev

Then open http://127.0.0.1:3000

## Before public deployment
1. Move account/economy state to a server database.
2. Hash passwords with a password-hashing algorithm.
3. Validate every economy mutation on the server.
4. Add authenticated sessions/cookies.
5. Add rate limiting and request validation.
6. Replace simulated duel resolution with server-side matchmaking/resolution.
7. Configure HTTPS and production secrets.
8. Add backups, logging and abuse controls.

The current package is a PUBLIC BETA/PRE-RELEASE build, not a secure real-money production economy.


## 2026 Upgrade — Green UI + Mystery Drop + Online Duels
- The $20 collect button has no cooldown.
- Added a Mystery Box priced at US$5 with two exclusive virtual rewards.
- The drop is capped at 100 delivered boxes and runs for 24 hours from the first live checkout.
- Real payment uses Stripe Checkout and requires `STRIPE_SECRET_KEY` plus `PUBLIC_URL` in Render. Until configured, the button does not charge anyone.
- Added server-backed accounts, global leaderboard data and server-side 1v1 duel settlement for the live process.
- The server keeps the 100-box cap and duel balances on the backend; for durable production storage across restarts/multiple instances, connect PostgreSQL before a full public launch.

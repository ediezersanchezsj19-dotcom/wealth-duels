# Wealth Duels — Supabase connection

This build connects the browser app to the `wealth-duels` Supabase project.

Implemented:
- Supabase Auth email/password sign-up and sign-in.
- Automatic `profiles` row on Auth signup.
- Persistent virtual cash and XP through database RPCs.
- Persistent collection purchases through database RPCs.
- Public ranking from `profiles`.
- Public profile lookup from the database, including social fields.
- Secure profile editing through `update_my_profile` RPC.

The browser uses only the Supabase Publishable key. Do not add a Secret/service_role key to the frontend.

## Render
No new Node dependency is required for this build; Supabase JS is loaded from the browser CDN.
Keep the existing Render commands:
- Build: `npm install`
- Start: `npm start`

## Important
This is the first persistence integration. Duel matchmaking, generators, friends/chat, and Mystery Box still need their own server-side database actions before they should be considered fully online/persistent.

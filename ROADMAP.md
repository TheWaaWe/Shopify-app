# Road to "installable on any store" — WaaWe

Goal: public App Store listing so any merchant can install; the app authorizes our
TypeScript backend + external WaaWe dashboard to fetch per-store data via offline tokens.

## Step 1 — Production host + Postgres ✅ DONE
- Fly.io app `waawe-analytics` (org `waawe`, region `sin`): https://waawe-analytics.fly.dev
- Postgres: Neon (`neondb`), migration `20260928_init_pg` applied on boot via `docker-start`
- Unused Fly PG cluster `waawe-analytics-db` detached + destroyed (cost saving)
- `shopify.app.toml` → Fly URLs; Partners active version `waawe-analytics-3`
- `/healthcheck` endpoint + Fly HTTP checks passing; scale-to-zero enabled
- Secrets on Fly: `DATABASE_URL` (Neon), `SHOPIFY_API_SECRET`, `SHOPIFY_API_KEY`, `SCOPES`, `SHOPIFY_APP_URL`
- Proven: prod OAuth writes offline token row to Neon; live GraphQL (shop + products) with stored token
- Known limitation: orders/customers return `ACCESS_DENIED` until protected-data approval (step 3)

## Step 2 — Real copy ✅ DONE
- [x] Welcome screen shows live connection state (shop name from API)
- [x] Granted scopes displayed from the session (no hardcoded list)
- [x] No placeholder links: dashboard section replaced with truthful "what happens next"
      copy (store data + marketing/shipping data → business insights)
- [x] Dashboard deep-link plumbing kept behind `WAAWE_DASHBOARD_URL` env (unused until dashboard exists)
- [x] Disconnect copy verified truthful (uninstall webhook deletes sessions — yes)
- [ ] (Later, when dashboard exists: set `WAAWE_DASHBOARD_URL` on Fly + redeploy)

## Step 3 — Protected customer data approval ⏳ TODO
- Partners dashboard → WaaWe → API access → request `read_orders`/`read_customers` (protected)
- Must be granted BEFORE review submission. Start ASAP, takes time
- After grant: reinstall on dev store (re-consent) and re-verify orders query
- Dev-store unlock confirmed 2026-09-28: after reinstall, orders API returns HTTP 200
  (order #1001, PAID/FULFILLED). Note: a pre-existing token died with 401 around the
  time the form was saved — reinstall fixed it. Backend must implement refresh-token
  rotation + 401 → "needs re-auth" handling (see insights-engine backend work).

## Step 4 — GDPR webhooks in dashboard ✅ VERIFIED 2026-09-29
- Handlers fleshed out: `data_request`/`customers/redact` log + 200 (app stores
  no customer PII — sessions only); `shop/redact` deletes all Session rows.
- `shopify.app.toml` `[webhooks.privacy_compliance]` points all three at prod.
- Live on Fly (v7): all three webhook URLs answer 400 (=HMAC gate, not 404 —
  deployed and authenticating); `/support` + `/privacy` return 200.
- Pushed to Shopify: active version `waawe-4` released 2026-09-29 15:37 UTC,
  after the privacy_compliance URLs were in the toml.
- Residual (merchant-side): eyeball the three URLs in App setup → GDPR webhooks.
- Handlers fleshed out: `data_request`/`customers/redact` log + 200 (app stores
  no customer PII — sessions only); `shop/redact` deletes all Session rows.
- `shopify.app.toml` `[webhooks.privacy_compliance]` points all three at prod:
  - `https://waawe-analytics.fly.dev/webhooks/customers/data_request`
  - `https://waawe-analytics.fly.dev/webhooks/customers/redact`
  - `https://waawe-analytics.fly.dev/webhooks/shop/redact`
- Code deployed to Fly 2026-09-29 (healthcheck/privacy/support all 200).
- Still manual: `shopify app deploy` (pushes URLs to dashboard), then confirm
  the three URLs in App setup.

## Step 5 — App listing ✅ DONE (copy pack; uploads still manual)
- Paste-ready pack in APP_LISTING.md: name, tagline, description, pricing
  (Free), scope justifications, reviewer testing notes.
- Support URL live-ready at https://waawe-analytics.fly.dev/support (new public
  route app/routes/support.tsx — goes live with next deploy)
- Privacy policy live at https://waawe-analytics.fly.dev/privacy (source: PRIVACY.md + app/routes/privacy.tsx)
- Still manual: upload icon (1200×1200) + 3–6 screenshots (1600×900, real UI)
  in the dashboard listing form.

## Step 6 — Fresh-store test ✅ VERIFIED 2026-09-29 (dev store reinstall cycle)
- Reinstall: welcome screen, Neon offline token row, orders fetch HTTP 200 — all good
- Uninstall cleanup (Shopify requirement): `APP_UNINSTALLED` webhook received,
  answered 200, Neon shows zero Session rows for the shop — PROVEN
- Install on a brand-new dev store via listing flow
- Verify: welcome screen, Neon token row, uninstall deletes token (check Neon)

## Step 7 — Submit ⏳ TODO
- Partners dashboard → Distribution → submit for review (expect days–weeks + feedback round)

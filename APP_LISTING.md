# App Store listing pack — WaaWe

Paste-ready copy plus the asset checklist for the Partners dashboard listing.
Live URLs below are verified (both return 200 in prod).

## Paste-ready fields

- **Name:** WaaWe
- **Tagline:** Browse your live products and orders in admin — read-only and free.
- **Description:**

  WaaWe connects to your Shopify store with read-only access so you can
  browse your live products and orders without leaving Shopify admin.

  How it works: install the app, approve read-only access, and open it from
  Apps in your admin. The home page links to a live product browser — search
  your catalog and see prices and status at a glance — and a live order
  overview — newest orders first, with fulfillment and payment status on every
  row, plus one-tap filters for unpaid and unfulfilled orders. There is
  nothing to configure inside Shopify.

  What the app accesses (read-only, never modified): shop details, products,
  orders, and customers (buyer names appear on the order list). It does not
  change anything in your store and never shares data with other merchants.
  Uninstall at any time to stop sharing data — stored access tokens are
  deleted automatically.

- **Pricing:** Free. No charges, no paid plans, no in-app purchases.
- **Privacy policy URL:** https://waawe-analytics.fly.dev/privacy
- **Support URL:** https://waawe-analytics.fly.dev/support
- **Support contact:** thewaawe@gmail.com ( replies within 2 business days )
- **Suggested category:** Analytics (primary). Add Marketing as secondary only
  if the dashboard form offers it and it fits.
- **Search keywords:** analytics, sales reports, dashboard, insights, orders

## Why each scope (for the data-protection form)

| Scope | Why (read-only — what it powers in the app today) |
| --- | --- |
| `read_products` | Live product browser: titles, prices, vendors, status, plus search. |
| `read_orders` | Live order overview: contents, totals, fulfillment and payment status, plus unpaid/unfulfilled filters and search. |
| `read_customers` | Buyer names shown on the order list. |
| `read_analytics` | ⚠️ OPEN DECISION — nothing in the app uses this scope today (see note below). Either drop it before submission or be ready to justify it. |

## Assets to produce (dashboard uploads — not in this repo yet)

- **Icon:** 1200×1200 px PNG or JPEG. Simple mark, no text, no screenshots,
  no Shopify trademarks. (Verify exact spec on the upload form.)
- **Screenshots:** 1600×900 px (16:9), 3–6 images, each a different real view:
  1. Home screen in Shopify admin chrome (hero + Browse Your Products + Manage Orders).
  2. Products page with results grid.
  3. Products page with an active search (filtered results + match count).
  4. Orders page showing status pills.
  5. Orders page on the Unfulfilled tab or with an active search.
  Rules: actual UI only, no near-duplicates, no pricing text, no Shopify
  wordmark, no reviews or testimonials in the copy.
- **Feature image (if the form asks):** 1600×900, real product UI, same rules.

## Reviewer testing notes (paste into the submission form)

Test store needs: a development store stocked with at least 3 products and
2 orders (create test orders with the Bogus gateway or draft orders). On an
empty store the app correctly shows empty states — that is expected, not an
error. Note: `read_orders` / `read_customers` touch protected customer data;
that approval rides with this listing submission.

1. Install on the dev store by opening this link (replace the domain):
   `https://waawe-analytics.fly.dev/auth/login?shop=YOUR-STORE.myshopify.com`
   — approve the read-only scopes when prompted. The app opens on its home
   screen inside Shopify admin. (Install starts from this link / the App
   Store listing; the app's public landing page has no shop-domain form.)
2. Home: hero with two working buttons — "Browse Your Products" opens the
   Products page, "Manage Orders" opens the Orders page.
3. Products: grid shows live catalog (photo, name, price, status pill). Type
   in search — results filter live; "Clear" resets. Empty search shows a
   no-match notice, never an error page.
4. Orders: table shows newest orders first with color-coded fulfillment and
   payment pills. Switch All / Unpaid / Unfulfilled tabs; search by order
   number or customer; "Clear" resets.
5. Uninstall the app — stored access tokens are deleted automatically.
6. No test login needed — there is no separate account system. Contact
   thewaawe@gmail.com for questions during review.

## Dashboard click-path checklist

- [ ] App setup → GDPR mandatory webhooks: confirm all three point at prod
      (pushed by `shopify app deploy` from `shopify.app.toml`
      `[webhooks.privacy_compliance]` — verify, don't retype):
  - `https://waawe-analytics.fly.dev/webhooks/customers/data_request`
  - `https://waawe-analytics.fly.dev/webhooks/customers/redact`
  - `https://waawe-analytics.fly.dev/webhooks/shop/redact`
- [ ] Listing: name, tagline, description, icon, screenshots, pricing (Free),
      support + privacy-policy URLs from above.
- [ ] Data protection form: scope table above; submit with step 7.

## After code or URL changes

- Handler changes need a prod deploy (`fly deploy` or your pipeline) before
  re-testing the webhook URLs.
- `shopify.app.toml` webhook changes need `shopify app deploy` to reach the
  dashboard.

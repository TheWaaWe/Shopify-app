# Privacy Policy — WaaWe

**Effective date:** September 28, 2026
**Contact:** thewaawe@gmail.com · **Operator:** Utkarsh Verma, Bangalore, India

WaaWe ("the app") connects a merchant's Shopify store to the merchant's WaaWe
dashboard so the merchant gets business insights combining store data with their
marketing and shipping data. This policy explains what we access, why, and how we
protect it. It covers both merchants who install the app and their customers whose
data passes through it.

## 1. Data we access (read-only)

Via Shopify's Admin API, only after the merchant installs the app and approves access:

- **Shop data:** store name, domain, currency, plan type, contact email.
- **Products:** catalog details (titles, prices, vendors, status).
- **Orders:** order contents, totals, and buyer contact/shipping details.
- **Customers:** name, email address, and shipping/billing address.
  We do **not** request phone numbers, payment details, or passwords, and we never
  receive data from other merchants' stores.

## 2. How we use it

- Generate sales, customer, and product analytics **for the installing merchant only**.
- Combine store data with the merchant's own marketing and shipping data for
  richer insights (e.g. regional sales vs. fulfillment performance).
- Operate and secure the service (debugging, abuse prevention).

We do **not** sell personal data, use it for advertising to shoppers, or make
automated decisions with legal or similarly significant effects on individuals.

## 3. What we store and how it's protected

- **Access tokens:** one Shopify offline token per store, stored server-side in our
  database. Tokens never reach the browser.
- **Infrastructure:** hosted on Fly.io (US/Singapore regions) with enforced HTTPS;
  database on Neon Postgres with encryption at rest, encrypted automated backups,
  and TLS-only connections.
- **Access control:** only WaaWe staff who need it can access production data;
  staff accounts are protected by strong passwords and two-factor authentication,
  and data access is logged.

## 4. Sharing

We share personal data only as needed to run the service:

- **Infrastructure providers** (Fly.io for hosting, Neon for database), who process
  data solely on our instructions.
- **Legal compliance**, if required by law or to comply with Shopify's requirements.

No sale, rental, or marketing use of personal data, ever.

## 5. Retention and deletion

- Store access tokens are **deleted automatically when the app is uninstalled**
  (via Shopify's `app/uninstalled` webhook).
- Customer/order data fetched for analytics is kept only as long as needed to
  provide insights and is **deleted within 30 days of uninstall**.
- Merchant or customer deletion requests (via Shopify's mandatory GDPR webhooks or
  direct contact) are honored within 30 days.

## 6. Your rights

Merchants and their customers may request access, correction, or deletion of their
personal data at any time by contacting thewaawe@gmail.com. Deletion requests from
Shopify (customer data request / redact, shop redact webhooks) are processed
automatically. EU/UK users retain all rights under GDPR, including objection,
restriction, and portability.

## 7. Changes

If this policy changes materially, we will update the effective date above and, for
installed merchants, note the change on the app's welcome screen. Continued use of
the app after changes take effect constitutes acceptance.

---
*Hosting note: this file must be published at a public URL (e.g. your website or an
`/privacy` route on the app) before App Store review — the listing requires a
privacy-policy URL.*

import type { HeadersFunction } from "react-router";

// Public page (no authentication): hosts the privacy policy at /privacy
// for the App Store listing and merchant disclosure.
export default function Privacy() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Privacy Policy — WaaWe</title>
      </head>
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          lineHeight: 1.6,
          maxWidth: 720,
          margin: "0 auto",
          padding: "32px 16px",
          color: "#1a1a1a",
        }}
      >
        <h1>Privacy Policy — WaaWe</h1>
        <p>
          <strong>Effective date:</strong> September 28, 2026
          <br />
          <strong>Contact:</strong> thewaawe@gmail.com
          <br />
          <strong>Operator:</strong> Utkarsh Verma, Bangalore, India
        </p>
        <p>
          WaaWe (&ldquo;the app&rdquo;) connects a merchant&apos;s Shopify
          store to the merchant&apos;s WaaWe dashboard so the merchant gets business
          insights combining store data with their marketing and shipping data.
          This policy explains what we access, why, and how we protect it. It
          covers both merchants who install the app and their customers whose
          data passes through it.
        </p>

        <h2>1. Data we access (read-only)</h2>
        <p>
          Via Shopify&apos;s Admin API, only after the merchant installs the app
          and approves access:
        </p>
        <ul>
          <li>
            <strong>Shop data:</strong> store name, domain, currency, plan type,
            contact email.
          </li>
          <li>
            <strong>Products:</strong> catalog details (titles, prices, vendors,
            status).
          </li>
          <li>
            <strong>Orders:</strong> order contents, totals, and buyer
            contact/shipping details.
          </li>
          <li>
            <strong>Customers:</strong> name, email address, and shipping/billing
            address. We do <strong>not</strong> request phone numbers, payment
            details, or passwords, and we never receive data from other
            merchants&apos; stores.
          </li>
        </ul>

        <h2>2. How we use it</h2>
        <ul>
          <li>
            Generate sales, customer, and product analytics{" "}
            <strong>for the installing merchant only</strong>.
          </li>
          <li>
            Combine store data with the merchant&apos;s own marketing and
            shipping data for richer insights (e.g. regional sales vs.
            fulfillment performance).
          </li>
          <li>Operate and secure the service (debugging, abuse prevention).</li>
        </ul>
        <p>
          We do <strong>not</strong> sell personal data, use it for advertising
          to shoppers, or make automated decisions with legal or similarly
          significant effects on individuals.
        </p>

        <h2>3. What we store and how it&apos;s protected</h2>
        <ul>
          <li>
            <strong>Access tokens:</strong> one Shopify offline token per store,
            stored server-side in our database. Tokens never reach the browser.
          </li>
          <li>
            <strong>Infrastructure:</strong> hosted on Fly.io with enforced
            HTTPS; database on Neon Postgres with encryption at rest, encrypted
            automated backups, and TLS-only connections.
          </li>
          <li>
            <strong>Access control:</strong> only WaaWe staff who need it can
            access production data; staff accounts are protected by strong
            passwords and two-factor authentication, and data access is logged.
          </li>
        </ul>

        <h2>4. Sharing</h2>
        <p>We share personal data only as needed to run the service:</p>
        <ul>
          <li>
            <strong>Infrastructure providers</strong> (Fly.io for hosting, Neon
            for database), who process data solely on our instructions.
          </li>
          <li>
            <strong>Legal compliance</strong>, if required by law or to comply
            with Shopify&apos;s requirements.
          </li>
        </ul>
        <p>No sale, rental, or marketing use of personal data, ever.</p>

        <h2>5. Retention and deletion</h2>
        <ul>
          <li>
            Store access tokens are{" "}
            <strong>deleted automatically when the app is uninstalled</strong>{" "}
            (via Shopify&apos;s <code>app/uninstalled</code> webhook).
          </li>
          <li>
            Customer/order data fetched for analytics is kept only as long as
            needed to provide insights and is{" "}
            <strong>deleted within 30 days of uninstall</strong>.
          </li>
          <li>
            Merchant or customer deletion requests (via Shopify&apos;s mandatory
            GDPR webhooks or direct contact) are honored within 30 days.
          </li>
        </ul>

        <h2>6. Your rights</h2>
        <p>
          Merchants and their customers may request access, correction, or
          deletion of their personal data at any time by contacting{" "}
          <a href="mailto:thewaawe@gmail.com">thewaawe@gmail.com</a>. Deletion
          requests from Shopify (customer data request / redact, shop redact
          webhooks) are processed automatically. EU/UK users retain all rights
          under GDPR, including objection, restriction, and portability.
        </p>

        <h2>7. Changes</h2>
        <p>
          If this policy changes materially, we will update the effective date
          above and, for installed merchants, note the change on the app&apos;s
          welcome screen. Continued use of the app after changes take effect
          constitutes acceptance.
        </p>
      </body>
    </html>
  );
}

export const headers: HeadersFunction = () => ({
  "Content-Type": "text/html",
});

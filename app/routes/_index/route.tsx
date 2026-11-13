import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // Hand embedded-app entry (?shop=…&host=…) to the authenticated /app route.
  // There is intentionally no shop-domain form here: installation starts
  // from the Shopify App Store listing, per review requirement 2.3.1.
  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return null;
};

export default function Landing() {

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.wordmark}>WaaWe</span>
        <nav className={styles.nav}>
          <a href="#how">How it works</a>
          <a href="#data">Data access</a>
          <a href="/privacy">Privacy</a>
          <a href="/support">Support</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.headline}>
            Know exactly how your store is doing.
          </h1>
          <p className={styles.sub}>
            WaaWe connects to your Shopify store with read-only access — browse
            your live products and orders right inside Shopify admin.
            Nothing in your store is ever changed.
          </p>
        </section>

        <section id="how" className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <ol className={styles.steps}>
            <li>
              <strong>Install and approve access.</strong> Install WaaWe from
              the Shopify App Store and approve read-only scopes when prompted.
            </li>
            <li>
              <strong>WaaWe reads your store data.</strong> Catalog, sales, and
              customer data flow securely through Shopify&apos;s API — nothing
              in your store is changed.
            </li>
            <li>
              <strong>Browse in admin.</strong> View and search your live
              products and orders from the app&apos;s pages in your Shopify
              admin.
            </li>
          </ol>
        </section>

        <section id="data" className={styles.section}>
          <h2 className={styles.sectionTitle}>What WaaWe can read</h2>
          <p className={styles.sectionText}>
            Read-only, and only what your dashboard needs:
          </p>
          <dl className={styles.scopes}>
            <div>
              <dt>Products</dt>
              <dd>Catalog details — titles, prices, vendors, status.</dd>
            </div>
            <div>
              <dt>Orders</dt>
              <dd>Order contents and totals for sales insights.</dd>
            </div>
            <div>
              <dt>Customers</dt>
              <dd>Names and addresses for customer and regional insights.</dd>
            </div>
            <div>
              <dt>Analytics</dt>
              <dd>Shop metrics that power your reports.</dd>
            </div>
          </dl>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why choose WaaWe</h2>
          <ul className={styles.benefits}>
            <li>
              <strong>Nothing changes in your store.</strong> WaaWe only reads
              data — it never edits products, orders, or settings.
            </li>
            <li>
              <strong>Clean break on uninstall.</strong> Removing the app
              deletes its stored access tokens automatically.
            </li>
            <li>
              <strong>Your data stays yours.</strong> Your store data is only
              ever used for your store — never sold or shared with other
              merchants.
            </li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.wordmark}>WaaWe</span>
        <span className={styles.footerLinks}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/support">Support</a>
          <a href="mailto:thewaawe@gmail.com">thewaawe@gmail.com</a>
        </span>
      </footer>
    </div>
  );
}

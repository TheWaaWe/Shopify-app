import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Link } from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

import styles from "../styles/home.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return {};
};

const FEATURES = [
  {
    image: "/feature-1.png",
    alt: "Read-only connection to your Shopify store",
    cardClass: styles.cardClay,
    title: "Read-only store connection",
    text: "Install the app and approve access, and WaaWe connects to your store through Shopify's API. It only ever reads data — products, orders, and settings are never changed.",
  },
  {
    image: "/feature-2.png",
    alt: "Live product browser with search",
    cardClass: styles.cardStone,
    title: "Live product browser",
    text: "Browse your catalog without leaving Shopify admin. Search by name, see prices and status at a glance, and open the Products page for the full list.",
  },
  {
    image: "/feature-3.png",
    alt: "Live order overview with status filters",
    cardClass: styles.cardTeal,
    title: "Live order overview",
    text: "Your newest orders in one place, with fulfillment and payment status on every row. Filter to unpaid or unfulfilled orders, or search by order number and customer.",
  },
];

const WHY_ITEMS = [
  {
    title: "Read-only by design",
    text: "The app only reads store data. Nothing is edited, moved, or deleted — ever.",
  },
  {
    title: "Live from your store",
    text: "Products and orders load straight from Shopify's API, so what you see matches your admin.",
  },
  {
    title: "Search built in",
    text: "Find any product or order fast with search and one-tap status filters.",
  },
  {
    title: "Clean uninstall",
    text: "Removing the app deletes its stored access tokens automatically.",
  },
  {
    title: "Human support",
    text: "Questions about the app? Email us — we aim to reply within 2 business days.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to WaaWe</h1>
          <p className={styles.heroSub}>
            WaaWe connects to your store with read-only access, so you can
            browse your live products and orders right here in Shopify admin —
            without changing anything in your store.
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.cta} to="/app/products">
              Browse Your Products
            </Link>
            <Link
              className={`${styles.cta} ${styles.ctaSecondary}`}
              to="/app/orders"
            >
              Manage Orders
            </Link>
          </div>
        </section>

        <section>
          <div className={styles.featuresHead}>
            <h2 className={styles.sectionTitle}>What WaaWe does</h2>
            <p className={styles.sectionSub}>
              What the app does for your store today.
            </p>
          </div>
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={`${styles.row}${index % 2 === 1 ? ` ${styles.rowReverse}` : ""}`}
            >
              <div className={styles.copy}>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemText}>{feature.text}</p>
              </div>
              <figure className={`${styles.card} ${feature.cardClass}`}>
                <img src={feature.image} alt={feature.alt} />
              </figure>
            </div>
          ))}
        </section>
      </div>

      <section className={styles.whyBand}>
        <div className={styles.wrap}>
          <div className={styles.whyHead}>
            <h2 className={styles.sectionTitle}>Why choose us?</h2>
            <p className={styles.sectionSub}>
              Simple and safe — built to respect your store.
            </p>
          </div>
          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item) => (
              <div key={item.title}>
                <h3 className={styles.whyItemTitle}>{item.title}</h3>
                <p className={styles.whyItemText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.wrap}>
        <section className={styles.contact}>
          <h2 className={styles.contactTitle}>Questions about the app?</h2>
          <p className={styles.contactText}>
            Contact us for help with installation, access, or your data. Tell
            us your store domain and what you were trying to do.
          </p>
          <div className={styles.contactLinks}>
            <a href="tel:+919057554269">+91 90575 54269</a>
            <a href="mailto:thewaawe@gmail.com">thewaawe@gmail.com</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

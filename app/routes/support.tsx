import type { HeadersFunction } from "react-router";

// Public page (no authentication): hosts support contact info at /support
// for the App Store listing's support URL.
export default function Support() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Support — WaaWe</title>
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
        <h1>Support — WaaWe</h1>
        <p>
          Need help with WaaWe? Contact us at{" "}
          <a href="mailto:thewaawe@gmail.com">thewaawe@gmail.com</a> with your
          store domain (e.g. your-store.myshopify.com) and a short description
          of the issue.
        </p>
        <h2>Common topics</h2>
        <ul>
          <li>
            <strong>Installation:</strong> install from the Shopify App Store
            and approve the read-only access scopes when prompted.
          </li>
          <li>
            <strong>Data connection:</strong> your store&apos;s data flows to
            WaaWe automatically while the app is installed. If data is
            missing anywhere, keep the app installed and tell us your store
            domain — we will re-check the connection.
          </li>
          <li>
            <strong>Uninstall:</strong> remove the app from Apps in your Shopify
            admin to stop sharing data; stored access tokens are deleted
            automatically.
          </li>
          <li>
            <strong>Privacy requests:</strong> see our{" "}
            <a href="/privacy">privacy policy</a> for how to request access,
            correction, or deletion of your data.
          </li>
        </ul>
        <p>We aim to reply within 2 business days.</p>
      </body>
    </html>
  );
}

export const headers: HeadersFunction = () => ({
  "Content-Type": "text/html",
});

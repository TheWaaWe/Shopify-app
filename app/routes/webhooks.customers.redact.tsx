import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

// Mandatory GDPR webhook: customers/redact.
// Delete/redact a shopper's personal data. This app stores no customer-keyed
// rows — the only persisted records are per-shop offline tokens (Session) —
// so redaction is a no-op by construction. Log the request (no contact
// details) and answer 200 within Shopify's window. If customer-keyed storage
// is ever added, delete it here before returning.
export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, topic, payload } = await authenticate.webhook(request);

  const customerId = payload.customer?.id ?? "unknown";
  console.log(
    `Received ${topic} webhook for ${shop}: redacted customer ${customerId} (no customer-keyed rows stored)`,
  );

  return new Response();
};

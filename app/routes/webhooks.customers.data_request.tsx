import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";

// Mandatory GDPR webhook: customers/data_request.
// A store owner asked for a shopper's data. This app stores no customer PII
// of its own — it holds only per-shop offline tokens (Session rows) and reads
// live store data through the Admin API — so there is nothing to compile here.
// Log the request (no contact details) and answer 200 within Shopify's window.
// The merchant fulfills the shopper via the WaaWe dashboard or support email.
export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, topic, payload } = await authenticate.webhook(request);

  const customerId = payload.customer?.id ?? "unknown";
  console.log(
    `Received ${topic} webhook for ${shop}: data request for customer ${customerId} (no customer PII stored, nothing to return)`,
  );

  return new Response();
};

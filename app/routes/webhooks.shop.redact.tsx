import type { ActionFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import db from "../db.server";

// Mandatory GDPR webhook: shop/redact.
// Fires 48h after uninstall. Remove every stored record for the shop so no
// token or shop data survives. The app/uninstalled webhook already deletes
// sessions at uninstall time; this is the backstop (covers reinstall races
// and any future shop-keyed rows).
export const action = async ({ request }: ActionFunctionArgs) => {
  const { shop, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  await db.session.deleteMany({ where: { shop } });

  return new Response();
};

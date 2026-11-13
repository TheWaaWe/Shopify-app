
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { authenticate, login } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { pathname } = new URL(request.url);

  if (pathname === "/auth/login") {
    await login(request);
    return null;
  }

  await authenticate.admin(request);

  return null;
};

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({}: LoaderFunctionArgs) => {
  return new Response("OK", { status: 200 });
};

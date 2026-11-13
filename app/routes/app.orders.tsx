import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Form, Link, useLoaderData, useSubmit } from "react-router";
import { useRef } from "react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

import styles from "../styles/orders.module.css";

const ORDERS_QUERY = `#graphql
  query Orders($first: Int!, $query: String) {
    orders(first: $first, query: $query, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          name
          createdAt
          updatedAt
          displayFulfillmentStatus
          displayFinancialStatus
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          customer {
            displayName
          }
        }
      }
    }
  }`;

type Order = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  fulfillment: string;
  financial: string;
  total: string;
  currency: string;
  customer: string;
};

const MAX_ORDERS = 25;

const TABS = [
  { key: "all", label: "All orders" },
  { key: "unpaid", label: "Unpaid" },
  { key: "unfulfilled", label: "Unfulfilled" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function tabQuery(tab: TabKey, search: string) {
  const parts: string[] = [];
  if (search) parts.push(search);
  // Server-side filters so tabs work on the whole store, not just the page.
  if (tab === "unpaid") parts.push("financial_status:pending");
  if (tab === "unfulfilled") parts.push("fulfillment_status:unfulfilled");
  return parts.length > 0 ? parts.join(" ") : null;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const searchQuery = (url.searchParams.get("q") ?? "").trim();
  const tabParam = url.searchParams.get("tab");
  const tab: TabKey =
    tabParam === "unpaid" || tabParam === "unfulfilled" ? tabParam : "all";

  // Live orders, read-only from the Admin API. Failures degrade to an
  // inline notice — never an error page. Stores without approved order
  // access land here too, with an explanatory message.
  let orders: Order[] = [];
  let ordersError = "";
  try {
    const response = await admin.graphql(ORDERS_QUERY, {
      variables: { first: MAX_ORDERS, query: tabQuery(tab, searchQuery) },
    });
    const body = await response.json();
    if (body?.errors?.length) throw new Error("orders query rejected");
    const edges = body?.data?.orders?.edges ?? [];
    orders = edges.map(({ node }: any) => ({
      id: String(node.id ?? ""),
      name: String(node.name ?? "—"),
      createdAt: String(node.createdAt ?? ""),
      updatedAt: String(node.updatedAt ?? ""),
      fulfillment: String(node.displayFulfillmentStatus ?? ""),
      financial: String(node.displayFinancialStatus ?? ""),
      total: String(node.totalPriceSet?.shopMoney?.amount ?? ""),
      currency: String(node.totalPriceSet?.shopMoney?.currencyCode ?? ""),
      customer: String(node.customer?.displayName ?? ""),
    }));
  } catch {
    ordersError =
      "Couldn't load orders just now. This usually means order access isn't approved for this store yet, or the connection dropped — check back shortly and try again.";
  }

  return { searchQuery, tab, orders, ordersError };
};

function shortDate(iso: string) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  if (sameDay(date, today)) return "Today";
  if (sameDay(date, yesterday)) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fulfillmentPill(status: string) {
  const upper = status.toUpperCase();
  if (upper === "FULFILLED") return `${styles.pill} ${styles.pillGreen}`;
  if (upper === "UNFULFILLED") return `${styles.pill} ${styles.pillAmber}`;
  if (upper.includes("PARTIAL")) return `${styles.pill} ${styles.pillBlue}`;
  if (upper === "FAILED") return `${styles.pill} ${styles.pillRed}`;
  return `${styles.pill} ${styles.pillGray}`;
}

function paymentPill(status: string) {
  const upper = status.toUpperCase();
  if (upper === "PAID") return `${styles.pill} ${styles.pillGreen}`;
  if (upper === "PENDING") return `${styles.pill} ${styles.pillAmber}`;
  if (upper.includes("PARTIAL")) return `${styles.pill} ${styles.pillBlue}`;
  if (upper.includes("REFUND") || upper === "VOIDED")
    return `${styles.pill} ${styles.pillGray}`;
  return `${styles.pill} ${styles.pillGray}`;
}

export default function Orders() {
  const { searchQuery, tab, orders, ordersError } =
    useLoaderData<typeof loader>();

  const submit = useSubmit();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    // Live search: debounce keystrokes into a loader reload. Typing + Enter
    // also submits natively, so search works even if this handler never fires.
    const form = event.currentTarget.form;
    if (!form) return;
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => submit(form), 400);
  };

  const tabHref = (key: TabKey) => {
    const params = new URLSearchParams();
    if (key !== "all") params.set("tab", key);
    if (searchQuery) params.set("q", searchQuery);
    const query = params.toString();
    return query ? `/app/orders?${query}` : "/app/orders";
  };
  const showClear = Boolean(searchQuery) || tab !== "all";

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Orders</h1>
      <p className={styles.sub}>
        Your store&apos;s live orders, newest first — showing up to{" "}
        {MAX_ORDERS}.
      </p>

      <div className={styles.tabs}>
        {TABS.map((item) => (
          <Link
            key={item.key}
            className={`${styles.tab}${tab === item.key ? ` ${styles.tabActive}` : ""}`}
            to={tabHref(item.key)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Form method="get" className={styles.searchRow} role="search">
        {tab !== "all" ? (
          <input type="hidden" name="tab" value={tab} />
        ) : null}
        <input
          className={styles.searchInput}
          type="search"
          name="q"
          placeholder="Search by order number or customer"
          autoComplete="off"
          defaultValue={searchQuery}
          onInput={handleSearchInput}
          aria-label="Search orders"
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
        {showClear ? (
          <Link className={styles.clearButton} to="/app/orders">
            Clear
          </Link>
        ) : null}
      </Form>

      {ordersError ? (
        <p className={styles.error}>{ordersError}</p>
      ) : (
        <p className={styles.count}>
          {orders.length} order{orders.length === 1 ? "" : "s"}
          {searchQuery ? (
            <>
              {" "}
              matching &ldquo;{searchQuery}&rdquo;
            </>
          ) : null}
          .
        </p>
      )}

      {!ordersError && orders.length === 0 ? (
        <p className={styles.empty}>
          {searchQuery || tab !== "all" ? (
            <>
              Nothing matches those filters. Try different keywords or{" "}
              <Link to="/app/orders">clear everything</Link>.
            </>
          ) : (
            "No orders yet. New orders will appear here as customers buy."
          )}
        </p>
      ) : null}

      {!ordersError && orders.length > 0 ? (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Created</th>
                <th>Customer</th>
                <th>Fulfillment</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderName}>{order.name}</td>
                  <td>{shortDate(order.createdAt)}</td>
                  <td>{order.customer || "—"}</td>
                  <td>
                    <span className={fulfillmentPill(order.fulfillment)}>
                      {order.fulfillment || "UNKNOWN"}
                    </span>
                  </td>
                  <td>
                    {order.total
                      ? `${order.total} ${order.currency}`.trim()
                      : "—"}
                  </td>
                  <td>
                    <span className={paymentPill(order.financial)}>
                      {order.financial || "UNKNOWN"}
                    </span>
                  </td>
                  <td>{shortDate(order.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

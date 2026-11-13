import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Form, Link, useLoaderData, useSubmit } from "react-router";
import { useRef } from "react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

import styles from "../styles/products.module.css";

const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          status
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }`;

type Product = {
  id: string;
  title: string;
  status: string;
  price: string;
  currency: string;
  imageUrl: string;
  imageAlt: string;
};

const MAX_PRODUCTS = 24;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const searchQuery = (url.searchParams.get("q") ?? "").trim();

  // Live catalog, read-only from the Admin API. Failures degrade to an
  // inline notice — never an error page.
  let products: Product[] = [];
  let productsError = "";
  try {
    const response = await admin.graphql(PRODUCTS_QUERY, {
      variables: { first: MAX_PRODUCTS, query: searchQuery || null },
    });
    const body = await response.json();
    const edges = body?.data?.products?.edges ?? [];
    products = edges.map(({ node }: any) => ({
      id: String(node.id ?? ""),
      title: String(node.title ?? "Untitled product"),
      status: String(node.status ?? ""),
      price: String(node.priceRangeV2?.minVariantPrice?.amount ?? ""),
      currency: String(node.priceRangeV2?.minVariantPrice?.currencyCode ?? ""),
      imageUrl: String(node.featuredImage?.url ?? ""),
      imageAlt: String(node.featuredImage?.altText ?? node.title ?? ""),
    }));
  } catch {
    productsError =
      "Couldn't load products just now. Check your connection and search again.";
  }

  return { searchQuery, products, productsError };
};

function pillClass(status: string) {
  if (status === "ACTIVE") return `${styles.pill} ${styles.pillActive}`;
  if (status === "DRAFT") return `${styles.pill} ${styles.pillDraft}`;
  return `${styles.pill} ${styles.pillArchived}`;
}

export default function Products() {
  const { searchQuery, products, productsError } =
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

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Products</h1>
      <p className={styles.sub}>
        Your store&apos;s live catalog — search by title, vendor, or type.
        Showing up to {MAX_PRODUCTS} products.
      </p>

      <Form method="get" className={styles.searchRow} role="search">
        <input
          className={styles.searchInput}
          type="search"
          name="q"
          placeholder="Search products"
          autoComplete="off"
          defaultValue={searchQuery}
          onInput={handleSearchInput}
          aria-label="Search products"
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
        {searchQuery ? (
          <Link className={styles.clearButton} to="/app/products">
            Clear
          </Link>
        ) : null}
      </Form>

      {productsError ? (
        <p className={styles.error}>{productsError}</p>
      ) : (
        <p className={styles.count}>
          {searchQuery ? (
            <>
              {products.length} result{products.length === 1 ? "" : "s"} for
              &ldquo;{searchQuery}&rdquo;.
            </>
          ) : (
            <>
              {products.length} product{products.length === 1 ? "" : "s"} in
              this store.
            </>
          )}
        </p>
      )}

      {!productsError && products.length === 0 ? (
        <p className={styles.empty}>
          {searchQuery ? (
            <>
              No products match that search. Try different keywords or{" "}
              <Link to="/app/products">clear the search</Link>.
            </>
          ) : (
            "This store has no products yet. Add products in your Shopify admin and they will appear here."
          )}
        </p>
      ) : null}

      {!productsError && products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <article key={product.id} className={styles.card}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.imageAlt} />
              ) : (
                <div className={styles.noPhoto}>No photo</div>
              )}
              <div className={styles.cardBody}>
                <h2 className={styles.cardName}>{product.title}</h2>
                <p className={styles.cardPrice}>
                  {product.price
                    ? `From ${product.price} ${product.currency}`.trim()
                    : "No price"}
                </p>
                <span className={pillClass(product.status)}>
                  {product.status || "UNKNOWN"}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};

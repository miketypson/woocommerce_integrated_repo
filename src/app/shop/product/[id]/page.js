/**
 * Server wrapper for the product‑detail route.
 * Makes the page dynamic so ANY WooCommerce ID works in production.
 */
export const dynamic = 'force-dynamic';

import ProductClient from './ProductClient';

export default function Page({ params }) {
  return <ProductClient id={params.id} />;
}

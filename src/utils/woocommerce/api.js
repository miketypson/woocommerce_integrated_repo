// utils/woocommerce/api.js
//--------------------------------------------------------------
//  WooCommerce API utility functions
//--------------------------------------------------------------

/**
 * Reads WooCommerce credentials from environment variables and
 * returns the base URL and Authorization header for REST requests.
 *
 * Required ENV variables (define them in `.env.local` for local
 * dev and in Amplify → Environment variables for production):
 *
 *   WOO_BASE_URL       e.g. https://store.fortresstechnologies.org
 *   WOO_CONSUMER_KEY   ck_**********************
 *   WOO_CONSUMER_SECRET cs_**********************
 */
export const getWooCommerceApi = () => {
  const baseUrl       = process.env.WOO_BASE_URL;       // e.g. https://example.com
  const consumerKey   = process.env.WOO_CONSUMER_KEY;   // ck_****
  const consumerSecret= process.env.WOO_CONSUMER_SECRET;// cs_****

  // Fail fast if any variable is missing
  if (!baseUrl || !consumerKey || !consumerSecret) {
    console.error('WooCommerce ENV variables are missing:', {
      baseUrl,
      consumerKeyExists   : !!consumerKey,
      consumerSecretExists: !!consumerSecret,
    });
    throw new Error(
      'Missing WooCommerce ENV variables. ️Check `.env.local` (local) or Amplify Environment variables (prod).'
    );
  }

  // Basic-Auth header required by WooCommerce REST API
  const authHeader =
    'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  return { baseUrl, authHeader };
};

/**
 * Convenient constants for WooCommerce REST endpoints
 * (all paths are relative to your WordPress base URL)
 */
export const WOO_ENDPOINTS = {
  PRODUCTS        : '/wp-json/wc/v3/products',
  PRODUCT         : (id) => `/wp-json/wc/v3/products/${id}`,
  ORDERS          : '/wp-json/wc/v3/orders',
  ORDER           : (id) => `/wp-json/wc/v3/orders/${id}`,
  PAYMENT_GATEWAYS: '/wp-json/wc/v3/payment_gateways',
};

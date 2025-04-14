/**
 * WooCommerce API utility functions
 *
 * This file contains utility functions for connecting to the WooCommerce REST API
 */

/**
 * Get WooCommerce API configuration
 *
 * @returns {Object} WooCommerce API configuration
 */
export const getWooCommerceApi = () => {
  // Purely use environment variables—no fallback strings.
  // If they are missing, let's at least console.error (or throw an error).
  const baseUrl = process.env.WOO_BASE_URL;
  const consumerKey = process.env.WOO_CONSUMER_KEY;
  const consumerSecret = process.env.WOO_CONSUMER_SECRET;

  if (!baseUrl || !consumerKey || !consumerSecret) {
    console.error('WooCommerce ENV variables are missing:', {
      baseUrl,
      consumerKeyExists: !!consumerKey,
      consumerSecretExists: !!consumerSecret,
    });
    throw new Error('Missing WooCommerce ENV variables. Check .env.local or Amplify environment settings.');
  }

  // Create Basic Auth header from consumer key and secret
  const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  console.log('WooCommerce API Config:', {
    baseUrl,
    hasKey: !!consumerKey,
    hasSecret: !!consumerSecret,
  });

  return {
    baseUrl,
    authHeader,
  };
};

/**
 * Get WooCommerce API endpoints
 */
export const WOO_ENDPOINTS = {
  PRODUCTS: '/wp-json/wc/v3/products',
  PRODUCT: (id) => `/wp-json/wc/v3/products/${id}`,
  ORDERS: '/wp-json/wc/v3/orders',
  ORDER: (id) => `/wp-json/wc/v3/orders/${id}`,
  PAYMENT_GATEWAYS: '/wp-json/wc/v3/payment_gateways',
};

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
  // In Next.js, server-side environment variables must be accessed with process.env
  // Client-side environment variables must be prefixed with NEXT_PUBLIC_
  const baseUrl = process.env.WOO_BASE_URL || 'https://fortresstechnologies.org';
  const consumerKey = process.env.WOO_CONSUMER_KEY || 'ck_bd78d9f3769cf268f01476426a39629a2d840f6a';
  const consumerSecret = process.env.WOO_CONSUMER_SECRET || 'cs_4f40e9100912924380d7ebf7bdf43ff471353599';
  
  // Create Basic Auth header from consumer key and secret
  const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  console.log('WooCommerce API Config:', { baseUrl, hasKey: !!consumerKey, hasSecret: !!consumerSecret });
  
  return {
    baseUrl,
    authHeader
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

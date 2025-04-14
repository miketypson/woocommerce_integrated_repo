export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { getWooCommerceApi, WOO_ENDPOINTS } from '@/utils/woocommerce/api';

/**
 * GET handler for /api/products
 * Fetches all products from WooCommerce (no more mock data).
 */
export async function GET() {
  try {
    console.log('API route /api/products called (woo data)');

    // Retrieve WooCommerce base URL and authorization header
    const { baseUrl, authHeader } = getWooCommerceApi();
    // e.g., WOO_ENDPOINTS.PRODUCTS = '/wp-json/wc/v3/products'
    const endpoint = baseUrl + WOO_ENDPOINTS.PRODUCTS;

    // Fetch real product data from your WooCommerce store
    const res = await fetch(endpoint, {
      headers: { Authorization: authHeader },
      // (Optional) cache: 'no-store' if you want always-fresh data
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('WooCommerce fetch error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch products', details: errorText },
        { status: res.status }
      );
    }

    const products = await res.json();
    console.log('Returning real WooCommerce products');
    return NextResponse.json(products);

  } catch (error) {
    console.error('Error in /api/products route:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

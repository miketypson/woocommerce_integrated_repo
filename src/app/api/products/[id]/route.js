export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';

/**
 * GET handler for /api/products/[id]
 * Fetches a specific product from WooCommerce
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log(`API route /api/products/${id} called (fetching from WooCommerce)`); 
    
    // Import WooCommerce API utilities
    const { getWooCommerceApi, WOO_ENDPOINTS } = await import('@/utils/woocommerce/api');
    
    // Get WooCommerce API configuration
    const { baseUrl, authHeader } = getWooCommerceApi();
    
    // Construct product endpoint URL
    const productEndpoint = baseUrl + WOO_ENDPOINTS.PRODUCT(id);
    console.log('Fetching from:', productEndpoint);
    
    // Fetch product details from WooCommerce API
    const response = await fetch(productEndpoint, {
      headers: { Authorization: authHeader },
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WooCommerce product fetch error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: 'Product not found', details: errorText },
        { status: response.status }
      );
    }
    
    // Parse product data from WooCommerce
    const product = await response.json();
    console.log('WooCommerce product data received');
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

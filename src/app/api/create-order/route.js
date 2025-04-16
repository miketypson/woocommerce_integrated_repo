export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { getWooCommerceApi, WOO_ENDPOINTS } from '@/utils/woocommerce/api';

/**
 * POST handler for /api/create-order
 * Creates a new order in WooCommerce (no more mock data).
 */
export async function POST(request) {
  try {
    // Parse the incoming JSON (containing cart, billing, shipping, etc.)
    const data = await request.json();

    // Retrieve WooCommerce base URL & Basic Auth header
    const { baseUrl, authHeader } = getWooCommerceApi();
    const ordersEndpoint = baseUrl + WOO_ENDPOINTS.ORDERS; 
    // e.g., baseUrl + '/wp-json/wc/v3/orders'

    // Transform cart items to the shape WooCommerce expects
    const lineItems = data.cart.items.map((item) => ({
      product_id: parseInt(item.id),   // must be the actual WooCommerce product ID as number
      quantity: item.quantity || 1,
      // Include product name as a note if available
      meta_data: item.name ? [
        { key: 'product_name', value: item.name }
      ] : undefined
    }));

    // Construct the WooCommerce order payload
    const orderPayload = {
      payment_method: data.payment_method || 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,               // Typically false unless you handle payment externally
      billing: data.billing,         // e.g. { first_name, last_name, address_1, ... }
      shipping: data.shipping,       // e.g. { first_name, last_name, address_1, ... }
      line_items: lineItems,
    };

    console.log('Sending order to WooCommerce:', orderPayload);
    
    // Send POST request to create the order in WooCommerce
    const res = await fetch(ordersEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      // If WooCommerce responds with an error, read it and return
      const errorText = await res.text();
      return NextResponse.json(
        { error: 'Failed to create order', details: errorText },
        { status: 400 }
      );
    }

    // Parse the created order from WooCommerce
    const createdOrder = await res.json();
    return NextResponse.json(createdOrder);

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

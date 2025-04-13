export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';

/**
 * POST handler for /api/create-order
 * Creates a new order in WooCommerce
 */
export async function POST(request) {
  try {
    const data = await request.json();
    
    // For testing purposes, return mock data
    const mockOrder = {
      id: Math.floor(Math.random() * 10000),
      number: `PS-${Math.floor(Math.random() * 10000)}`,
      status: 'processing',
      date_created: new Date().toISOString(),
      total: data.cart.total,
      line_items: data.cart.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.totals.line_total
      })),
      billing: data.billing,
      shipping: data.shipping,
      payment_method: data.payment_method,
      payment_method_title: data.payment_method === 'bacs' ? 'Direct Bank Transfer' : 
                            data.payment_method === 'cheque' ? 'Check Payment' : 
                            'Credit Card'
    };
    
    return NextResponse.json(mockOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

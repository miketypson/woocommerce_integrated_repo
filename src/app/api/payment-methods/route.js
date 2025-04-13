export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';

/**
 * GET handler for /api/payment-methods
 * Fetches available payment methods from WooCommerce
 */
export async function GET() {
  try {
    // For testing purposes, return mock data
    const mockPaymentMethods = [
      {
        id: 'bacs',
        title: 'Direct Bank Transfer',
        description: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference.',
        enabled: true,
        order: 1
      },
      {
        id: 'cheque',
        title: 'Check Payment',
        description: 'Please send a check to our store address.',
        enabled: true,
        order: 2
      },
      {
        id: 'cod',
        title: 'Cash on Delivery',
        description: 'Pay with cash upon delivery.',
        enabled: true,
        order: 3
      },
      {
        id: 'stripe',
        title: 'Credit Card (Stripe)',
        description: 'Pay securely using your credit card.',
        enabled: true,
        order: 4
      }
    ];
    
    return NextResponse.json(mockPaymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

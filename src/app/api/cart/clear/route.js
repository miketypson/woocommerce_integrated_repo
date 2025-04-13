export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';

/**
 * POST handler for /api/cart/clear
 * Clears the cart
 */
export async function POST() {
  try {
    // For testing purposes, return mock data
    const mockCart = {
      items: [],
      total: '$0.00',
      totalItems: 0
    };
    
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

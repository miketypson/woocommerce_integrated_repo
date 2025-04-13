export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getWooCommerceApi } from '@/utils/woocommerce/api';

/**
 * GET handler for /api/cart
 * Fetches the current cart
 */
export async function GET() {
  try {
    // For testing purposes, return mock data
    const mockCart = {
      items: [],
      total: '$0.00',
      totalItems: 0
    };
    
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST handler for /api/cart
 * Adds an item to the cart
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { product_id, quantity } = data;
    
    // For testing purposes, return mock data
    const mockCart = {
      items: [
        {
          id: product_id,
          key: `item_${product_id}`,
          name: product_id === 'pixel-7a-grapheneos' ? 'Pixel 7a with GrapheneOS' : 
                product_id === 'faraday-bag-large' ? 'Large Faraday Bag' : 
                'Privacy SIM Card - 10GB',
          price: product_id === 'pixel-7a-grapheneos' ? '699.99' : 
                 product_id === 'faraday-bag-large' ? '49.99' : 
                 '29.99',
          quantity: quantity,
          images: [{ src: '/placeholder-product.jpg' }],
          totals: {
            line_total: product_id === 'pixel-7a-grapheneos' ? `$${(699.99 * quantity).toFixed(2)}` : 
                        product_id === 'faraday-bag-large' ? `$${(49.99 * quantity).toFixed(2)}` : 
                        `$${(29.99 * quantity).toFixed(2)}`
          }
        }
      ],
      total: product_id === 'pixel-7a-grapheneos' ? `$${(699.99 * quantity).toFixed(2)}` : 
             product_id === 'faraday-bag-large' ? `$${(49.99 * quantity).toFixed(2)}` : 
             `$${(29.99 * quantity).toFixed(2)}`,
      totalItems: quantity
    };
    
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

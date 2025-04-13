export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';

/**
 * GET handler for /api/cart/[key]
 * Updates a specific cart item
 */
export async function PUT(request, { params }) {
  try {
    const { key } = params;
    const data = await request.json();
    const { quantity } = data;
    
    // For testing purposes, return mock data
    const mockCart = {
      items: [
        {
          id: key.replace('item_', ''),
          key: key,
          name: key.includes('pixel-7a-grapheneos') ? 'Pixel 7a with GrapheneOS' : 
                key.includes('faraday-bag-large') ? 'Large Faraday Bag' : 
                'Privacy SIM Card - 10GB',
          price: key.includes('pixel-7a-grapheneos') ? '699.99' : 
                 key.includes('faraday-bag-large') ? '49.99' : 
                 '29.99',
          quantity: quantity,
          images: [{ src: '/placeholder-product.jpg' }],
          totals: {
            line_total: key.includes('pixel-7a-grapheneos') ? `$${(699.99 * quantity).toFixed(2)}` : 
                        key.includes('faraday-bag-large') ? `$${(49.99 * quantity).toFixed(2)}` : 
                        `$${(29.99 * quantity).toFixed(2)}`
          }
        }
      ],
      total: key.includes('pixel-7a-grapheneos') ? `$${(699.99 * quantity).toFixed(2)}` : 
             key.includes('faraday-bag-large') ? `$${(49.99 * quantity).toFixed(2)}` : 
             `$${(29.99 * quantity).toFixed(2)}`,
      totalItems: quantity
    };
    
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for /api/cart/[key]
 * Removes a specific cart item
 */
export async function DELETE(request, { params }) {
  try {
    const { key } = params;
    
    // For testing purposes, return mock data
    const mockCart = {
      items: [],
      total: '$0.00',
      totalItems: 0
    };
    
    return NextResponse.json(mockCart);
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

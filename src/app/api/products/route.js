export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';

/**
 * GET handler for /api/products
 * Fetches all products from WooCommerce
 */
export async function GET() {
  try {
    console.log('API route /api/products called');
    
    // For testing purposes, return mock data
    const mockProducts = [
      {
        id: 'pixel-7a-grapheneos',
        name: 'Pixel 7a with GrapheneOS',
        description: 'Privacy-focused smartphone with enhanced security features. Pre-installed with GrapheneOS for maximum privacy and security.',
        short_description: 'Privacy-focused smartphone with GrapheneOS pre-installed',
        price: '699.99',
        regular_price: '749.99',
        sale_price: '699.99',
        stock_status: 'instock',
        categories: [
          {
            id: 1,
            name: 'Secure Phones',
            slug: 'secure-phones'
          }
        ],
        tags: [
          {
            id: 1,
            name: 'open-source',
            slug: 'open-source'
          }
        ],
        images: [
          {
            id: 1,
            src: '/placeholder-product.jpg',
            alt: 'Pixel 7a with GrapheneOS'
          }
        ]
      },
      {
        id: 'faraday-bag-large',
        name: 'Large Faraday Bag',
        description: 'Block all wireless signals with our premium Faraday bag. Perfect for phones, tablets, and small laptops. Military-grade signal blocking.',
        short_description: 'Premium Faraday bag for complete signal blocking',
        price: '49.99',
        regular_price: '59.99',
        sale_price: '49.99',
        stock_status: 'instock',
        categories: [
          {
            id: 2,
            name: 'Faraday Bags',
            slug: 'faraday-bags'
          }
        ],
        images: [
          {
            id: 2,
            src: '/placeholder-product.jpg',
            alt: 'Large Faraday Bag'
          }
        ]
      },
      {
        id: 'privacy-sim-10gb',
        name: 'Privacy SIM Card - 10GB',
        description: 'Anonymous prepaid SIM card with 10GB of data. No registration required, perfect for privacy-conscious users.',
        short_description: 'Anonymous prepaid SIM with 10GB data',
        price: '29.99',
        regular_price: '29.99',
        sale_price: null,
        stock_status: 'instock',
        categories: [
          {
            id: 3,
            name: 'Prepaid Data SIMs',
            slug: 'prepaid-data-sims'
          }
        ],
        images: [
          {
            id: 3,
            src: '/placeholder-product.jpg',
            alt: 'Privacy SIM Card'
          }
        ]
      }
    ];
    
    console.log('Returning mock products');
    return NextResponse.json(mockProducts);
  } catch (error) {
    console.error('Error in /api/products route:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

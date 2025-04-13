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
    
    // For testing purposes, return mock data
    let mockProduct;
    
    if (id === 'pixel-7a-grapheneos') {
      mockProduct = {
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
      };
    } else if (id === 'faraday-bag-large') {
      mockProduct = {
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
      };
    } else if (id === 'privacy-sim-10gb') {
      mockProduct = {
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
      };
    } else {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(mockProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

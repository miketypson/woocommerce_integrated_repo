'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/shop/ProductCard';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from API...');
        
        // For testing purposes, use mock data directly
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
        
        console.log('Using mock products data');
        setProducts(mockProducts);
        setLoading(false);
        
        // Still try to fetch from API in the background for debugging
        try {
          const response = await fetch('/api/products');
          console.log('API response status:', response.status);
          if (response.ok) {
            const data = await response.json();
            console.log('API data received:', data);
          }
        } catch (apiError) {
          console.error('Background API fetch error:', apiError);
        }
        
      } catch (error) {
        console.error('Error in products fetch:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Shop</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E294B]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Shop</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Shop</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.name,
                category: product.categories?.[0]?.name || 'Product',
                description: product.short_description || product.description,
                price: parseFloat(product.price),
                image: product.images?.[0]?.src || '/placeholder-product.jpg',
                privacyRating: 5, // Default value, could be customized
                isOpenSource: product.tags?.some(tag => tag.name === 'open-source') || false,
                openSourceLink: '',
                inStock: product.stock_status === 'instock'
              }}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

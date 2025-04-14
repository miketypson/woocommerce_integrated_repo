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
        console.log('Fetching products from /api/products...');

        // Fetch real product data from your /api/products route
        const response = await fetch('/api/products', { cache: 'no-store' });
        console.log('API response status:', response.status);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch products');
        }

        const data = await response.json();
        console.log('API data received:', data);
        setProducts(data);
        setLoading(false);

      } catch (err) {
        console.error('Error in products fetch:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      // addToCart expects a product object, not just an ID.
      // So either (a) pass the entire product to addToCart, OR
      // (b) find it in products array by productId first. 
      // For now, let's find the product in state:
      const productToAdd = products.find((p) => p.id === productId);
      if (!productToAdd) throw new Error('Product not found in state');

      // Convert the price to a number
      const normalizedProduct = {
        ...productToAdd,
        price: parseFloat(productToAdd.price),
      };

      // Call addToCart
      await addToCart(normalizedProduct, 1);
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
                // We pass in the shape that ProductCard expects
                id: product.id,
                title: product.name,
                category: product.categories?.[0]?.name || 'Product',
                description: product.short_description || product.description,
                price: parseFloat(product.price),
                image: product.images?.[0]?.src || '/placeholder-product.jpg',
                privacyRating: 5, // or any custom field
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

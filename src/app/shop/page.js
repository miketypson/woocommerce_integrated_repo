'use client';

import { useState, useEffect } from 'react';
// No longer using CartContext
import ProductCard from '@/components/shop/ProductCard';
// Using our simplified cart utility
import { addToCart, getCart, debugCart } from '@/utils/simpleCart';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // No longer using CartContext

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

  // Add to cart using our new simpleCart utility
  const directlyAddToCart = (product, quantity = 1) => {
    console.log('Adding product directly to cart with simpleCart:', product);
    return addToCart(product, quantity);
  };

  const handleAddToCart = async (productId) => {
    try {
      console.log('Adding to cart with simpleCart, product ID:', productId);
      
      // Find the product in our state
      const productToAdd = products.find((p) => p.id === productId);
      if (!productToAdd) {
        console.error('Product not found in state, ID:', productId);
        throw new Error('Product not found in state');
      }
      
      console.log('Found product to add:', productToAdd);

      // Normalize the product data for the cart
      const normalizedProduct = {
        ...productToAdd,
        // Ensure the ID is a string (important for comparison)
        id: productId.toString(),
        // Ensure price is a number
        price: parseFloat(productToAdd.price || '0'),
        // Add any required fields that might be missing
        name: productToAdd.name || productToAdd.title || 'Product',
        images: productToAdd.images || [],
      };
      
      console.log('Normalized product for cart:', normalizedProduct);

      // Use our simpleCart utility
      const success = addToCart(normalizedProduct, 1);
      
      if (!success) {
        throw new Error('Failed to add to cart');
      }
      
      // For debugging, display the current cart
      debugCart();
      
      // Show feedback that item was added
      alert(`Added ${normalizedProduct.name} to your cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
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

  // Debug function to test direct cart add using our simpleCart utility
  const testAddDirectToCart = () => {
    // Create a very simple test product
    const testProduct = {
      id: "test-product-" + Date.now(),
      name: "Test Product",
      price: 19.99,
      quantity: 1,
      images: [{src: "/placeholder-product.jpg"}]
    };
    
    try {
      console.log('Adding test product to cart with simpleCart:', testProduct);
      
      // Add the test product using our simpleCart utility
      const success = addToCart(testProduct, 1);
      
      // Debug the cart
      debugCart();
      
      if (success) {
        alert('Test product added directly to cart with simpleCart. Check the cart page now.');
      } else {
        alert('Failed to add test product to cart.');
      }
    } catch (e) {
      console.error('TEST: Error adding to cart:', e);
      alert('Error adding test product: ' + e.message);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Shop</h1>
      
      {/* Debug Button */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="text-lg font-semibold mb-2">Debugging Tools</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <button 
            onClick={testAddDirectToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Add Test Product Directly to Cart
          </button>
          
          <button 
            onClick={() => {
              // Use simpleCart's clearCart instead
              const { clearCart } = require('@/utils/simpleCart');
              clearCart();
              alert('Cart cleared using simpleCart');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart Storage
          </button>
          
          <button 
            onClick={() => {
              // Use simpleCart's debugCart
              const { debugCart } = require('@/utils/simpleCart');
              const cart = debugCart();
              alert(`Current cart has ${cart.items.length} items`);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Show Cart Data
          </button>
        </div>
        
        <details className="text-sm mt-2">
          <summary className="cursor-pointer font-medium">Cart Debug Info</summary>
          <div className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60">
            <pre className="text-xs whitespace-pre-wrap break-all">
              {(() => {
                try {
                  // Use simpleCart for consistency
                  const cart = getCart();
                  return JSON.stringify(cart, null, 2) || 'No cart data found';
                } catch (e) {
                  return `Error reading cart data: ${e.message}`;
                }
              })()}
            </pre>
          </div>
        </details>
      </div>
      
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
                // We pass in the shape that ProductCard expects with FULL data for cart
                id: product.id,
                title: product.name,
                category: product.categories?.[0]?.name || 'Product',
                description: product.short_description || product.description,
                price: parseFloat(product.price),
                image: product.images?.[0]?.src || '/placeholder-product.jpg',
                privacyRating: 5, // or any custom field
                isOpenSource: product.tags?.some(tag => tag.name === 'open-source') || false,
                openSourceLink: '',
                inStock: product.stock_status === 'instock',
                // Add raw WooCommerce data for complete cart integration
                images: product.images || [],
                raw: product // Include the complete WooCommerce product data
              }}
              // No longer pass the onAddToCart prop since ProductCard handles it directly
            />
          ))}
        </div>
      )}
    </div>
  );
}

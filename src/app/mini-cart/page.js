'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getCart, removeItem, clearCart, debugCart } from '@/utils/miniCart';

export default function MiniCartPage() {
  const [cart, setCart] = useState({ items: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  // Load cart data
  const loadCartData = () => {
    try {
      console.log('MiniCart Page: Loading cart data');
      const currentCart = getCart();
      console.log('MiniCart Page: Current cart data:', currentCart);
      setCart(currentCart);
    } catch (e) {
      console.error('MiniCart Page: Error loading cart data:', e);
      setCart({ items: [], count: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  // Set up event listeners for cart updates
  useEffect(() => {
    // Initial load
    loadCartData();
    
    // Listen for miniCart updates
    const handleCartUpdate = (event) => {
      console.log('MiniCart Page: Received update event', event);
      loadCartData();
    };
    
    // Add event listeners
    window.addEventListener('miniCartUpdated', handleCartUpdate);
    document.addEventListener('miniCartUpdated', handleCartUpdate);
    
    // Regular polling as backup
    const interval = setInterval(loadCartData, 2000);
    
    return () => {
      window.removeEventListener('miniCartUpdated', handleCartUpdate);
      document.removeEventListener('miniCartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);

  // Handle removing item from cart
  const handleRemoveItem = (itemId) => {
    try {
      setIsRemoving(true);
      const success = removeItem(itemId);
      
      if (success) {
        // Reload cart data
        loadCartData();
      }
    } catch (e) {
      console.error('MiniCart Page: Error removing item:', e);
    } finally {
      setIsRemoving(false);
    }
  };

  // Handle clearing cart
  const handleClearCart = () => {
    try {
      const success = clearCart();
      
      if (success) {
        // Reload cart data
        loadCartData();
      }
    } catch (e) {
      console.error('MiniCart Page: Error clearing cart:', e);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-6">Your Cart</h1>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E294B]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0E294B] mb-6">Your Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/shop" className="inline-flex items-center text-[#0E294B] hover:text-[#1E5C97]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              You have {cart.count} {cart.count === 1 ? 'item' : 'items'} in your cart
            </p>
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Cart
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <div key={item.uniqueId} className="p-4 flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full text-gray-400">
                        <ShoppingBag className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Added on {new Date(item.addedAt).toLocaleString()}
                    </p>
                    <div className="mt-1 text-[#0E294B] font-bold">
                      ${parseFloat(item.price).toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div>
                    <button
                      onClick={() => handleRemoveItem(item.uniqueId)}
                      disabled={isRemoving}
                      className={`text-gray-400 hover:text-red-500 ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <div className="flex justify-between font-medium text-lg text-gray-900 mb-2">
                <span>Total</span>
                <span>${cart.items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}</span>
              </div>
              
              <div className="mt-4 grid gap-3">
                <Link 
                  href="/checkout" 
                  className="bg-[#0E294B] text-white py-2 px-4 rounded text-center hover:bg-[#1E5C97] transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  href="/shop" 
                  className="text-[#0E294B] border border-[#0E294B] bg-white py-2 px-4 rounded text-center hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Debug Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Cart Debug Information</h3>
            <pre className="text-xs overflow-auto whitespace-pre-wrap">
              {JSON.stringify(cart, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

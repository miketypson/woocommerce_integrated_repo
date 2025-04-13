'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartItem, removeCartItem, clearCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingItemKey, setUpdatingItemKey] = useState(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleUpdateQuantity = async (key, currentQuantity, change) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    if (newQuantity === currentQuantity) return;
    
    setUpdatingItemKey(key);
    try {
      await updateCartItem(key, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItemKey(null);
    }
  };

  const handleRemoveItem = async (key) => {
    setUpdatingItemKey(key);
    try {
      await removeCartItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdatingItemKey(null);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsClearing(false);
    }
  };

  if (cart.isLoading && !updatingItemKey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Your Cart</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E294B]"></div>
        </div>
      </div>
    );
  }

  if (cart.error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Your Cart</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {cart.error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/shop">
            <button className="bg-[#0E294B] text-white px-6 py-3 rounded-md hover:bg-[#1E5C97] transition-colors inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Items ({cart.totalItems})</h2>
                <button 
                  onClick={handleClearCart}
                  disabled={isClearing}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                >
                  {isClearing ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500 mr-2"></div>
                      Clearing...
                    </span>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <li key={item.key} className="p-6 flex flex-col sm:flex-row sm:items-center">
                  {/* Product Image */}
                  <div className="sm:w-20 sm:h-20 mb-4 sm:mb-0 bg-gray-100 rounded flex-shrink-0">
                    {item.images && item.images[0] ? (
                      <img 
                        src={item.images[0].src} 
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="sm:ml-6 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.price} x {item.quantity} = {item.totals?.line_total}
                        </p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex items-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleUpdateQuantity(item.key, item.quantity, -1)}
                            disabled={updatingItemKey === item.key}
                            className="p-2 text-gray-600 hover:text-[#0E294B] disabled:text-gray-400"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.key, item.quantity, 1)}
                            disabled={updatingItemKey === item.key}
                            className="p-2 text-gray-600 hover:text-[#0E294B] disabled:text-gray-400"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item.key)}
                          disabled={updatingItemKey === item.key}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          {updatingItemKey === item.key ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <Link href="/shop">
              <button className="text-[#0E294B] hover:text-[#1E5C97] inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{cart.total}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">{cart.total}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/checkout">
                <button className="w-full bg-[#0E294B] text-white py-3 px-4 rounded-md hover:bg-[#1E5C97] transition-colors">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

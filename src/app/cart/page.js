'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react';
// Direct implementation - not using any utility imports

/**
 * Cart Page Component - Ultra-Simplified Version
 * This uses our new simpleCart utility for consistent behavior
 */
export default function CartPage() {
  const [cart, setCart] = useState({ items: [], totalItems: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeItemId, setActiveItemId] = useState(null);
  
  // Direct cart implementation - matching the ProductCard implementation
  const CART_KEY = 'direct_cart_v1';
  
  // Get cart from localStorage
  function getDirectCart() {
    try {
      const cartData = localStorage.getItem(CART_KEY);
      if (cartData) {
        return JSON.parse(cartData);
      }
    } catch (e) {
      console.error('Error getting cart:', e);
    }
    return { items: [], count: 0 };
  }
  
  // Save cart to localStorage
  function saveDirectCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      // Also dispatch an event
      try {
        const event = new CustomEvent('directCartUpdated', { detail: { cart } });
        window.dispatchEvent(event);
        document.dispatchEvent(event);
      } catch (evtErr) {
        console.error('Error dispatching event:', evtErr);
      }
      return true;
    } catch (e) {
      console.error('Error saving cart:', e);
      return false;
    }
  }
  
  // Debug the cart
  function debugDirectCart() {
    const cart = getDirectCart();
    console.log('==== DIRECT CART DEBUG ====');
    console.log('Cart:', cart);
    console.log('Items:', cart.items);
    console.log('Count:', cart.count);
    return cart;
  }
  
  // Enhanced cart data loading function
  function loadCartData() {
    try {
      console.log('Cart Page: Loading cart data from direct implementation');
      
      // Use our direct implementation
      const cartData = getDirectCart();
      console.log('Cart Page: Direct cart data:', cartData);
      
      // Convert from our direct cart format to the format expected by the cart page
      const formattedCart = {
        items: cartData.items || [],
        totalItems: cartData.count || 0,
        total: cartData.items ? cartData.items.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0) : 0
      };
      
      // Update cart state
      setCart(formattedCart);
      
      // Set loading to false as early as possible to avoid blank screens
      setIsLoading(false);
      
      console.log('Cart Page: Set cart state with', formattedCart.items.length, 'items');
      console.log('Cart Page: Final state:', formattedCart);
      
      // Force a re-render if we have items but the cart is showing as empty
      if (cartData.items?.length > 0 && formattedCart.items.length === 0) {
        console.log('Cart Page: Inconsistency detected, forcing update');
        // Small timeout to ensure state has updated
        setTimeout(() => {
          setCart({...formattedCart, forceUpdate: Date.now()});
        }, 100);
      }
    } catch (e) {
      console.error('Cart Page: Error loading cart data:', e);
      setCart({ items: [], totalItems: 0, total: 0 });
    } finally {
      setIsLoading(false);
    }
  }
  
  // Enhanced useEffect with multiple event listeners and polling
  useEffect(() => {
    // Initial load
    loadCartData();
    console.log('Cart Page: Initial cart load complete');
    
    // Debug the cart to verify initial state
    const initialCart = debugDirectCart();
    console.log('Cart Page: Initial debug cart check:', initialCart);
    
    // Storage event handler (for changes from other tabs)
    const handleStorageEvent = (event) => {
      if (!event.key || event.key === CART_KEY) {
        console.log('Cart Page: Storage event triggered cart reload');
        loadCartData();
      }
    };
    
    // Cart updated event handler (for same-tab updates)
    const handleCartUpdate = (event) => {
      console.log('Cart Page: directCartUpdated event detected', event);
      loadCartData();
    };
    
    // Setup all event listeners
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('directCartUpdated', handleCartUpdate);
    document.addEventListener('directCartUpdated', handleCartUpdate);
    
    // Polling as a fallback mechanism
    const interval = setInterval(() => {
      loadCartData();
    }, 1000);
    
    // Force an immediate re-check after a short delay
    setTimeout(loadCartData, 500);
    
    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('directCartUpdated', handleCartUpdate);
      document.removeEventListener('directCartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);
  
  // Additional debug logs - for each render
  console.log('Cart Page Rendered - Current cart:', cart);
  console.log('Cart Page Rendered - Items count:', cart.items?.length || 0);

  // Update item quantity using direct implementation
  const handleUpdateQuantity = (item, currentQuantity, change) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    if (newQuantity === currentQuantity) return;
    
    setActiveItemId(item.uniqueId || item.key);
    
    try {
      // Get the current cart
      const currentCart = getDirectCart();
      console.log(`Updating quantity for item ${item.uniqueId} to ${newQuantity}`);
      
      // Update the item
      currentCart.items = currentCart.items.map(cartItem => {
        if (cartItem.uniqueId === item.uniqueId) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      
      // Recalculate count
      currentCart.count = currentCart.items.length;
      
      // Save the updated cart
      saveDirectCart(currentCart);
      
      // Load the updated cart data
      loadCartData();
    } catch (e) {
      console.error('Error updating quantity:', e);
    } finally {
      setActiveItemId(null);
    }
  };
  
  // Remove item from cart using direct implementation
  const handleRemoveItem = (item) => {
    setActiveItemId(item.uniqueId || item.key);
    
    try {
      // Get the current cart
      const currentCart = getDirectCart();
      console.log(`Removing item ${item.uniqueId} from cart`);
      
      // Remove the item
      currentCart.items = currentCart.items.filter(cartItem => 
        cartItem.uniqueId !== item.uniqueId
      );
      
      // Recalculate count
      currentCart.count = currentCart.items.length;
      
      // Save the updated cart
      saveDirectCart(currentCart);
      
      // Load the updated cart data
      loadCartData();
    } catch (e) {
      console.error('Error removing item:', e);
    } finally {
      setActiveItemId(null);
    }
  };
  
  // Clear entire cart using direct implementation
  const handleClearCart = () => {
    try {
      console.log('Clearing cart');
      
      // Create an empty cart
      const emptyCart = { items: [], count: 0 };
      
      // Save the empty cart
      saveDirectCart(emptyCart);
      
      // Load the updated cart data
      loadCartData();
    } catch (e) {
      console.error('Error clearing cart:', e);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Your Cart</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E294B]"></div>
        </div>
      </div>
    );
  }

  // Get both our regular cart state and check direct cart too
  const currentCart = cart;
  
  // DEBUG: Always check the direct cart too to help diagnose issues
  const directCartItems = getDirectCart();
  console.log('DEBUG - Direct cart items on render:', directCartItems);
  
  // Check if we have items in our direct cart implementation
  const hasDirectItems = directCartItems && directCartItems.items && directCartItems.items.length > 0;
  
  // Only show empty state if both implementations have no items
  if ((!currentCart.items || currentCart.items.length === 0) && !hasDirectItems) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          
          <div className="mt-6">
            <Link href="/shop">
              <button className="bg-[#0E294B] text-white px-6 py-3 rounded-md hover:bg-[#1E5C97] transition-colors inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </button>
            </Link>
          </div>
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
                <h2 className="text-xl font-semibold">Items ({hasDirectItems ? directCartItems.count : currentCart.totalItems})</h2>
                <button 
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {/* Prefer direct cart items if available */}
              {(hasDirectItems ? directCartItems.items : currentCart.items).map((item) => (
                <li key={item.key || item.uniqueId} className="p-6 flex flex-col sm:flex-row sm:items-center">
                  {/* Product Image */}
                  <div className="sm:w-20 sm:h-20 mb-4 sm:mb-0 bg-gray-100 rounded flex-shrink-0">
                    {item.image ? (
                      <img 
                        src={typeof item.image === 'string' ? item.image : (item.image.src || item.images?.[0]?.src)} 
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
                        
                        {/* Display selected add-ons if any */}
                        {item.hasAddons && item.selected_addons && (
                          <div className="mt-1 text-xs text-gray-500">
                            {Object.entries(item.selected_addons).map(([addonName, options]) => (
                              options.length > 0 && (
                                <div key={addonName} className="mb-1">
                                  <span className="font-medium">{addonName}:</span> {options.join(', ')}
                                </div>
                              )
                            ))}
                          </div>
                        )}
                        
                        <p className="mt-1 text-sm text-gray-500">
                          ${parseFloat(item.price).toFixed(2)} x {item.quantity} = ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          {item.addon_price > 0 && (
                            <span className="ml-1 text-xs">
                              (Base: ${parseFloat(item.base_price).toFixed(2)} + Add-ons: ${parseFloat(item.addon_price).toFixed(2)})
                            </span>
                          )}
                        </p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex items-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleUpdateQuantity(item, item.quantity, -1)}
                            disabled={activeItemId === (item.uniqueId || item.key)}
                            className="p-2 text-gray-600 hover:text-[#0E294B] disabled:text-gray-400"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item, item.quantity, 1)}
                            disabled={activeItemId === (item.uniqueId || item.key)}
                            className="p-2 text-gray-600 hover:text-[#0E294B] disabled:text-gray-400"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(item)}
                          disabled={activeItemId === (item.uniqueId || item.key)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          {activeItemId === (item.uniqueId || item.key) ? (
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
                <span className="font-medium">${currentCart.total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${currentCart.total.toFixed(2)}</span>
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

'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial cart state
const initialState = {
  items: [],
  total: 0,
  totalItems: 0,
  isLoading: false,
  error: null
};

// Cart reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        totalItems: action.payload.totalItems || 0,
      };
    case 'ADD_TO_CART_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        totalItems: action.payload.totalItems || 0,
        isLoading: false,
      };
    case 'ADD_TO_CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'UPDATE_CART_ITEM_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'UPDATE_CART_ITEM_SUCCESS':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        totalItems: action.payload.totalItems || 0,
        isLoading: false,
      };
    case 'UPDATE_CART_ITEM_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'REMOVE_CART_ITEM_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'REMOVE_CART_ITEM_SUCCESS':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        totalItems: action.payload.totalItems || 0,
        isLoading: false,
      };
    case 'REMOVE_CART_ITEM_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CLEAR_CART_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'CLEAR_CART_SUCCESS':
      return {
        ...state,
        items: [],
        total: 0,
        totalItems: 0,
        isLoading: false,
      };
    case 'CLEAR_CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Create context
const CartContext = createContext();

// Cart provider component
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // First try to get cart from API
        const response = await fetch('/api/cart');
        if (response.ok) {
          const cartData = await response.json();
          
          // Format cart data for our state
          const formattedCart = {
            items: cartData.items || [],
            total: cartData.totals?.total || 0,
            totalItems: cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
          };
          
          dispatch({ type: 'SET_CART', payload: formattedCart });
        } else {
          // If API fails, try to get from localStorage
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            dispatch({ type: 'INITIALIZE', payload: JSON.parse(savedCart) });
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Try to get from localStorage as fallback
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          dispatch({ type: 'INITIALIZE', payload: JSON.parse(savedCart) });
        }
      }
    };

    fetchCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART_REQUEST' });
    
    try {
      // For testing purposes, simulate adding to cart locally
      console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
      
      // Find the product in our mock data
      const mockProducts = [
        {
          id: 'pixel-7a-grapheneos',
          name: 'Pixel 7a with GrapheneOS',
          price: '699.99',
          images: [{ src: '/placeholder-product.jpg' }]
        },
        {
          id: 'faraday-bag-large',
          name: 'Large Faraday Bag',
          price: '49.99',
          images: [{ src: '/placeholder-product.jpg' }]
        },
        {
          id: 'privacy-sim-10gb',
          name: 'Privacy SIM Card - 10GB',
          price: '29.99',
          images: [{ src: '/placeholder-product.jpg' }]
        }
      ];
      
      const product = mockProducts.find(p => p.id === productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex(item => item.id === productId);
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        updatedItems = [...cart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item to cart
        const newItem = {
          id: product.id,
          key: `item_${product.id}`,
          name: product.name,
          price: product.price,
          quantity: quantity,
          images: product.images,
          totals: {
            line_total: `$${(parseFloat(product.price) * quantity).toFixed(2)}`
          }
        };
        updatedItems = [...cart.items, newItem];
      }
      
      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const total = `$${updatedItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}`;
      
      const formattedCart = {
        items: updatedItems,
        total,
        totalItems,
      };
      
      dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: formattedCart });
      
      // Still try API in background for debugging
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: productId,
            quantity,
          }),
        });
        
        console.log('API response status:', response.status);
        if (response.ok) {
          const cartData = await response.json();
          console.log('API cart data:', cartData);
        }
      } catch (apiError) {
        console.error('Background API call error:', apiError);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch({ type: 'ADD_TO_CART_ERROR', payload: error.message });
    }
  };

  // Update cart item
  const updateCartItem = async (key, quantity) => {
    dispatch({ type: 'UPDATE_CART_ITEM_REQUEST' });
    
    try {
      const response = await fetch(`/api/cart/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update cart item');
      }
      
      const cartData = await response.json();
      
      // Format cart data for our state
      const formattedCart = {
        items: cartData.items || [],
        total: cartData.totals?.total || 0,
        totalItems: cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
      };
      
      dispatch({ type: 'UPDATE_CART_ITEM_SUCCESS', payload: formattedCart });
    } catch (error) {
      console.error('Error updating cart item:', error);
      dispatch({ type: 'UPDATE_CART_ITEM_ERROR', payload: error.message });
    }
  };

  // Remove cart item
  const removeCartItem = async (key) => {
    dispatch({ type: 'REMOVE_CART_ITEM_REQUEST' });
    
    try {
      const response = await fetch(`/api/cart/${key}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove cart item');
      }
      
      const cartData = await response.json();
      
      // Format cart data for our state
      const formattedCart = {
        items: cartData.items || [],
        total: cartData.totals?.total || 0,
        totalItems: cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
      };
      
      dispatch({ type: 'REMOVE_CART_ITEM_SUCCESS', payload: formattedCart });
    } catch (error) {
      console.error('Error removing cart item:', error);
      dispatch({ type: 'REMOVE_CART_ITEM_ERROR', payload: error.message });
    }
  };

  // Clear cart
  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART_REQUEST' });
    
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clear cart');
      }
      
      dispatch({ type: 'CLEAR_CART_SUCCESS' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: 'CLEAR_CART_ERROR', payload: error.message });
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateCartItem, 
      removeCartItem, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

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
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        dispatch({
          type: 'INITIALIZE',
          payload: JSON.parse(savedCart)
        });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (local only)
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART_REQUEST' });

    try {
      // Check if product already in cart
      const existingIndex = cart.items.findIndex(item => item.id === product.id);
      let updatedItems;
      
      if (existingIndex >= 0) {
        // Update quantity
        updatedItems = [...cart.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        };
      } else {
        const newItem = {
          id: product.id,
          key: `item_${product.id}`,
          name: product.name,
          price: parseFloat(product.price),
          quantity,
          images: product.images || [],
        };
        updatedItems = [...cart.items, newItem];
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      dispatch({
        type: 'ADD_TO_CART_SUCCESS',
        payload: {
          items: updatedItems,
          total: parseFloat(totalPrice.toFixed(2)),
          totalItems
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch({ type: 'ADD_TO_CART_ERROR', payload: error.message });
    }
  };

  // Update cart item quantity (local only)
  const updateCartItem = (productId, newQuantity) => {
    dispatch({ type: 'UPDATE_CART_ITEM_REQUEST' });

    try {
      // Find item in cart
      const updatedItems = cart.items.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      dispatch({
        type: 'UPDATE_CART_ITEM_SUCCESS',
        payload: {
          items: updatedItems,
          total: parseFloat(totalPrice.toFixed(2)),
          totalItems
        }
      });
    } catch (error) {
      console.error('Error updating cart item:', error);
      dispatch({ type: 'UPDATE_CART_ITEM_ERROR', payload: error.message });
    }
  };

  // Remove cart item (local only)
  const removeCartItem = (productId) => {
    dispatch({ type: 'REMOVE_CART_ITEM_REQUEST' });
    
    try {
      const updatedItems = cart.items.filter(item => item.id !== productId);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      dispatch({
        type: 'REMOVE_CART_ITEM_SUCCESS',
        payload: {
          items: updatedItems,
          total: parseFloat(totalPrice.toFixed(2)),
          totalItems
        }
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
      dispatch({ type: 'REMOVE_CART_ITEM_ERROR', payload: error.message });
    }
  };

  // Clear cart (local only)
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART_REQUEST' });
    try {
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
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

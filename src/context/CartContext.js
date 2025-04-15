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
  console.log('Cart reducer called with action:', action.type, action.payload);
  
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        ...action.payload,
        isLoading: false,
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
      console.log('CartContext initializing - checking localStorage');
      const savedCart = localStorage.getItem('cart');
      
      if (savedCart) {
        console.log('Found saved cart in localStorage:', savedCart);
        const parsedCart = JSON.parse(savedCart);
        
        // Make sure we have valid cart data with required properties
        if (parsedCart && Array.isArray(parsedCart.items)) {
          console.log('Initializing cart with items:', parsedCart.items);
          dispatch({
            type: 'INITIALIZE',
            payload: parsedCart
          });
        } else {
          console.warn('Invalid cart data in localStorage, using default empty cart');
          // Reset to empty cart if data is invalid
          localStorage.setItem('cart', JSON.stringify(initialState));
        }
      } else {
        console.log('No saved cart found in localStorage');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Reset to empty cart on error
      localStorage.setItem('cart', JSON.stringify(initialState));
    }
    
    // Dispatch a custom event to notify the navbar that cart has been initialized
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('Cart state changed, updating localStorage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch a custom event for other components to detect cart changes
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [cart]);

  // Add item to cart (local only)
  const addToCart = (product, quantity = 1) => {
    console.log('Adding to cart:', product, 'quantity:', quantity);
    dispatch({ type: 'ADD_TO_CART_REQUEST' });

    try {
      // Ensure product.price is a number
      if (typeof product.price === 'string') {
        product.price = parseFloat(product.price) || 0;
      }

      // Create a unique key for the product+addons combination if addon info exists
      const hasAddons = product.selected_addons && 
                       Object.values(product.selected_addons).some(options => options && options.length > 0);
      
      // Create a unique item ID that includes addon selections
      const itemUniqueId = hasAddons ? 
        `${product.id}_${JSON.stringify(product.selected_addons)}` : 
        `${product.id}`;
      
      // Calculate the total price including any add-ons
      const itemBasePrice = parseFloat(product.price) || 0;
      const itemAddonPrice = parseFloat(product.addon_price) || 0;
      const itemTotalPrice = itemBasePrice + itemAddonPrice;
      
      console.log('Cart before update:', cart.items);
      console.log('Looking for item with uniqueId:', itemUniqueId);
      
      // Check if this exact product + addon combination already exists in cart
      const existingIndex = cart.items.findIndex(item => 
        hasAddons ? 
          item.uniqueId === itemUniqueId :
          item.id == product.id && !item.hasAddons
      );
      
      console.log('Existing item index:', existingIndex);
      
      let updatedItems;
      
      if (existingIndex >= 0) {
        // Update quantity of existing item
        updatedItems = [...cart.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        };
        console.log('Updated existing item:', updatedItems[existingIndex]);
      } else {
        // Create a new cart item with addon information
        const newItem = {
          id: product.id,
          uniqueId: itemUniqueId,
          key: `item_${product.id}${hasAddons ? '_addons' : ''}`,
          name: product.name,
          price: itemTotalPrice,
          base_price: itemBasePrice,
          addon_price: itemAddonPrice,
          quantity,
          images: product.images || [],
          hasAddons,
          selected_addons: product.selected_addons || {}
        };
        updatedItems = [...cart.items, newItem];
        console.log('Added new item to cart:', newItem);
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      console.log('New cart state:', {
        items: updatedItems,
        total: parseFloat(totalPrice.toFixed(2)),
        totalItems
      });

      dispatch({
        type: 'ADD_TO_CART_SUCCESS',
        payload: {
          items: updatedItems,
          total: parseFloat(totalPrice.toFixed(2)),
          totalItems
        }
      });
      
      // Save to localStorage directly as well for redundancy
      try {
        const cartToSave = {
          items: updatedItems,
          total: parseFloat(totalPrice.toFixed(2)),
          totalItems,
          isLoading: false,
          error: null
        };
        localStorage.setItem('cart', JSON.stringify(cartToSave));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch({ type: 'ADD_TO_CART_ERROR', payload: error.message });
    }
  };

  // Update cart item quantity (local only)
  const updateCartItem = (itemKey, newQuantity) => {
    console.log('Updating cart item with key:', itemKey, 'to quantity:', newQuantity);
    dispatch({ type: 'UPDATE_CART_ITEM_REQUEST' });

    try {
      // Find item in cart by key or uniqueId
      const updatedItems = cart.items.map(item => {
        if (item.key === itemKey || item.uniqueId === itemKey) {
          console.log('Found item to update:', item);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const newCartState = {
        items: updatedItems,
        total: parseFloat(totalPrice.toFixed(2)),
        totalItems
      };
      
      console.log('New cart state after update:', newCartState);

      dispatch({
        type: 'UPDATE_CART_ITEM_SUCCESS',
        payload: newCartState
      });
      
      // Save to localStorage
      try {
        const cartToSave = {
          ...newCartState,
          isLoading: false,
          error: null
        };
        localStorage.setItem('cart', JSON.stringify(cartToSave));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      dispatch({ type: 'UPDATE_CART_ITEM_ERROR', payload: error.message });
    }
  };

  // Remove cart item (local only)
  const removeCartItem = (itemKey) => {
    console.log('Removing cart item with key:', itemKey);
    dispatch({ type: 'REMOVE_CART_ITEM_REQUEST' });
    
    try {
      // Remove item with matching key or uniqueId
      const updatedItems = cart.items.filter(item => 
        item.key !== itemKey && item.uniqueId !== itemKey
      );
      
      console.log('Cart items after removal:', updatedItems);

      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const newCartState = {
        items: updatedItems,
        total: parseFloat(totalPrice.toFixed(2)),
        totalItems
      };
      
      console.log('New cart state after removal:', newCartState);

      dispatch({
        type: 'REMOVE_CART_ITEM_SUCCESS',
        payload: newCartState
      });
      
      // Save to localStorage
      try {
        const cartToSave = {
          ...newCartState,
          isLoading: false,
          error: null
        };
        localStorage.setItem('cart', JSON.stringify(cartToSave));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
    } catch (error) {
      console.error('Error removing cart item:', error);
      dispatch({ type: 'REMOVE_CART_ITEM_ERROR', payload: error.message });
    }
  };

  // Synchronize cart state with localStorage
  const syncCartWithLocalStorage = () => {
    try {
      console.log('Synchronizing cart with localStorage');
      const rawCartData = localStorage.getItem('cart');
      
      if (rawCartData) {
        const parsedCart = JSON.parse(rawCartData);
        if (parsedCart && Array.isArray(parsedCart.items)) {
          console.log('Got valid cart data from localStorage:', parsedCart);
          
          // Check if cart state differs from localStorage
          const cartItemIds = cart.items.map(item => item.uniqueId || item.id).sort();
          const localItemIds = parsedCart.items.map(item => item.uniqueId || item.id).sort();
          
          const needsSync = 
            cartItemIds.length !== localItemIds.length || 
            cartItemIds.some((id, i) => id !== localItemIds[i]) ||
            cart.totalItems !== parsedCart.totalItems;
          
          if (needsSync) {
            console.log('Cart state differs from localStorage, syncing...');
            dispatch({
              type: 'INITIALIZE',
              payload: parsedCart
            });
            return true; // Sync happened
          }
        }
      }
    } catch (error) {
      console.error('Error syncing cart with localStorage:', error);
    }
    return false; // No sync needed or sync failed
  };

  // Clear cart (local only)
  const clearCart = () => {
    console.log('Clearing cart');
    dispatch({ type: 'CLEAR_CART_REQUEST' });
    
    try {
      dispatch({ type: 'CLEAR_CART_SUCCESS' });
      
      // Clear localStorage cart data too
      try {
        const emptyCart = {
          items: [],
          total: 0,
          totalItems: 0,
          isLoading: false,
          error: null
        };
        localStorage.setItem('cart', JSON.stringify(emptyCart));
      } catch (storageError) {
        console.error('Error clearing localStorage cart:', storageError);
      }
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
      clearCart,
      syncCartWithLocalStorage // Expose sync function to components
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

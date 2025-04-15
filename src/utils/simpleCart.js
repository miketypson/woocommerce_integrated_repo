/**
 * Ultra Simple Cart Utility
 * 
 * This utility provides the absolute simplest implementation of cart functionality
 * to ensure consistent behavior across all components.
 */

// The localStorage key for cart data - use the same key as the original system
const CART_STORAGE_KEY = 'cart';

/**
 * Get the cart from localStorage
 * @returns {Object} The cart object or a default empty cart
 */
export function getCart() {
  try {
    const rawData = localStorage.getItem(CART_STORAGE_KEY);
    if (rawData) {
      const parsedData = JSON.parse(rawData);
      return {
        items: Array.isArray(parsedData.items) ? parsedData.items : [],
        totalItems: typeof parsedData.totalItems === 'number' ? parsedData.totalItems : 0,
        total: typeof parsedData.total === 'number' ? parsedData.total : 0
      };
    }
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
  }
  
  // Return empty cart if no cart was found or there was an error
  return { items: [], totalItems: 0, total: 0 };
}

/**
 * Save cart to localStorage and trigger events
 * @param {Object} cart The cart to save
 */
export function saveCart(cart) {
  try {
    // Ensure cart has the required structure
    const cartToSave = {
      items: Array.isArray(cart.items) ? cart.items : [],
      totalItems: cart.totalItems || 0,
      total: cart.total || 0
    };
    
    // Save to localStorage - use the same key as the original system
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartToSave));
    
    // Trigger events to notify components - ensure backward compatibility with all listeners
    try {
      // Standard storage event (won't work in same tab)
      window.dispatchEvent(new Event('storage'));
      
      // Custom events for same-tab updates (use both event types for compatibility)
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      document.dispatchEvent(new CustomEvent('cartUpdated'));
      
      // Create a synthetic StorageEvent for more compatibility
      const storageEvent = new StorageEvent('storage', {
        key: CART_STORAGE_KEY,
        newValue: JSON.stringify(cartToSave),
        url: window.location.href
      });
      window.dispatchEvent(storageEvent);
    } catch (e) {
      console.error('Error dispatching cart update events:', e);
    }
    
    console.log('Cart saved:', cartToSave);
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
}

/**
 * Add a product to the cart
 * @param {Object} product The product to add
 * @param {number} quantity Quantity to add
 * @returns {boolean} Success status
 */
export function addToCart(product, quantity = 1) {
  try {
    // Validate product
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return false;
    }
    
    // Get current cart
    const cart = getCart();
    
    // Create a normalized product
    const normalizedProduct = {
      id: product.id.toString(),
      name: product.name || product.title || 'Product',
      price: parseFloat(product.price || 0),
      quantity: parseInt(quantity, 10) || 1,
      images: product.images || [],
      uniqueId: `${product.id}_${Date.now()}`,
      key: `${product.id}_${Date.now()}`
    };
    
    // Add to cart
    cart.items.push(normalizedProduct);
    
    // Recalculate totals
    recalculateCart(cart);
    
    // Save cart
    return saveCart(cart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return false;
  }
}

/**
 * Update cart item quantity
 * @param {string} itemId The unique ID of the item to update
 * @param {number} quantity New quantity
 * @returns {boolean} Success status
 */
export function updateQuantity(itemId, quantity) {
  try {
    // Get current cart
    const cart = getCart();
    
    // Find and update the item
    let updated = false;
    cart.items = cart.items.map(item => {
      // Match by uniqueId or key
      if ((item.uniqueId && item.uniqueId === itemId) || 
          (item.key && item.key === itemId)) {
        updated = true;
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    
    if (!updated) {
      console.warn('Item not found in cart:', itemId);
      return false;
    }
    
    // Recalculate totals
    recalculateCart(cart);
    
    // Save cart
    return saveCart(cart);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return false;
  }
}

/**
 * Remove item from cart
 * @param {string} itemId The unique ID of the item to remove
 * @returns {boolean} Success status
 */
export function removeItem(itemId) {
  try {
    // Get current cart
    const cart = getCart();
    
    // Find and remove the item
    const initialCount = cart.items.length;
    cart.items = cart.items.filter(item => 
      (item.uniqueId !== itemId) && (item.key !== itemId)
    );
    
    if (cart.items.length === initialCount) {
      console.warn('Item not found in cart:', itemId);
      return false;
    }
    
    // Recalculate totals
    recalculateCart(cart);
    
    // Save cart
    return saveCart(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return false;
  }
}

/**
 * Clear all items from cart
 * @returns {boolean} Success status
 */
export function clearCart() {
  try {
    // Create empty cart
    const emptyCart = { items: [], totalItems: 0, total: 0 };
    
    // Save cart
    return saveCart(emptyCart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
}

/**
 * Recalculate cart totals
 * @param {Object} cart The cart to recalculate
 */
function recalculateCart(cart) {
  // Calculate total items
  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  cart.total = parseFloat(
    cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
      .toFixed(2)
  );
}

/**
 * Debug: Print current cart to console
 */
export function debugCart() {
  const cart = getCart();
  console.log('==== CART DEBUG ====');
  console.log('Cart:', cart);
  console.log('Items:', cart.items);
  console.log('Total Items:', cart.totalItems);
  console.log('Total:', cart.total);
  return cart;
}

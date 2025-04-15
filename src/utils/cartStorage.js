/**
 * Centralized cart storage utilities to ensure consistent cart handling
 * 
 * This utility provides reliable methods for reading, writing, and updating
 * cart data in localStorage, with proper event notifications to keep all
 * components in sync.
 */

/**
 * Get the current cart data from localStorage
 * @returns {Object} The cart object or a default empty cart
 */
export function getCart() {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // Validate cart structure
      if (parsed && typeof parsed === 'object') {
        return {
          items: Array.isArray(parsed.items) ? parsed.items : [],
          totalItems: typeof parsed.totalItems === 'number' ? parsed.totalItems : 0,
          total: typeof parsed.total === 'number' ? parsed.total : 0
        };
      }
    }
    // Return default cart if no cart or invalid structure
    return { items: [], totalItems: 0, total: 0 };
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return { items: [], totalItems: 0, total: 0 };
  }
}

/**
 * Save cart data to localStorage and notify components
 * @param {Object} cartData The cart data to save
 */
export function saveCart(cartData) {
  try {
    // Ensure we have a valid cart structure
    const cart = {
      items: Array.isArray(cartData.items) ? cartData.items : [],
      totalItems: typeof cartData.totalItems === 'number' ? cartData.totalItems : cartData.items.length,
      total: typeof cartData.total === 'number' ? cartData.total : 0
    };
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Notify components
    notifyCartChange();
    
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
    if (!product || !product.id) {
      console.error('Invalid product provided to addToCart');
      return false;
    }
    
    // Normalize product data
    const normalizedProduct = {
      ...product,
      id: product.id.toString(),
      price: parseFloat(product.price || 0),
      quantity: parseInt(quantity, 10) || 1
    };
    
    // Create a unique ID for this cart item
    const uniqueId = `${normalizedProduct.id}_${Date.now()}`;
    
    // Add required fields
    normalizedProduct.uniqueId = uniqueId;
    normalizedProduct.key = uniqueId;
    
    // Get current cart
    const cart = getCart();
    
    // Add the product
    cart.items.push(normalizedProduct);
    
    // Update totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.total = parseFloat(
      cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)
    );
    
    // Save the updated cart
    return saveCart(cart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return false;
  }
}

/**
 * Update the quantity of an item in the cart
 * @param {string} itemId Unique ID of the cart item
 * @param {number} newQuantity New quantity value
 * @returns {boolean} Success status
 */
export function updateCartItem(itemId, newQuantity) {
  try {
    if (!itemId) return false;
    
    const cart = getCart();
    let updated = false;
    
    // Update the item quantity
    cart.items = cart.items.map(item => {
      if ((item.uniqueId && item.uniqueId === itemId) || 
          (item.key === itemId) || 
          (item.id === itemId)) {
        updated = true;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    if (!updated) return false;
    
    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.total = parseFloat(
      cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)
    );
    
    // Save the updated cart
    return saveCart(cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return false;
  }
}

/**
 * Remove an item from the cart
 * @param {string} itemId Unique ID of the cart item
 * @returns {boolean} Success status
 */
export function removeCartItem(itemId) {
  try {
    if (!itemId) return false;
    
    const cart = getCart();
    const initialLength = cart.items.length;
    
    // Remove the item
    cart.items = cart.items.filter(item => 
      (item.uniqueId !== itemId) && 
      (item.key !== itemId) && 
      (item.id !== itemId)
    );
    
    if (cart.items.length === initialLength) return false;
    
    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.total = parseFloat(
      cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)
    );
    
    // Save the updated cart
    return saveCart(cart);
  } catch (error) {
    console.error('Error removing cart item:', error);
    return false;
  }
}

/**
 * Clear the entire cart
 * @returns {boolean} Success status
 */
export function clearCart() {
  try {
    const emptyCart = { items: [], totalItems: 0, total: 0 };
    return saveCart(emptyCart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
}

/**
 * Notify all components about cart changes
 */
export function notifyCartChange() {
  try {
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  } catch (error) {
    console.error('Error dispatching cart update events:', error);
  }
}

/**
 * Check if localStorage is available and working
 * @returns {boolean} True if localStorage is working
 */
export function isLocalStorageAvailable() {
  try {
    const testKey = '__test_localStorage__';
    localStorage.setItem(testKey, testKey);
    const result = localStorage.getItem(testKey) === testKey;
    localStorage.removeItem(testKey);
    return result;
  } catch (e) {
    return false;
  }
}

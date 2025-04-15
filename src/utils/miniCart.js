/**
 * Ultra-simplified cart implementation
 * This is a completely separate implementation with no dependencies on other cart systems
 */

// Use a completely different storage key to avoid conflicts
const STORAGE_KEY = 'woo_cart_mini';

// Get the cart
export function getCart() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      return JSON.parse(rawData);
    }
  } catch (e) {
    console.error('MiniCart error getting cart:', e);
  }
  // Default empty cart
  return { items: [], count: 0 };
}

// Save the cart and notify components
export function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    
    // Dispatch events to notify components
    try {
      const event = new CustomEvent('miniCartUpdated', { 
        detail: { cart } 
      });
      window.dispatchEvent(event);
      document.dispatchEvent(event);
      console.log('MiniCart: dispatched update events');
    } catch (e) {
      console.error('MiniCart: error dispatching events', e);
    }
    
    return true;
  } catch (e) {
    console.error('MiniCart: error saving cart', e);
    return false;
  }
}

// Add item to cart
export function addItem(product) {
  try {
    console.log('MiniCart: Adding item', product);
    
    // Get current cart
    const cart = getCart();
    
    // Add the item
    cart.items.push({
      id: product.id.toString(),
      name: product.title || product.name || 'Product',
      price: parseFloat(product.price?.toString() || '0'),
      quantity: 1,
      image: product.image || (product.images && product.images[0]?.src),
      uniqueId: `${product.id}_${Date.now()}`,
      addedAt: new Date().toISOString()
    });
    
    // Update count
    cart.count = cart.items.length;
    
    // Save
    console.log('MiniCart: Saving cart with', cart.count, 'items');
    return saveCart(cart);
  } catch (e) {
    console.error('MiniCart: error adding item', e);
    return false;
  }
}

// Remove item from cart
export function removeItem(itemId) {
  try {
    const cart = getCart();
    const initialCount = cart.items.length;
    
    // Remove the item
    cart.items = cart.items.filter(item => item.uniqueId !== itemId);
    
    // Update count
    cart.count = cart.items.length;
    
    // Save if something was removed
    if (cart.items.length !== initialCount) {
      return saveCart(cart);
    }
    return false;
  } catch (e) {
    console.error('MiniCart: error removing item', e);
    return false;
  }
}

// Clear cart
export function clearCart() {
  try {
    const emptyCart = { items: [], count: 0 };
    return saveCart(emptyCart);
  } catch (e) {
    console.error('MiniCart: error clearing cart', e);
    return false;
  }
}

// Debug function
export function debugCart() {
  const cart = getCart();
  console.log('===== MINI CART DEBUG =====');
  console.log('Cart:', cart);
  console.log('Item count:', cart.count);
  console.log('Items:', cart.items);
  console.log('===========================');
  return cart;
}

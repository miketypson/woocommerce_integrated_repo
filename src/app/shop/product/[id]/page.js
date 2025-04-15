'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, Star, ArrowLeft, Shield, Check, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(`Fetching product details for ID: ${id}`);
        
        // Fetch from WooCommerce API
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch product details');
        }
        
        const data = await response.json();
        console.log('Product data received:', data);
        setProduct(data);
        
        // Extract add-ons from meta_data if present
        const extractedAddons = extractAddonsFromProduct(data);
        if (extractedAddons.length > 0) {
          console.log('Product add-ons found:', extractedAddons);
          setAddons(extractedAddons);
          
          // Initialize selected addons state with defaults
          const initialSelections = {};
          extractedAddons.forEach(addon => {
            if (addon.type === 'checkbox' || addon.type === 'multiple_choice') {
              initialSelections[addon.name] = addon.options.filter(opt => opt.default).map(opt => opt.label);
            }
          });
          setSelectedAddons(initialSelections);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  // Helper function to extract add-ons from various WooCommerce add-on plugins
  const extractAddonsFromProduct = (product) => {
    // Skip if no product or no meta_data
    if (!product || !product.meta_data) {
      return [];
    }
    
    try {
      // Find add-ons in meta_data - look for common meta keys for add-ons
      const addonMetaKeys = ['_product_addons', 'product_addons', '_wc_pb_addon_data'];
      
      for (const meta of product.meta_data) {
        if (addonMetaKeys.includes(meta.key)) {
          // Try to parse if it's a JSON string
          try {
            if (typeof meta.value === 'string') {
              return JSON.parse(meta.value);
            } else if (Array.isArray(meta.value)) {
              return meta.value;
            }
          } catch (e) {
            console.error('Error parsing add-ons JSON:', e);
          }
        }
      }
      
      // If we have raw_addons or addons directly on the product
      if (product.addons || product.raw_addons) {
        return product.addons || product.raw_addons;
      }
      
      // If add-ons are not found in standard locations, look for other patterns
      // Check for custom fields with add-on data
      const customFields = product.meta_data.filter(meta => 
        meta.key.includes('addon') || meta.key.includes('option')
      );
      
      if (customFields.length > 0) {
        return customFields.map(field => ({
          name: field.key.replace('_', ' '),
          type: 'checkbox',
          options: Array.isArray(field.value) 
            ? field.value 
            : [{ label: field.value, price: 0 }]
        }));
      }
    } catch (error) {
      console.error('Error extracting add-ons:', error);
    }
    
    return [];
  };

  // Handle add-on selection changes
  const handleAddonChange = (addonName, option, isChecked) => {
    setSelectedAddons(prev => {
      const current = prev[addonName] || [];
      
      if (isChecked) {
        // Add option if not already selected
        return { ...prev, [addonName]: [...current, option] };
      } else {
        // Remove option if selected
        return { ...prev, [addonName]: current.filter(item => item !== option) };
      }
    });
  };

  // Calculate any additional price from selected add-ons
  const calculateAddonPrice = () => {
    let additionalPrice = 0;
    
    // Loop through all add-ons and their selected options
    Object.entries(selectedAddons).forEach(([addonName, selectedOptions]) => {
      // Find the addon configuration
      const addon = addons.find(a => a.name === addonName);
      if (!addon) return;
      
      // For each selected option, add its price
      selectedOptions.forEach(selectedOption => {
        const option = addon.options.find(o => o.label === selectedOption);
        if (option && option.price) {
          additionalPrice += parseFloat(option.price);
        }
      });
    });
    
    return additionalPrice;
  };

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      // Create a modified product object with selected add-ons
      const productWithAddons = {
        ...product,
        selected_addons: selectedAddons,
        addon_price: calculateAddonPrice(),
        image: product.images && product.images[0] ? product.images[0].src : null
      };
      
      // Use our direct implementation that we know works consistently
      directlyAddToCart(productWithAddons, quantity);
      
      alert(`Added ${quantity} of ${product.name} to cart!`);
      console.log(`Added ${quantity} of ${product.name} to cart with add-ons:`, selectedAddons);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  // Direct cart manipulation function with the same implementation as ProductCard
  const directlyAddToCart = (product, quantity) => {
    try {
      // Use the same storage key as ProductCard
      const CART_KEY = 'direct_cart_v1';
      
      // Get current cart from localStorage
      const savedCart = localStorage.getItem(CART_KEY);
      let currentCart = savedCart ? JSON.parse(savedCart) : { items: [], count: 0 };
      
      console.log('Current cart before adding:', currentCart);
      
      // Create a unique identifier for this product+addons combination
      const hasAddons = product.selected_addons && 
                       Object.values(product.selected_addons).some(options => options && options.length > 0);
      
      const itemUniqueId = hasAddons ? 
        `${product.id}_${JSON.stringify(product.selected_addons)}` : 
        `${product.id}`;
      
      // Calculate prices
      const itemBasePrice = parseFloat(product.price) || 0;
      const itemAddonPrice = parseFloat(product.addon_price) || 0;
      const itemTotalPrice = itemBasePrice + itemAddonPrice;
      
      // Find if item already exists in cart
      const existingIndex = currentCart.items.findIndex(item => 
        (item.uniqueId === itemUniqueId) || 
        (!hasAddons && item.id == product.id && !item.hasAddons)
      );
      
      let updatedItems;
      
      if (existingIndex >= 0) {
        // Update existing item
        updatedItems = [...currentCart.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        };
      } else {
        // Add new item
        const newItem = {
          id: product.id,
          uniqueId: itemUniqueId,
          key: `item_${product.id}${hasAddons ? '_addons' : ''}`,
          name: product.name || product.title,
          price: itemTotalPrice,
          base_price: itemBasePrice,
          addon_price: itemAddonPrice,
          quantity,
          images: product.images || [],
          hasAddons,
          selected_addons: product.selected_addons || {}
        };
        updatedItems = [...currentCart.items, newItem];
      }
      
      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Create updated cart in the same format as ProductCard
      const updatedCart = {
        items: updatedItems,
        count: updatedItems.length
      };
      
      // Save to localStorage with the same key as ProductCard
      localStorage.setItem('direct_cart_v1', JSON.stringify(updatedCart));
      
      // Dispatch the same event as ProductCard
      try {
        const event = new CustomEvent('directCartUpdated', { detail: { cart: updatedCart } });
        window.dispatchEvent(event);
        document.dispatchEvent(event);
      } catch (evtErr) {
        console.error('Error dispatching event:', evtErr);
      }
      
      console.log('Updated cart saved to localStorage:', updatedCart);
    } catch (error) {
      console.error('Error directly adding to cart:', error);
      alert('Failed to add item to cart: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E294B]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-8">
          <p>Error: {error}</p>
        </div>
        <Link href="/shop" className="text-[#0E294B] flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-yellow-50 p-4 rounded-md text-yellow-700 mb-8">
          <p>Product not found</p>
        </div>
        <Link href="/shop" className="text-[#0E294B] flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/shop" className="text-[#0E294B] flex items-center text-sm mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0].src} 
                alt={product.name}
                className="object-contain p-4 w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-gray-400 text-center">
                  <Shield className="h-16 w-16 mx-auto mb-2" />
                  <span className="text-sm">Product Image Placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {product.categories && product.categories.length > 0 && (
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {product.categories[0].name}
              </span>
            </div>
          )}
          
          <div className="text-2xl font-bold text-[#0E294B] mb-4">
            ${(parseFloat(product.price) + calculateAddonPrice()).toFixed(2)}
            {calculateAddonPrice() > 0 && (
              <span className="text-sm font-normal ml-2 text-gray-600">
                (Base: ${parseFloat(product.price).toFixed(2)} + Add-ons: ${calculateAddonPrice().toFixed(2)})
              </span>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <div className="text-gray-600 prose" 
                 dangerouslySetInnerHTML={{ __html: product.description || product.short_description || 'No description available.' }} />
          </div>
          
          {/* Product Add-ons */}
          {addons.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Options & Add-ons</h2>
              <div className="space-y-4">
                {addons.map((addon, addonIndex) => (
                  <div key={`addon-${addonIndex}`} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                      {addon.name}
                      {addon.description && (
                        <div className="group relative ml-2">
                          <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {addon.description}
                          </div>
                        </div>
                      )}
                    </h3>
                    <div className="space-y-2">
                      {addon.options && addon.options.map((option, optIndex) => {
                        const isSelected = selectedAddons[addon.name]?.includes(option.label);
                        return (
                          <label key={`option-${optIndex}`} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleAddonChange(addon.name, option.label, e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-[#0E294B] focus:ring-[#0E294B]"
                            />
                            <span className="text-gray-700">{option.label}</span>
                            {option.price > 0 && (
                              <span className="text-gray-600 text-sm">(+${parseFloat(option.price).toFixed(2)})</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show selected add-ons summary */}
              {Object.keys(selectedAddons).length > 0 && Object.values(selectedAddons).some(v => v.length > 0) && (
                <div className="mt-3 bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Selected options:</h4>
                  <ul className="text-sm text-gray-600">
                    {Object.entries(selectedAddons).map(([addonName, options]) => (
                      options.length > 0 && (
                        <li key={addonName} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                          <span><span className="font-medium">{addonName}:</span> {options.join(', ')}</span>
                        </li>
                      )
                    ))}
                  </ul>
                  
                  {calculateAddonPrice() > 0 && (
                    <div className="mt-2 font-medium text-[#0E294B]">
                      Additional cost: +${calculateAddonPrice().toFixed(2)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-16 text-center border-y border-gray-300 py-1 focus:outline-none"
              />
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock_status !== 'instock'}
            className={`w-full py-3 px-4 rounded-md font-medium flex items-center justify-center ${
              product.stock_status === 'instock'
                ? isAddingToCart
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-[#0E294B] text-white hover:bg-[#1E5C97]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isAddingToCart 
              ? 'Adding...' 
              : product.stock_status === 'instock' 
                ? 'Add to Cart' 
                : 'Out of Stock'}
          </button>
          
          {/* Stock Status */}
          <div className="mt-4 text-sm">
            <span className={`font-medium ${
              product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

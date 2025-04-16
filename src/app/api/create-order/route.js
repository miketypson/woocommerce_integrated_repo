export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { getWooCommerceApi, WOO_ENDPOINTS } from '@/utils/woocommerce/api';

/**
 * POST handler for /api/create-order
 * Creates a new order in WooCommerce (no more mock data).
 */
export async function POST(request) {
  try {
    // Parse the incoming JSON (containing cart, billing, shipping, etc.)
    const data = await request.json();
    
    // Deep logging of cart structure for debugging
    console.log('FULL ORDER REQUEST:', JSON.stringify(data, null, 2));
    console.log('CART STRUCTURE:', JSON.stringify(data.cart, null, 2));
    
    if (data.cart && data.cart.items) {
      data.cart.items.forEach((item, index) => {
        console.log(`CART ITEM ${index} FULL STRUCTURE:`, JSON.stringify(item, null, 2));
        console.log(`CART ITEM ${index} KEYS:`, Object.keys(item));
        
        // Check for common add-on properties with different possible namings
        const possibleAddonKeys = ['addons', 'add_ons', 'addOnSelections', 'addon_selections', 'meta_data', 'options', 'product_addons'];
        possibleAddonKeys.forEach(key => {
          if (item[key]) {
            console.log(`FOUND ADD-ON DATA in '${key}':`, JSON.stringify(item[key], null, 2));
          }
        });
      });
    }

    // Retrieve WooCommerce base URL & Basic Auth header
    const { baseUrl, authHeader } = getWooCommerceApi();
    const ordersEndpoint = baseUrl + WOO_ENDPOINTS.ORDERS; 
    // e.g., baseUrl + '/wp-json/wc/v3/orders'

    // Transform cart items to the shape WooCommerce expects
    const lineItems = data.cart.items.map((item) => {
      // Start with an empty meta_data array
      const metaData = [];
      
      // Add product name
      if (item.name) {
        metaData.push({ key: 'product_name', value: item.name });
      }
      
      // Extract add-ons from the name if it contains a colon (like "Product: Addon1, Addon2")
      if (item.name && item.name.includes(':')) {
        const parts = item.name.split(':');
        if (parts.length > 1) {
          const addonsText = parts[1].trim();
          metaData.push({ 
            key: 'selected_options', 
            value: addonsText 
          });
          
          // Split comma-separated add-ons and add them individually
          const addonsArray = addonsText.split(',').map(a => a.trim());
          addonsArray.forEach((addon, index) => {
            metaData.push({
              key: `addon_${index + 1}`,
              value: addon
            });
          });
        }
      }
      
      // Process traditional add-ons array
      if (item.addons && Array.isArray(item.addons)) {
        item.addons.forEach((addon, index) => {
          if (addon.name && addon.value) {
            metaData.push({
              key: `addon_${index + 1}_name`,
              value: addon.name
            });
            metaData.push({
              key: `addon_${index + 1}_value`,
              value: addon.value
            });
            if (addon.price) {
              metaData.push({
                key: `addon_${index + 1}_price`,
                value: addon.price.toString()
              });
            }
          }
        });
      }
      
      // Process add-ons from options
      if (item.options && Array.isArray(item.options)) {
        item.options.forEach((option, index) => {
          metaData.push({
            key: `option_${index + 1}_name`,
            value: option.name || `Option ${index + 1}`
          });
          metaData.push({
            key: `option_${index + 1}_value`,
            value: option.value || option.toString()
          });
        });
      }
      
      // Process object-based add-on selections
      if (item.addOnSelections && typeof item.addOnSelections === 'object') {
        Object.entries(item.addOnSelections).forEach(([key, value], index) => {
          if (value) { // Only include selected add-ons
            metaData.push({
              key: `addon_${index + 1}_name`,
              value: key
            });
            metaData.push({
              key: `addon_${index + 1}_value`,
              value: value === true ? 'Selected' : value.toString()
            });
          }
        });
      }
      
      // Check for meta_data property directly
      if (item.meta_data && Array.isArray(item.meta_data)) {
        item.meta_data.forEach(meta => {
          metaData.push(meta);
        });
      }

      // Check description for possible add-on info
      if (item.description && typeof item.description === 'string') {
        metaData.push({
          key: 'description',
          value: item.description
        });
        
        // If description contains add-on info, extract it
        if (item.description.includes(':')) {
          const descParts = item.description.split('\n');
          descParts.forEach((part, index) => {
            if (part.includes(':')) {
              const [name, value] = part.split(':').map(p => p.trim());
              if (name && value) {
                metaData.push({
                  key: `addon_from_desc_${index + 1}_name`,
                  value: name
                });
                metaData.push({
                  key: `addon_from_desc_${index + 1}_value`,
                  value: value
                });
              }
            }
          });
        }
      }
      
      // Last resort - check all item properties for anything that might be add-on related
      Object.entries(item).forEach(([key, value]) => {
        if (
          key.toLowerCase().includes('addon') || 
          key.toLowerCase().includes('option') ||
          key.toLowerCase().includes('extra') ||
          key.toLowerCase().includes('select')
        ) {
          if (value) {
            metaData.push({
              key: `property_${key}`,
              value: typeof value === 'object' ? JSON.stringify(value) : value.toString()
            });
          }
        }
      });
      
      // Log the meta_data for debugging
      console.log(`Meta data for item ${item.id}:`, JSON.stringify(metaData, null, 2));
      
      // For WooCommerce API, ensure we're sending a valid line item
      const lineItem = {
        product_id: parseInt(item.id) || 0,   // must be a number
        quantity: item.quantity || 1
      };
      
      // Only add meta_data if we have some
      if (metaData.length > 0) {
        lineItem.meta_data = metaData;
      }
      
      // Send raw product name as part of the line item description
      if (item.name) {
        lineItem.name = item.name;
      }
      
      return lineItem;
    });

    // Construct the WooCommerce order payload
    const orderPayload = {
      payment_method: data.payment_method || 'cod',
      payment_method_title: data.payment_method_title || 'Cash on Delivery',
      set_paid: false,               // Typically false unless you handle payment externally
      billing: data.billing,         // e.g. { first_name, last_name, address_1, ... }
      shipping: data.shipping,       // e.g. { first_name, last_name, address_1, ... }
      line_items: lineItems,
      // Add custom order meta data to ensure add-ons are visible at the order level too
      meta_data: [{
        key: 'has_addons',
        value: 'true'
      }]
    };
    
    // If the original cart contains any add-on info at the cart level, add it to the order meta
    if (data.cart && data.cart.addons) {
      orderPayload.meta_data.push({
        key: 'cart_addons',
        value: JSON.stringify(data.cart.addons)
      });
    }

    console.log('Sending order to WooCommerce:', orderPayload);
    
    // Send POST request to create the order in WooCommerce
    const res = await fetch(ordersEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      // If WooCommerce responds with an error, read it and return
      const errorText = await res.text();
      return NextResponse.json(
        { error: 'Failed to create order', details: errorText },
        { status: 400 }
      );
    }

    // Parse the created order from WooCommerce
    const createdOrder = await res.json();
    return NextResponse.json(createdOrder);

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    );
  }
}

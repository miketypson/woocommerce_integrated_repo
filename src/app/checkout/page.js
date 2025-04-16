'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Check, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  // Direct cart implementation - matching the ProductCard and cart page
  const CART_KEY = 'direct_cart_v1';
  const [cart, setCart] = useState({ items: [], count: 0 });
  
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
  
  // Load cart on component mount
  useEffect(() => {
    const directCart = getDirectCart();
    console.log('Checkout: Loading direct cart data:', directCart);
    setCart(directCart);
    
    // Set up event listener for cart updates
    const handleCartUpdate = () => {
      const updatedCart = getDirectCart();
      console.log('Checkout: Cart updated:', updatedCart);
      setCart(updatedCart);
    };
    
    window.addEventListener('directCartUpdated', handleCartUpdate);
    document.addEventListener('directCartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('directCartUpdated', handleCartUpdate);
      document.removeEventListener('directCartUpdated', handleCartUpdate);
    };
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'US',
    company: '',
    paymentMethod: 'cod', // Default to Cash on Delivery
  });
  const [billingDifferentThanShipping, setBillingDifferentThanShipping] = useState(false);
  const [billingFormData, setBillingFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'US',
    company: '',
  });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'cod', title: 'Cash on Delivery', description: 'Pay with cash upon delivery.' },
    { id: 'stripe', title: 'Credit Card (Stripe)', description: 'Pay with your credit card via Stripe.' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle billing form input changes
  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData({
      ...billingFormData,
      [name]: value,
    });
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cart.items || cart.items.length === 0) {
      setError('Your cart is empty. Please add items to your cart before checking out.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare order data
      const orderData = {
        payment_method: formData.paymentMethod,
        payment_method_title: paymentMethods.find(method => method.id === formData.paymentMethod)?.title || 'Cash on Delivery',
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address1,
          address_2: formData.address2,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        },
        billing: billingDifferentThanShipping
          ? {
              first_name: billingFormData.firstName,
              last_name: billingFormData.lastName,
              address_1: billingFormData.address1,
              address_2: billingFormData.address2,
              city: billingFormData.city,
              state: billingFormData.state,
              postcode: billingFormData.postcode,
              country: billingFormData.country,
              email: billingFormData.email,
              phone: billingFormData.phone,
              company: billingFormData.company,
            }
          : {
              first_name: formData.firstName,
              last_name: formData.lastName,
              address_1: formData.address1,
              address_2: formData.address2,
              city: formData.city,
              state: formData.state,
              postcode: formData.postcode,
              country: formData.country,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
            },
        // Pass the cart object directly for the API to process
        cart: cart,
      };
      
      console.log('Submitting order with cart:', cart);
      
      // Create order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      const orderResult = await response.json();
      console.log('WooCommerce order created:', orderResult);
      setOrderDetails(orderResult);
      setOrderComplete(true);
      
      // Clear the cart after successful order
      try {
        // Create empty cart
        const emptyCart = { items: [], count: 0 };
        
        // Save to localStorage
        localStorage.setItem(CART_KEY, JSON.stringify(emptyCart));
        
        // Dispatch event to update cart components
        const event = new CustomEvent('directCartUpdated', { 
          detail: { cart: emptyCart } 
        });
        window.dispatchEvent(event);
        document.dispatchEvent(event);
        
        console.log('Cart cleared after successful order');
      } catch (clearError) {
        console.error('Error clearing cart after order:', clearError);
      }
      
      // If payment method is Stripe, redirect to payment URL
      if (formData.paymentMethod === 'stripe' && orderResult.paymentUrl) {
        window.location.href = orderResult.paymentUrl;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is loading
  if (!cart) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Checkout</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E294B]"></div>
        </div>
      </div>
    );
  }

  // If order is complete - CHECK THIS CONDITION FIRST before the empty cart condition
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-500 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>#{orderDetails?.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Amount:</span>
              <span>{orderDetails?.currency} {orderDetails?.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span>{paymentMethods.find(method => method.id === formData.paymentMethod)?.title}</span>
            </div>
          </div>
          
          <div className="text-center mt-8">
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
  
  // If cart is empty and we're not in order complete state
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Checkout</h1>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>Your cart is empty. Please add items to your cart before checking out.</p>
          </div>
        </div>
        <Link href="/shop">
          <button className="bg-[#0E294B] text-white px-6 py-3 rounded-md hover:bg-[#1E5C97] transition-colors inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  // Main checkout page if we have items and no completed order
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0E294B] mb-8">Checkout</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={billingDifferentThanShipping}
                    onChange={() => setBillingDifferentThanShipping(!billingDifferentThanShipping)}
                    className="rounded border-gray-300 text-[#0E294B] focus:ring-[#0E294B]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Billing address is different than shipping</span>
                </label>
              </div>
            </div>
            
            {/* Billing Information (if different) */}
            {billingDifferentThanShipping && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="billingFirstName"
                      name="firstName"
                      value={billingFormData.firstName}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="billingLastName"
                      name="lastName"
                      value={billingFormData.lastName}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="billingEmail"
                      name="email"
                      value={billingFormData.email}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="billingPhone"
                      name="phone"
                      value={billingFormData.phone}
                      onChange={handleBillingInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="billingCompany" className="block text-sm font-medium text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="billingCompany"
                      name="company"
                      value={billingFormData.company}
                      onChange={handleBillingInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="billingAddress1" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="billingAddress1"
                      name="address1"
                      value={billingFormData.address1}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="billingAddress2" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="billingAddress2"
                      name="address2"
                      value={billingFormData.address2}
                      onChange={handleBillingInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="billingCity"
                      name="city"
                      value={billingFormData.city}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="billingState"
                      name="state"
                      value={billingFormData.state}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingPostcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="billingPostcode"
                      name="postcode"
                      value={billingFormData.postcode}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="billingCountry" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="billingCountry"
                      name="country"
                      value={billingFormData.country}
                      onChange={handleBillingInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0E294B] focus:border-[#0E294B]"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-start">
                    <input
                      type="radio"
                      id={method.id}
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handlePaymentMethodChange}
                      className="mt-1 h-4 w-4 border-gray-300 text-[#0E294B] focus:ring-[#0E294B]"
                    />
                    <label htmlFor={method.id} className="ml-3">
                      <div className="flex items-center">
                        {method.id === 'stripe' && <CreditCard className="h-5 w-5 mr-2 text-gray-500" />}
                        <span className="font-medium">{method.title}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link href="/cart">
                <button type="button" className="text-[#0E294B] hover:text-[#1E5C97] inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Cart
                </button>
              </Link>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0E294B] text-white py-3 px-6 rounded-md hover:bg-[#1E5C97] transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <div key={item.key} className="py-4 flex">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    {item.images && item.images[0] ? (
                      <img 
                        src={item.images[0].src} 
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.totals?.line_total}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">{cart.total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium text-gray-900">Calculated at next step</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-gray-900">{cart.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

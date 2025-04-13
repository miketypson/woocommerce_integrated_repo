"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Star, ShoppingCart, ExternalLink } from 'lucide-react';

// Sample faraday bag data
const faradayBagData = {
  id: 'premium-faraday-bag',
  title: 'Premium Faraday Bag',
  description: 'Military-grade signal blocking pouch that prevents all wireless signals from reaching your devices.',
  longDescription: 'Our Premium Faraday Bag provides complete protection against all wireless signals including cellular (5G/4G/3G/2G), WiFi, Bluetooth, GPS, RFID, and NFC. The multi-layered shielding technology blocks electromagnetic signals, preventing remote tracking, data theft, and unauthorized access to your devices. Perfect for privacy-conscious individuals, security professionals, and anyone looking to protect their digital privacy.',
  price: 89.99,
  images: ['/placeholder-product.jpg'],
  features: [
    'Blocks all wireless signals (Cellular, WiFi, Bluetooth, GPS, RFID, NFC)',
    'Military-grade shielding technology',
    'Water-resistant nylon exterior',
    'Soft interior lining to prevent device scratches',
    'Double-seal closure system for maximum signal blocking',
    'Signal blocking verification window',
    'Fits smartphones up to 7" screen size',
    'Additional pocket for cards and accessories',
    'Durable construction for everyday use',
    'Lab-tested with >60dB attenuation'
  ],
  specs: {
    dimensions: '8.5" x 5.5" x 0.8" (21.6 x 14 x 2 cm)',
    weight: '4.2 oz (120g)',
    material: 'Nylon exterior, multi-layer shielding fabric, microfiber interior',
    compatibility: 'Smartphones, key fobs, credit cards, passports, tracking devices',
    signalBlocking: 'Cellular (5G/4G/3G/2G), WiFi, Bluetooth, GPS, RFID, NFC',
    attenuation: '>60dB (99.9999% signal reduction)',
    waterResistance: 'Water-resistant (not waterproof)',
    warranty: '2-year manufacturer warranty'
  },
  privacyRating: 5,
  securityRating: 5,
  inStock: true
};

export default function FaradayBagProductPage() {
  const [activeTab, setActiveTab] = useState('description');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-[#0E294B]">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/shop" className="text-gray-500 hover:text-[#0E294B]">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/shop/faraday-products" className="text-gray-500 hover:text-[#0E294B]">Faraday Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{faradayBagData.title}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center">
            <div className="w-full max-w-md h-80 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Shield className="h-20 w-20 mx-auto mb-4" />
                <span className="text-sm">Product Image Placeholder</span>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D0E4F5] text-[#0E294B] mr-2">
                Faraday Product
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0E294B] text-white">
                Signal Blocking
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {faradayBagData.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) => (
                  <Shield 
                    key={i} 
                    className={`h-5 w-5 ${i < faradayBagData.privacyRating ? 'text-[#0E294B] fill-[#0E294B]' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">Privacy Rating: {faradayBagData.privacyRating}/5</span>
            </div>
            
            <p className="text-xl text-[#0E294B] font-bold mb-6">
              ${faradayBagData.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 mb-8">
              {faradayBagData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-primary flex-1 py-3 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <Link href="/why-privacy" className="btn-secondary flex items-center justify-center py-3 w-full sm:w-auto px-6">
                Why Signal Blocking Matters
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-[#D0E4F5]/30 border border-[#D0E4F5] rounded-lg p-4">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-[#0E294B] mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Complete Signal Isolation:</span> Our faraday bags have been independently tested to block all wireless signals with {`>`}60dB attenuation (99.9999% signal reduction), ensuring your devices are completely isolated from wireless networks and tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-[#0E294B] text-[#0E294B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-[#0E294B] text-[#0E294B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specs'
                    ? 'border-[#0E294B] text-[#0E294B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {faradayBagData.longDescription}
                </p>
                <p className="text-gray-600 mt-4">
                  In today's connected world, your devices are constantly emitting and receiving signals that can be used to track your location, monitor your activities, or even access your personal data. Our Premium Faraday Bag creates a secure electromagnetic shield around your devices, blocking all incoming and outgoing signals.
                </p>
                <p className="text-gray-600 mt-4">
                  Whether you're concerned about location tracking, remote hacking, data theft, or simply want to disconnect completely, our faraday bag provides peace of mind with military-grade protection. The signal blocking verification window allows you to quickly check if your device is properly isolated without opening the bag.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">When to Use a Faraday Bag</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>When you want to prevent location tracking</li>
                    <li>During sensitive meetings or in secure facilities</li>
                    <li>To protect key fobs from relay attacks</li>
                    <li>When traveling to protect your data at border crossings</li>
                    <li>To shield credit cards and passports from RFID skimming</li>
                    <li>As part of your digital privacy and security strategy</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faradayBagData.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#0E294B] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-[#0E294B] text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Open-Source Testing Verification</h3>
                  <p className="mb-4">
                    As part of our commitment to transparency, we've open-sourced our testing methodology and results. You can verify our signal blocking claims and even reproduce our tests using the documentation and tools provided in our GitHub repository.
                  </p>
                  <Link href="#" className="inline-flex items-center bg-white/10 px-4 py-2 rounded-md hover:bg-white/20 transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Testing Documentation
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(faradayBagData.specs).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Privacy Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/shop/product/pixel-7a-grapheneos" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Pixel 7a with GrapheneOS</h3>
                <p className="text-gray-600 mb-4">
                  Privacy-focused smartphone with enhanced security features powered by GrapheneOS.
                </p>
                <p className="text-[#0E294B] font-bold">$699.99</p>
              </div>
            </Link>
            
            <Link href="/shop/product/prepaid-sim-150" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Prepaid Data SIM - $150</h3>
                <p className="text-gray-600 mb-4">
                  Anonymous prepaid data SIM with no registration requirements.
                </p>
                <p className="text-[#0E294B] font-bold">$150.00</p>
              </div>
            </Link>
            
            <Link href="/shop/product/privacy-screen-protector" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Privacy Screen Protector</h3>
                <p className="text-gray-600 mb-4">
                  Anti-spy screen protector that prevents visual hacking by limiting viewing angles.
                </p>
                <p className="text-[#0E294B] font-bold">$29.99</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing imports for Check and ArrowRight
function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Star, ShoppingCart, ExternalLink, Check, Info } from 'lucide-react';

// Sample prepaid SIM data
const prepaidSimData = {
  id: 'prepaid-sim-150',
  title: 'Prepaid Data SIM - $150',
  description: 'Anonymous prepaid data SIM with no registration requirements and 15GB of high-speed data.',
  longDescription: 'Our Prepaid Data SIM provides a private and secure way to connect to the internet without compromising your identity. With no registration requirements and paid for with cash, this SIM offers true anonymity in the digital world. Enjoy 15GB of high-speed data with nationwide coverage, perfect for privacy-conscious individuals who want to minimize their digital footprint.',
  price: 150.00,
  dataAmount: '15GB',
  images: ['/placeholder-product.jpg'],
  features: [
    'No registration or ID required',
    'Cash payment for complete anonymity',
    '15GB of high-speed data',
    'Nationwide 4G/5G coverage',
    'No tracking or data logging',
    'Compatible with all unlocked phones',
    'No automatic renewal (one-time purchase)',
    'Data-only (no voice calls)',
    'Valid for 90 days from activation',
    'Works with VPNs for additional privacy'
  ],
  specs: {
    dataAllowance: '15GB high-speed data',
    networkType: '4G LTE and 5G where available',
    coverage: 'Nationwide (99% population coverage)',
    simType: 'Triple-cut SIM (Standard, Micro, Nano)',
    validity: '90 days from activation',
    renewal: 'None - one-time purchase',
    activation: 'Simple online activation with no personal information',
    compatibility: 'All unlocked GSM devices'
  },
  privacyRating: 5,
  securityRating: 5,
  inStock: true,
  alternativeOption: {
    id: 'prepaid-sim-300',
    title: 'Prepaid Data SIM - $300',
    price: 300.00,
    dataAmount: '50GB'
  }
};

export default function PrepaidSimProductPage() {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedOption, setSelectedOption] = useState('150');
  
  // Toggle between $150 and $300 options
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  
  // Get current product data based on selected option
  const currentProduct = selectedOption === '150' 
    ? prepaidSimData 
    : {
        ...prepaidSimData,
        id: 'prepaid-sim-300',
        title: 'Prepaid Data SIM - $300',
        description: 'Anonymous prepaid data SIM with no registration requirements and 50GB of high-speed data.',
        longDescription: 'Our Prepaid Data SIM provides a private and secure way to connect to the internet without compromising your identity. With no registration requirements and paid for with cash, this SIM offers true anonymity in the digital world. Enjoy 50GB of high-speed data with nationwide coverage, perfect for privacy-conscious individuals who want to minimize their digital footprint.',
        price: 300.00,
        dataAmount: '50GB',
        specs: {
          ...prepaidSimData.specs,
          dataAllowance: '50GB high-speed data',
          validity: '180 days from activation',
        }
      };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-[#0E294B]">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/shop" className="text-gray-500 hover:text-[#0E294B]">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/shop/connectivity" className="text-gray-500 hover:text-[#0E294B]">Connectivity</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{currentProduct.title}</span>
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
                Connectivity
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0E294B] text-white">
                Anonymous
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentProduct.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) => (
                  <Shield 
                    key={i} 
                    className={`h-5 w-5 ${i < currentProduct.privacyRating ? 'text-[#0E294B] fill-[#0E294B]' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">Privacy Rating: {currentProduct.privacyRating}/5</span>
            </div>
            
            <p className="text-xl text-[#0E294B] font-bold mb-6">
              ${currentProduct.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 mb-6">
              {currentProduct.description}
            </p>
            
            {/* Option Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Select Data Plan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedOption === '150' 
                      ? 'border-[#0E294B] bg-[#D0E4F5]/30' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleOptionChange('150')}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">$150 Plan</span>
                    {selectedOption === '150' && (
                      <Check className="h-5 w-5 text-[#0E294B]" />
                    )}
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#0E294B] rounded-full mr-2"></span>
                      15GB Data
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#0E294B] rounded-full mr-2"></span>
                      90 Days Validity
                    </li>
                  </ul>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedOption === '300' 
                      ? 'border-[#0E294B] bg-[#D0E4F5]/30' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleOptionChange('300')}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">$300 Plan</span>
                    {selectedOption === '300' && (
                      <Check className="h-5 w-5 text-[#0E294B]" />
                    )}
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#0E294B] rounded-full mr-2"></span>
                      50GB Data
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#0E294B] rounded-full mr-2"></span>
                      180 Days Validity
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-primary flex-1 py-3 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <Link href="/why-privacy" className="btn-secondary flex items-center justify-center py-3 w-full sm:w-auto px-6">
                Why Anonymous Connectivity Matters
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-[#D0E4F5]/30 border border-[#D0E4F5] rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-[#0E294B] mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Privacy Note:</span> For maximum privacy, we recommend using this SIM with our secure phones running GrapheneOS and connecting through a trusted VPN service. This creates multiple layers of privacy protection for your online activities.
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
                Privacy Features
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
                  {currentProduct.longDescription}
                </p>
                <p className="text-gray-600 mt-4">
                  Traditional mobile carriers require extensive personal information during registration, creating a direct link between your identity and your online activities. Our Prepaid Data SIM eliminates this connection, allowing you to browse the internet without leaving a trail of personal data.
                </p>
                <p className="text-gray-600 mt-4">
                  With {currentProduct.dataAmount} of high-speed data and nationwide coverage, this SIM provides both privacy and performance. It's compatible with all unlocked phones, including our secure GrapheneOS devices, creating a comprehensive privacy solution for your mobile connectivity needs.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Anonymous Connectivity Matters</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Prevents location tracking through cellular networks</li>
                    <li>Eliminates the connection between your identity and online activities</li>
                    <li>Reduces your digital footprint and data collection</li>
                    <li>Protects against targeted advertising and profiling</li>
                    <li>Provides a layer of security against SIM-swapping attacks</li>
                    <li>Maintains privacy when traveling or in sensitive situations</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Privacy Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#0E294B] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-[#0E294B] text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Open-Source Privacy Guide</h3>
                  <p className="mb-4">
                    As part of our commitment to transparency and education, we've created an open-source guide on maximizing your privacy when using mobile data. This guide includes technical details on how cellular networks track users and practical steps to minimize your digital footprint.
                  </p>
                  <Link href="#" className="inline-flex items-center bg-white/10 px-4 py-2 rounded-md hover:bg-white/20 transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Privacy Guide
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
                  {Object.entries(currentProduct.specs).map(([key, value]) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Privacy Setup</h2>
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
            
            <Link href="/shop/product/premium-faraday-bag" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">Premium Faraday Bag</h3>
                <p className="text-gray-600 mb-4">
                  Military-grade signal blocking pouch that prevents all wireless signals from reaching your devices.
                </p>
                <p className="text-[#0E294B] font-bold">$89.99</p>
              </div>
            </Link>
            
            <Link href="/shop/product/vpn-subscription" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:border-[#0E294B] hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0E294B]">VPN Subscription</h3>
                <p className="text-gray-600 mb-4">
                  No-logs VPN service with strong encryption and privacy-focused features.
                </p>
                <p className="text-[#0E294B] font-bold">$59.99/year</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
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

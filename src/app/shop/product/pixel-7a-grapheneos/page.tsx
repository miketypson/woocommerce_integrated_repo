"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Check, Info } from 'lucide-react';

// Sample phone data
const phoneData = {
  id: 'pixel-7a-grapheneos',
  title: 'Pixel 7a with GrapheneOS',
  description: 'A privacy-focused smartphone with enhanced security features powered by GrapheneOS.',
  longDescription: 'The Google Pixel 7a running GrapheneOS provides the perfect balance of privacy, security, and usability. GrapheneOS is a privacy and security focused mobile OS with Android app compatibility. The Pixel 7a hardware combined with GrapheneOS creates a secure foundation for your digital life without Google services tracking your every move.',
  price: 699.99,
  images: ['/placeholder-product.jpg'],
  features: [
    'GrapheneOS pre-installed',
    'No Google services or tracking',
    'Hardware-backed security features',
    'Regular security updates',
    'Verified boot process',
    'App sandboxing and permissions control',
    'Custom app selection available',
    'Hardened memory allocator',
    'Network and sensor permission controls',
    'Full disk encryption'
  ],
  specs: {
    display: '6.1" OLED display (1080 x 2400)',
    processor: 'Google Tensor G2',
    ram: '8GB LPDDR5',
    storage: '128GB UFS 3.1',
    camera: '64MP main camera, 13MP ultrawide',
    battery: '4385mAh',
    connectivity: '5G, Wi-Fi 6E, Bluetooth 5.2, NFC',
    biometrics: 'Under-display fingerprint sensor',
    os: 'GrapheneOS (Android 13 compatible)',
    dimensions: '152.4 x 72.9 x 9.0 mm',
    weight: '193.5g'
  },
  privacyRating: 5,
  securityRating: 5,
  inStock: true
};

// Sample apps data for selection
const availableApps = [
  {
    id: 'signal',
    name: 'Signal',
    category: 'Communication',
    description: 'End-to-end encrypted messaging app',
    isRecommended: true
  },
  {
    id: 'protonmail',
    name: 'ProtonMail',
    category: 'Email',
    description: 'Secure email service with end-to-end encryption',
    isRecommended: true
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    category: 'Password Manager',
    description: 'Open-source password manager',
    isRecommended: true
  },
  {
    id: 'brave',
    name: 'Brave Browser',
    category: 'Web Browser',
    description: 'Privacy-focused web browser with built-in ad blocking',
    isRecommended: true
  },
  {
    id: 'orbot',
    name: 'Orbot',
    category: 'Network',
    description: 'Tor proxy for enhanced anonymity',
    isRecommended: false
  },
  {
    id: 'aegis',
    name: 'Aegis Authenticator',
    category: 'Security',
    description: 'Secure two-factor authentication app',
    isRecommended: true
  },
  {
    id: 'newpipe',
    name: 'NewPipe',
    category: 'Media',
    description: 'Lightweight YouTube frontend',
    isRecommended: false
  },
  {
    id: 'osmand',
    name: 'OsmAnd',
    category: 'Navigation',
    description: 'Open-source maps and navigation',
    isRecommended: true
  }
];

export default function PhoneProductPage() {
  const [selectedApps, setSelectedApps] = useState([
    'signal', 'protonmail', 'bitwarden', 'brave'
  ]);
  const [activeTab, setActiveTab] = useState('description');
  
  const handleAppToggle = (appId) => {
    if (selectedApps.includes(appId)) {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    } else {
      setSelectedApps([...selectedApps, appId]);
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
          <Link href="/shop/secure-phones" className="text-gray-500 hover:text-[#0E294B]">Secure Phones</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{phoneData.title}</span>
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
                Secure Phone
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0E294B] text-white">
                GrapheneOS
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {phoneData.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) => (
                  <Shield 
                    key={i} 
                    className={`h-5 w-5 ${i < phoneData.privacyRating ? 'text-[#0E294B] fill-[#0E294B]' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">Privacy Rating: {phoneData.privacyRating}/5</span>
            </div>
            
            <p className="text-xl text-[#0E294B] font-bold mb-6">
              ${phoneData.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 mb-8">
              {phoneData.description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Apps to Pre-install
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose which privacy-focused apps you'd like pre-installed on your device.
                <Link href="/apps" className="text-[#0E294B] hover:underline ml-1">
                  Learn more about these apps
                </Link>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableApps.map((app) => (
                  <div 
                    key={app.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedApps.includes(app.id) 
                        ? 'border-[#0E294B] bg-[#D0E4F5]/30' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAppToggle(app.id)}
                  >
                    <div className={`w-5 h-5 rounded-md border flex-shrink-0 mr-3 flex items-center justify-center ${
                      selectedApps.includes(app.id) 
                        ? 'bg-[#0E294B] border-[#0E294B]' 
                        : 'border-gray-300'
                    }`}>
                      {selectedApps.includes(app.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{app.name}</span>
                        {app.isRecommended && (
                          <span className="ml-2 text-xs text-[#0E294B]">Recommended</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-primary flex-1 py-3 flex items-center justify-center">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <Link href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer">
                <button className="btn-secondary flex items-center justify-center py-3 w-full sm:w-auto px-6">
                  Learn About GrapheneOS
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
            
            <div className="bg-[#D0E4F5]/30 border border-[#D0E4F5] rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-[#0E294B] mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Verify Your Security:</span> All our phones come with tools to verify the integrity of the operating system and apps. We provide full transparency through our open-source approach, allowing you to trust but verify.
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
                  {phoneData.longDescription}
                </p>
                <p className="text-gray-600 mt-4">
                  GrapheneOS provides strong privacy and security improvements while maintaining the full functionality and compatibility that users expect. It's focused on the research and development of privacy and security technology including substantial improvements to sandboxing, exploit mitigations and the permission model.
                </p>
                <p className="text-gray-600 mt-4">
                  Our phones come with GrapheneOS pre-installed and configured for optimal privacy and security. We also pre-install your selected privacy-focused apps, so your phone is ready to use securely right out of the box.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Privacy and Security Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phoneData.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#0E294B] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(phoneData.specs).map(([key, value]) => (
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
      </div>
    </div>
  );
}

// Custom icon components
function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function ArrowRightIcon(props) {
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

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Info, Check } from 'lucide-react';

// Sample apps data
const apps = [
  {
    id: 'signal',
    name: 'Signal',
    category: 'Communication',
    description: 'End-to-end encrypted messaging app that prioritizes privacy and security.',
    privacyFeatures: [
      'End-to-end encryption',
      'No metadata collection',
      'Open-source code',
      'Self-destructing messages'
    ],
    securityRating: 5,
    privacyRating: 5,
    vulnerabilities: 'Minimal. Phone number required for registration.',
    isRecommended: true,
    icon: '/placeholder-app.jpg'
  },
  {
    id: 'protonmail',
    name: 'ProtonMail',
    category: 'Email',
    description: 'Secure email service with end-to-end encryption and zero-access encryption.',
    privacyFeatures: [
      'End-to-end encryption',
      'Zero-access encryption',
      'Anonymous sign-up option',
      'No IP logging'
    ],
    securityRating: 5,
    privacyRating: 5,
    vulnerabilities: 'Subject lines not encrypted. Limited integration with other email services.',
    isRecommended: true,
    icon: '/placeholder-app.jpg'
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    category: 'Password Manager',
    description: 'Open-source password manager with strong encryption and cross-platform support.',
    privacyFeatures: [
      'Zero-knowledge architecture',
      'AES-256 bit encryption',
      'Open-source code',
      'Self-hosting option'
    ],
    securityRating: 5,
    privacyRating: 4,
    vulnerabilities: 'Cloud-based by default, though self-hosting is available.',
    isRecommended: true,
    icon: '/placeholder-app.jpg'
  }
];

const AppCard = ({ app }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start">
          {/* App Icon */}
          <div className="w-16 h-16 bg-[#D0E4F5] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            {app.icon ? (
              <img src={app.icon} alt={app.name} className="w-10 h-10" />
            ) : (
              <Shield className="h-8 w-8 text-[#0E294B]" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {app.name}
              </h3>
              
              {app.isRecommended && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  Recommended
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-500 mb-1">{app.category}</p>
            
            <p className="text-gray-600 text-sm mb-3">
              {app.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <div>
                  <span className="text-xs text-gray-500 block">Security</span>
                  <div className="flex items-center">
                    <span className="font-medium text-[#0E294B]">{app.securityRating}/5</span>
                    <Lock className="ml-1 h-3 w-3 text-[#0E294B]" />
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block">Privacy</span>
                  <div className="flex items-center">
                    <span className="font-medium text-[#0E294B]">{app.privacyRating}/5</span>
                    <Shield className="ml-1 h-3 w-3 text-[#0E294B]" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-[#0E294B] text-sm font-medium flex items-center hover:underline"
              >
                <Info className="mr-1 h-4 w-4" />
                {expanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Privacy Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {app.privacyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Potential Vulnerabilities</h4>
              <p className="text-sm text-gray-600">{app.vulnerabilities}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AppList = () => {
  return (
    <div className="space-y-6">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
};

export default AppList;

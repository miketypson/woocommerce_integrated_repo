"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Search, ChevronDown, Shield, Code } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 bg-[#0E294B] rounded-full flex items-center justify-center mr-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PrivacySecure</span>
              <div className="ml-2 bg-[#0E294B] text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                <Code className="h-3 w-3 mr-0.5" />
                <span>OSS</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-[#0E294B] font-medium"
                onClick={toggleShopDropdown}
              >
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Shop Dropdown */}
              <div className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${isShopDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link href="/shop/product/pixel-7a-grapheneos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Secure Phones
                  </Link>
                  <Link href="/shop/product/premium-faraday-bag" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Faraday Bags
                  </Link>
                  <Link href="/shop/product/prepaid-sim-150" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Prepaid Data SIMs
                  </Link>
                  <Link href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    All Products
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/apps" className="text-gray-700 hover:text-[#0E294B] font-medium">
              Apps
            </Link>
            
            <Link href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#0E294B] font-medium">
              GrapheneOS
            </Link>
            
            <Link href="/why-privacy" className="text-gray-700 hover:text-[#0E294B] font-medium">
              Why Privacy
            </Link>
            
            <Link href="/open-source" className="text-gray-700 hover:text-[#0E294B] font-medium">
              Open Source
            </Link>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#0E294B]">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/cart" className="text-gray-700 hover:text-[#0E294B] relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-[#0E294B] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#0E294B]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <div className="block">
            <button 
              onClick={toggleShopDropdown}
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md flex justify-between items-center"
            >
              Shop
              <ChevronDown className={`h-4 w-4 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`pl-4 space-y-1 transition-all duration-200 ${isShopDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <Link href="/shop/product/pixel-7a-grapheneos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
                Secure Phones
              </Link>
              <Link href="/shop/product/premium-faraday-bag" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
                Faraday Bags
              </Link>
              <Link href="/shop/product/prepaid-sim-150" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
                Prepaid Data SIMs
              </Link>
              <Link href="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
                All Products
              </Link>
            </div>
          </div>
          
          <Link href="/apps" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Apps
          </Link>
          
          <Link href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            GrapheneOS
          </Link>
          
          <Link href="/why-privacy" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Why Privacy
          </Link>
          
          <Link href="/open-source" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Open Source
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center justify-around px-5">
            <button className="text-gray-700 hover:text-[#0E294B] p-2">
              <Search className="h-6 w-6" />
            </button>
            
            <Link href="/cart" className="text-gray-700 hover:text-[#0E294B] relative p-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-[#0E294B] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

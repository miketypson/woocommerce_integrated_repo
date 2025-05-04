"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Search, Shield, Code } from 'lucide-react';

// No imports - direct implementation

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Direct cart implementation
  useEffect(() => {
    // Constants
    const CART_KEY = 'direct_cart_v1';
    
    // Load cart data directly from localStorage
    const loadCartData = () => {
      try {
        const cartData = localStorage.getItem(CART_KEY);
        
        if (cartData) {
          try {
            const cart = JSON.parse(cartData);
            console.log('Navbar: Cart count =', cart.count);
            setCartItemCount(cart.count || 0);
          } catch (e) {
            console.error('Navbar: Error parsing cart data:', e);
            setCartItemCount(0);
          }
        } else {
          console.log('Navbar: No cart data found');
          setCartItemCount(0);
        }
      } catch (error) {
        console.error('Navbar: Error reading from localStorage:', error);
        setCartItemCount(0);
      }
    };
    
    // Initial load
    loadCartData();
    console.log('Navbar: Initial cart load complete');
    
    // Listen for direct cart update events
    const handleCartUpdate = (event: Event) => {
      console.log('Navbar: Direct cart update event detected', event);
      loadCartData();
    };
    
    // Add our event listeners
    document.addEventListener('directCartUpdated', handleCartUpdate);
    window.addEventListener('directCartUpdated', handleCartUpdate);
    
    // Regular polling as a fallback
    const interval = setInterval(() => {
      loadCartData();
    }, 1000);
    
    // Force an immediate check after a short delay
    setTimeout(loadCartData, 100);
    
    return () => {
      window.removeEventListener('directCartUpdated', handleCartUpdate);
      document.removeEventListener('directCartUpdated', handleCartUpdate);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/fortress-logo.svg" 
                alt="Fortress Technologies Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="text-xl font-bold text-gray-900">Fortress Technologies</span>
              <div className="ml-2 bg-[#0E294B] text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                <Code className="h-3 w-3 mr-0.5" />
                <span>OSS</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-[#0E294B] font-medium">
              Shop
            </Link>
            
            <Link href="/apps" className="text-gray-700 hover:text-[#0E294B] font-medium">
              Apps
            </Link>
            
            <Link href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#0E294B] font-medium">
              GrapheneOS
            </Link>
            
            <Link href="/why-privacy" className="text-gray-700 hover:text-[#0E294B] font-medium">
              Commitment to Privacy
            </Link>

            <Link href="/faq" className="text-gray-700 hover:text-[#0E294B] font-medium">
              FAQs
            </Link>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#0E294B]">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/cart" className="text-gray-700 hover:text-[#0E294B] relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0E294B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
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
          <Link href="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Shop
          </Link>
          
          <Link href="/apps" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Apps
          </Link>
          
          <Link href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            GrapheneOS
          </Link>
          
          <Link href="/why-privacy" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Commitment to Privacy
          </Link>
          
          <Link href="/open-source" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            Open Source
          </Link>

          <Link href="/faq" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#0E294B] hover:bg-gray-50 rounded-md">
            FAQs
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center justify-around px-5">
            <button className="text-gray-700 hover:text-[#0E294B] p-2">
              <Search className="h-6 w-6" />
            </button>
            
            <Link href="/cart" className="text-gray-700 hover:text-[#0E294B] relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#0E294B] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

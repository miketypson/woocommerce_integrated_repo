"use client";

import Link from 'next/link';
import { ExternalLink, Mail, Phone, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <img 
                src="/images/fortress-logo.svg" 
                alt="Fortress Technologies Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="text-xl font-bold text-gray-900">Fortress Technologies</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Privacy-focused products and services designed to protect your digital life. Open-source, transparent, and secure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0E294B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0E294B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0E294B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/product/pixel-7a-grapheneos" className="text-gray-600 hover:text-[#0E294B]">
                  Secure Phones
                </Link>
              </li>
              <li>
                <Link href="/shop/product/premium-faraday-bag" className="text-gray-600 hover:text-[#0E294B]">
                  Faraday Bags
                </Link>
              </li>
              <li>
                <Link href="/shop/product/prepaid-sim-150" className="text-gray-600 hover:text-[#0E294B]">
                  Prepaid Data SIMs
                </Link>
              </li>
              <li>
                <Link href="/apps" className="text-gray-600 hover:text-[#0E294B]">
                  Privacy Apps
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/why-privacy" className="text-gray-600 hover:text-[#0E294B]">
                  Commitment to Privacy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#0E294B]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#0E294B]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for privacy tips and product updates.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#0E294B] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#0E294B] hover:bg-[#1E5C97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E294B]"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-[#0E294B] mr-2" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-[#0E294B] mr-2" />
                <span className="text-gray-600 text-sm">contact@fortresstechnologies.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Open Source Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Our Open-Source Commitment
              </h3>
              <p className="text-gray-600 text-sm max-w-2xl">
                All our software is open-source, allowing for transparency and community verification. 
                We believe privacy requires trust, and trust requires transparency.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-[#0E294B] text-sm font-medium rounded-md text-[#0E294B] bg-white hover:bg-gray-50">
                GrapheneOS
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0E294B] hover:bg-[#1E5C97]">
                Our GitHub
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Fortress Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

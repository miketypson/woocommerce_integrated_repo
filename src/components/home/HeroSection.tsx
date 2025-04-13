"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Code } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="relative min-h-[600px] h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E294B] to-[#1E5C97]">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '24px 24px'
             }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className={`md:w-1/2 text-center md:text-left mb-12 md:mb-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              <span>Cybersecurity Experts</span>
              <span className="mx-2">•</span>
              <Code className="h-4 w-4 mr-2" />
              <span>Open Source</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Privacy by Design, Security by Default
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Open-source privacy solutions for everyone. Take control of your digital life with trusted, transparent technology.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/shop">
                <button className="bg-white text-[#0E294B] px-6 py-3 rounded-md font-medium hover:bg-white/90 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                  Shop Privacy Solutions
                </button>
              </Link>
              
              <Link href="/why-privacy" className="text-white flex items-center group">
                <span className="border-b border-white/30 group-hover:border-white transition-colors">
                  Learn Why Privacy Matters
                </span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Logo Element */}
          <div className={`md:w-1/2 flex justify-center items-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative flex items-center justify-center">
              {/* Glow effect behind logo */}
              <div className="absolute w-60 h-60 bg-[#1E5C97]/30 rounded-full blur-xl"></div>
              
              {/* Logo */}
              <div className="relative z-10">
                <img 
                  src="/images/fortress-logo.svg" 
                  alt="Fortress Technologies" 
                  className="w-56 h-56 mx-auto drop-shadow-xl"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute h-4 w-4 bg-white rounded-full top-0 right-10 animate-ping opacity-30"></div>
              <div className="absolute h-3 w-3 bg-white rounded-full bottom-10 left-5 animate-ping opacity-20 animation-delay-1000"></div>
              <div className="absolute h-2 w-2 bg-white rounded-full top-20 left-20 animate-ping opacity-10 animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ShoppingCart, Star, ExternalLink, Code } from 'lucide-react';

const ProductCard = ({ 
  product = { 
    id: 'sample-product',
    title: 'Pixel 7a with GrapheneOS',
    category: 'Secure Phone',
    description: 'Privacy-focused smartphone with enhanced security features',
    price: 699.99,
    image: '/placeholder-product.jpg',
    privacyRating: 5,
    isOpenSource: true,
    openSourceLink: 'https://grapheneos.org/',
    inStock: true
  },
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { cart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock || isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ 
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 25px -5px rgba(14, 41, 75, 0.1), 0 8px 10px -6px rgba(14, 41, 75, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100">
        <div className="absolute top-0 left-0 z-10 flex flex-col gap-2 p-2">
          {/* Category Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D0E4F5] text-[#0E294B]">
            {product.category}
          </span>
          
          {/* Open Source Badge (if applicable) */}
          {product.isOpenSource && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0E294B] text-white">
              <Code className="mr-1 h-3 w-3" />
              Open Source
            </span>
          )}
        </div>
        
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title}
              className="object-contain p-4 w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 text-center">
                <Shield className="h-16 w-16 mx-auto mb-2" />
                <span className="text-sm">Product Image Placeholder</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Privacy Rating */}
        <div className="flex items-center mb-4">
          <span className="text-xs text-gray-500 mr-2">Privacy Rating:</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < product.privacyRating ? 'text-[#0E294B] fill-[#0E294B]' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="text-[#0E294B] font-bold text-xl">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            {product.isOpenSource && (
              <Link 
                href={product.openSourceLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-[#0E294B] hover:bg-[#D0E4F5] rounded-full transition-colors"
                aria-label={`View source code for ${product.title}`}
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
            
            <div className="flex space-x-2">
              <Link href={`/shop/product/${product.id}`}>
                <button className="bg-[#0E294B] text-white px-4 py-2 rounded-md hover:bg-[#1E5C97] transition-colors flex items-center">
                  View Details
                </button>
              </Link>
              
              {product.inStock && (
                <button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`p-2 rounded-full transition-colors ${
                    isAddingToCart 
                      ? 'bg-gray-200 text-gray-400' 
                      : 'bg-[#D0E4F5] text-[#0E294B] hover:bg-[#0E294B] hover:text-white'
                  }`}
                  aria-label={`Add ${product.title} to cart`}
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// Shield icon component
function Shield(props) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

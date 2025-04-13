'use client';

import { CartProvider } from '@/context/CartContext';

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}

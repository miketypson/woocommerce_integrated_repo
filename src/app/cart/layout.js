'use client';

import { CartProvider } from '@/context/CartContext';

export default function CartLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}

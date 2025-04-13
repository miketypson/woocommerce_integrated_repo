'use client';

import { CartProvider } from '@/context/CartContext';

export default function CheckoutLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}

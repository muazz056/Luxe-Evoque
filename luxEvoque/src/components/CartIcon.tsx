'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartIcon() {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <Link
      href="/cart"
      className="relative p-2 text-text-primary hover:text-gold transition-colors"
      aria-label={`View cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gold text-bgPrimary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
}
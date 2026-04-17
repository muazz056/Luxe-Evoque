'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartContent from './CartContent';

export default function CartSidebar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={toggleCart}
        className="relative p-2 text-text-primary hover:text-gold transition-colors"
        aria-label="Open cart"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cart.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gold text-bgPrimary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cart.itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-bgPrimary/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleCart}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-bgCard shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <CartContent onClose={toggleCart} />
        </div>
      </div>
    </>
  );
}

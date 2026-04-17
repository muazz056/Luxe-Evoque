'use client';

import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/constants';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleProceedToCheckout = () => {
    onClose();
    router.push('/cart');
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-bgPrimary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 bottom-0 flex items-start sm:items-center justify-center p-0 sm:p-4">
        {/* Modal Card */}
        <div className="relative w-full max-w-2xl mx-0 sm:mx-auto bg-bgCard border border-border shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)]">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <h2 className="heading-md text-text-primary">
              Your Cart {cart.itemCount > 0 && `(${cart.itemCount})`}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bgPrimary/10 rounded-full transition-colors"
              aria-label="Close cart modal"
            >
              <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="heading-md text-text-primary mb-3">Your cart is empty</h3>
                <p className="body-md text-text-muted mb-6">
                  Looks like you haven't added any fragrances yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    router.push('/#products-section');
                  }}
                  className="btn-primary"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-bgSecondary dark:bg-bgPrimary/50 rounded-xl shadow-soft"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-bgCard">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-text-primary truncate text-sm sm:text-base">
                        {item.product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted">
                        {formatPrice(item.priceAtAdd)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-bgCard text-text-primary hover:bg-border transition-colors flex items-center justify-center font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-text-primary text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-bgCard text-text-primary hover:bg-border transition-colors flex items-center justify-center font-bold text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-gold text-sm sm:text-base">
                        {formatPrice(item.priceAtAdd * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-border p-4 sm:p-6 space-y-4 bg-bgSecondary dark:bg-bgPrimary/30">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-sm sm:text-base">Subtotal</span>
                <span className="text-xl font-bold text-gold">{formatPrice(cart.total)}</span>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 sm:py-4 text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full text-center text-sm text-text-muted hover:text-red-400 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
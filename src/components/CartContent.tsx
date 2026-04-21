'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { WHATSAPP_BASE_URL } from '@/lib/constants';
import { formatPrice } from '@/lib/constants';

interface CartContentProps {
  onClose?: () => void;
}

export default function CartContent({ onClose }: CartContentProps) {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-fill user data when logged in
  useEffect(() => {
    if (user) {
      setCustomerName(user.fullName || '');
      setCustomerPhone(user.phone || '');
      setDeliveryAddress(user.address || '');
    }
  }, [user]);

  // when checkout form opens, scroll to bottom of the container so fields/order button are visible
  useEffect(() => {
    if (showCheckoutForm && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [showCheckoutForm]);

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    setShowCheckoutForm(true);
  };

  const handleWhatsAppCheckout = async () => {
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    let message = `*New Order from Luxe Evoque*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${customerName}\n`;
    message += `Phone: ${customerPhone}\n`;
    message += `Address: ${deliveryAddress}\n\n`;
    message += `*Order Items:*\n`;

    cart.items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} x${item.quantity} - ${formatPrice(item.priceAtAdd * item.quantity)}\n`;
    });

    message += `\n*Total: ${formatPrice(cart.total)}*\n`;
    message += `Payment: Cash on Delivery\n`;

    if (notes) {
      message += `Notes: ${notes}\n`;
    }

    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    setIsSubmitting(false);
    setShowCheckoutForm(false);
    if (onClose) onClose();
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setNotes('');
  };

  const useCustomerInfo = () => {
    if (user) {
      setCustomerName(user.fullName);
      setCustomerPhone(user.phone);
      setDeliveryAddress(`${user.address}, ${user.city}, ${user.country} ${user.postalCode}`);
    }
  };

  const handleClose = () => {
    setShowCheckoutForm(false);
    if (onClose) onClose();
  };

  const handleGoToCartPage = () => {
    if (onClose) onClose();
    router.push('/cart');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="heading-md text-text-primary">
          Your Cart {cart.itemCount > 0 && `(${cart.itemCount})`}
        </h2>
        {onClose && (
          <button
            onClick={handleClose}
            className="p-2 hover:bg-bgPrimary/10 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Cart Items */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="body-md text-text-muted mb-4">Your cart is empty</p>
            {onClose && (
              <button onClick={handleClose} className="btn-primary">
                Continue Shopping
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-bgSecondary dark:bg-bgPrimary/50 rounded-xl shadow-soft"
              >
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-bgCard">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-semibold text-text-primary truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {formatPrice(item.priceAtAdd)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded bg-bgCard text-text-primary hover:bg-border transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded bg-bgCard text-text-primary hover:bg-border transition-colors flex items-center justify-center"
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
                  <p className="font-bold text-gold">
                    {formatPrice(item.priceAtAdd * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            {showCheckoutForm && (
              <div className="mt-6 space-y-4">
                <h3 className="font-serif font-semibold text-text-primary">Checkout Details</h3>

                {isAuthenticated && user && (
                  <div className="p-3 bg-gold/10 dark:bg-gold/20 rounded-lg text-sm">
                    <p className="font-medium text-text-primary">
                      Logged in as: {user.fullName}
                    </p>
                    <p className="text-text-muted text-xs">
                      {user.email}
                    </p>
                    <button
                      type="button"
                      onClick={useCustomerInfo}
                      className="mt-2 text-xs text-gold hover:underline"
                    >
                      Use saved address
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Complete delivery address"
                    rows={3}
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions..."
                    rows={2}
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCheckoutForm(false)}
                    className="flex-1 py-3 border border-border/30 rounded-full text-sm font-semibold text-text-primary hover:bg-bgPrimary/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleWhatsAppCheckout}
                    disabled={isSubmitting}
                    className="flex-1 py-3 btn-gold flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-bgPrimary/30 border-t-bgPrimary rounded-full animate-spin" />
                    ) : (
                      <>Send Order</>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Footer */}
      {cart.items.length > 0 && !showCheckoutForm && (
        <div className="border-t border-border p-6 space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Subtotal</span>
            <span className="text-xl font-bold text-gold">{formatPrice(cart.total)}</span>
          </div>

          <button
            onClick={handleGoToCartPage}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Go to Cart Page
          </button>
          <button
            onClick={handleCheckout}
            className="w-full btn-gold flex items-center justify-center gap-2"
          >
            Order via WhatsApp
          </button>
          <button
            onClick={clearCart}
            className="w-full text-center text-sm text-text-muted hover:text-red-400 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
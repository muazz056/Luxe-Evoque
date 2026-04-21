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

  useEffect(() => {
    if (user) {
      setCustomerName(user.fullName || '');
      setCustomerPhone(user.phone || '');
      setDeliveryAddress(user.address || '');
    }
  }, [user]);

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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Your Cart {cart.itemCount > 0 && `(${cart.itemCount})`}
        </h2>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-full transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
            aria-label="Close cart">
            <svg className="w-6 h-6" style={{ color: 'var(--text-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Cart Items */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
            {onClose && (
              <button onClick={onClose} className="px-6 py-3 rounded-full font-semibold"
                style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
                Continue Shopping
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl"
                style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {item.product.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{formatPrice(item.priceAtAdd)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded flex items-center justify-center font-bold"
                      style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}>-</button>
                    <span className="w-8 text-center font-semibold" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded flex items-center justify-center font-bold"
                      style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto p-1" style={{ color: '#DC2626' }}
                      aria-label="Remove item">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold" style={{ color: 'var(--gold-primary)' }}>{formatPrice(item.priceAtAdd * item.quantity)}</p>
                </div>
              </div>
            ))}

            {showCheckoutForm && (
              <div className="mt-6 space-y-4">
                <h3 className="font-serif font-semibold" style={{ color: 'var(--text-primary)' }}>Checkout Details</h3>

                {isAuthenticated && user && (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gold-highlight)' }}>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Logged in as: {user.fullName}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                    <button type="button" onClick={useCustomerInfo} className="mt-2 text-xs" style={{ color: 'var(--gold-primary)' }}>
                      Use saved address
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Name *</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full p-3 rounded-lg outline-none transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Phone *</label>
                  <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full p-3 rounded-lg outline-none transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Delivery Address *</label>
                  <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Complete delivery address" rows={3}
                    className="w-full p-3 rounded-lg outline-none resize-none transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>Notes (Optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special instructions..." rows={2}
                    className="w-full p-3 rounded-lg outline-none resize-none transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setShowCheckoutForm(false)}
                    className="flex-1 py-3 rounded-full font-semibold transition-all"
                    style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    Back
                  </button>
                  <button onClick={handleWhatsAppCheckout} disabled={isSubmitting}
                    className="flex-1 py-3 rounded-full font-semibold transition-all disabled:opacity-50"
                    style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
                    {isSubmitting ? 'Sending...' : 'Send Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {cart.items.length > 0 && !showCheckoutForm && (
        <div className="p-6 space-y-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span className="text-xl font-bold" style={{ color: 'var(--gold-primary)' }}>{formatPrice(cart.total)}</span>
          </div>

          <button onClick={handleGoToCartPage} className="w-full py-3 rounded-full font-semibold transition-all"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            Go to Cart Page
          </button>
          <button onClick={handleCheckout} className="w-full py-3 rounded-full font-semibold transition-all"
            style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
            Order via WhatsApp
          </button>
          <button onClick={clearCart} className="w-full py-2 text-center text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
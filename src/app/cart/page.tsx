'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/config/products';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CartPage() {
  const router = useRouter();
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    if (user) {
      setCustomerName(user.fullName || '');
      setCustomerPhone(user.phone || '');
      setDeliveryAddress(user.address || '');
    }
  }, [user]);

  useEffect(() => {
    if (cart.items.length === 0 && !showCheckoutForm) {
      router.push('/');
    }
  }, [cart.items.length, showCheckoutForm, router]);

  const handleWhatsAppCheckout = () => {
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

    if (notes) {
      message += `\n*Notes:* ${notes}\n`;
    }

    const whatsappUrl = `https://wa.me/923297189301?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    clearCart();
    setShowCheckoutForm(false);
    router.push('/');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navigation />

      <div className="pt-28 pb-16 px-4">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
            Your Cart
          </h1>

          {cart.items.length === 0 && !showCheckoutForm ? (
            <div className="text-center py-16" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border-color)' }}>
              <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
              <button onClick={handleContinueShopping}
                className="px-8 py-3 rounded-full font-semibold transition-all"
                style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
                Continue Shopping
              </button>
            </div>
          ) : !showCheckoutForm ? (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '1.5rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 md:p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <img src={item.product.images[0]} alt={item.product.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold" style={{ color: 'var(--text-primary)' }}>{item.product.name}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{formatPrice(item.priceAtAdd)} each</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>-</button>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg" style={{ color: 'var(--gold-primary)' }}>{formatPrice(item.priceAtAdd * item.quantity)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 mt-1">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="flex justify-between mb-2">
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Free</span>
                </div>
                <div className="border-t pt-4 mb-6" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex justify-between">
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span className="font-bold text-xl" style={{ color: 'var(--gold-primary)' }}>{formatPrice(cart.total)}</span>
                  </div>
                </div>

                <button onClick={() => { if (!isAuthenticated) { router.push('/auth'); return; } setShowCheckoutForm(true); }}
                  className="w-full py-4 rounded-full font-semibold mb-3 transition-all"
                  style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
                  {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                </button>
                <button onClick={handleContinueShopping}
                  className="w-full py-3 rounded-full font-semibold transition-all"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Complete Your Order</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-4 rounded-xl outline-none" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Phone Number *</label>
                  <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-4 rounded-xl outline-none" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Delivery Address *</label>
                  <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3} className="w-full p-4 rounded-xl outline-none resize-none"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Notes (Optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                    className="w-full p-4 rounded-xl outline-none resize-none"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    placeholder="Any special instructions..." />
                </div>

                <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex justify-between mb-4">
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span className="font-bold text-xl" style={{ color: 'var(--gold-primary)' }}>{formatPrice(cart.total)}</span>
                  </div>

                  <button onClick={handleWhatsAppCheckout} disabled={isSubmitting}
                    className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: '#25D366', color: '#FFF' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Order via WhatsApp
                  </button>

                  <button onClick={() => setShowCheckoutForm(false)}
                    className="w-full py-3 mt-3 rounded-full font-semibold transition-all"
                    style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
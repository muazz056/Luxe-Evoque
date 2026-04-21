'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/constants';
import { WHATSAPP_BASE_URL } from '@/lib/constants';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CartPage() {
  const router = useRouter();
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // useEffect on mount - redirect to home if cart is empty and not showing checkout
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
    message += `Payment: Cash on Delivery\n`;

    if (notes) {
      message += `Notes: ${notes}\n`;
    }

    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    setIsSubmitting(false);
    setShowCheckoutForm(false);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setNotes('');
    
    // Redirect to homepage after order
    router.push('/');
  };

  const handleContinueShopping = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-bgPrimary">
      <Navigation />

      <div className="container-custom pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-lg text-text-primary mb-4">
              Shopping Cart
            </h1>
            <p className="body-lg text-text-muted">
              Review your selected fragrances and complete your order
            </p>
          </div>

          {cart.items.length === 0 && !showCheckoutForm ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-bgCard flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="heading-md text-text-primary mb-4">Your cart is empty</h2>
              <p className="body-md text-text-muted mb-8">
                Looks like you haven't added any fragrances yet.
              </p>
              <button
                onClick={handleContinueShopping}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : !showCheckoutForm ? (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-bgCard rounded-3xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-md text-text-primary">
                      Cart Items ({cart.itemCount})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-bgSecondary dark:bg-bgPrimary/50 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-bgCard">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif font-semibold text-text-primary mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-text-muted mb-2">
                            {formatPrice(item.priceAtAdd)} each
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-bgCard text-text-primary hover:bg-border transition-colors flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-semibold text-text-primary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-bgCard text-text-primary hover:bg-border transition-colors flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-bold text-gold text-lg">
                            {formatPrice(item.priceAtAdd * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-xs text-text-muted hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-bgCard rounded-3xl p-6 shadow-soft sticky top-24">
                  <h2 className="heading-md text-text-primary mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-text-muted">
                      <span>Subtotal</span>
                      <span className="font-semibold text-text-primary">{formatPrice(cart.total)}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Delivery</span>
                      <span className="font-semibold text-text-primary">Free</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <span className="heading-sm text-text-primary">Total</span>
                      <span className="heading-sm text-gold">{formatPrice(cart.total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        router.push('/auth');
                        return;
                      }
                      setShowCheckoutForm(true);
                    }}
                    className="w-full btn-primary flex items-center justify-center gap-2 mb-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order via WhatsApp
                  </button>
                  <button
                    onClick={handleContinueShopping}
                    className="w-full py-4 border border-border rounded-full text-sm font-semibold text-text-primary hover:bg-bgPrimary/10 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-bgCard rounded-3xl p-8 shadow-soft">
                <h2 className="heading-md text-text-primary mb-6">
                  Complete Your Order
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full p-4 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full p-4 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter complete delivery address"
                      rows={3}
                      className="w-full p-4 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions..."
                      rows={2}
                      className="w-full p-4 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-bgSecondary dark:bg-bgPrimary/50 rounded-xl p-4">
                    <h3 className="font-semibold text-text-primary mb-3">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm text-text-muted">
                          <span>{item.product.name} x{item.quantity}</span>
                          <span>{formatPrice(item.priceAtAdd * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold text-text-primary">Total</span>
                      <span className="font-bold text-gold">{formatPrice(cart.total)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowCheckoutForm(false)}
                      className="flex-1 py-4 border border-border/30 rounded-full text-sm font-semibold text-text-primary hover:bg-bgPrimary/10 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleWhatsAppCheckout}
                      disabled={isSubmitting}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-bgPrimary/30 border-t-bgPrimary rounded-full animate-spin" />
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Send Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
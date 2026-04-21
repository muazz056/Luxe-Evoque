'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/config/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setShowFullDetails(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} onClick={onClose} />

      {/* Modal */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 bottom-0 flex items-start sm:items-center justify-center overflow-hidden p-0 sm:p-4">
        <div className="relative w-full h-full sm:h-auto sm:max-h-[calc(100vh-6rem)] sm:max-w-4xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)' }}>
          
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-3 right-3 z-30 p-2 rounded-full transition-colors"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#FFF' }}
            aria-label="Close modal">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-[500px] flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isBestseller && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                      style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>Bestseller</span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                      style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>New</span>
                  )}
                  {product.isLimited && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                      style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>Limited</span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full mb-3 inline-block"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
                    {product.categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
                  </span>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {product.name}
                  </h2>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--gold-primary)' }}>{formatPrice(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>{formatPrice(product.originalPrice)}</span>
                    )}
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{product.volume} • {product.concentration}</span>
                  </div>

                  <div className="mb-4">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${product.intensity === 'Strong' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : product.intensity === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                      {product.intensity} Sillage
                    </span>
                  </div>

                  <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{product.fullDescription}</p>

                  {/* Fragrance Notes */}
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Fragrance Notes</h3>
                    <div className="space-y-3">
                      {['topNotes', 'heartNotes', 'baseNotes'].map((noteType) => {
                        const notes = product[noteType as keyof Product] as { name: string; description: string }[];
                        return (
                          <div key={noteType}>
                            <span className="text-xs font-medium uppercase" style={{ color: 'var(--gold-primary)' }}>
                              {noteType === 'topNotes' ? 'Top' : noteType === 'heartNotes' ? 'Heart' : 'Base'}
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {notes.slice(0, showFullDetails ? undefined : 3).map((note) => (
                                <span key={note.name} className="px-2 py-1 text-xs rounded-full"
                                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                                  {note.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button onClick={() => setShowFullDetails(!showFullDetails)} className="text-xs mt-2" style={{ color: 'var(--gold-primary)' }}>
                      {showFullDetails ? 'Show Less' : 'Show All Notes'}
                    </button>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>-</button>
                      <span className="w-10 text-center font-bold" style={{ color: 'var(--text-primary)' }}>{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>+</button>
                    </div>
                  </div>

                  <button onClick={handleAddToCart}
                    className="w-full py-4 rounded-full font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
                    Add to Cart - {formatPrice(product.price * quantity)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
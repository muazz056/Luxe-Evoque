'use client';

import { useState, useEffect } from 'react';
import type { Product, FragranceNote } from '@/types';
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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      onClose();
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Light': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Strong': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-chocolate/10 text-chocolate dark:bg-cream/10 dark:text-cream';
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 bottom-0 flex items-start sm:items-center justify-center overflow-hidden p-0 sm:p-4">
        {/* Modal Card */}
        <div className="relative w-full h-full sm:h-auto sm:max-h-[calc(100vh-6rem)] sm:max-w-4xl bg-cream dark:bg-chocolate-800 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Product Image */}
              <div className="relative h-64 md:h-[500px] bg-transparent">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isBestseller && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gold text-chocolate-900 rounded-full shadow-md">
                      Bestseller
                    </span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-charcoal text-cream rounded-full">
                      New
                    </span>
                  )}
                  {product.isLimited && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber text-white rounded-full">
                      Limited Edition
                    </span>
                  )}
                  {product.discount && product.discount > 0 && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col">
                {/* Header */}
                <div className="flex-1">
                  {/* Category */}
                  <div className="mb-3">
                    <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-gold/20 text-gold rounded-full">
                      {product.categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-chocolate dark:text-cream-100 mb-4">
                    {product.name}
                  </h2>

                  {/* Price & Basic Info */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-gold">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-chocolate-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-sm text-chocolate-500 dark:text-cream-400">
                      {product.volume} • {product.concentration}
                    </span>
                  </div>

                  {/* Intensity */}
                  <div className="mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-chocolate-500 dark:text-cream-400">
                      Intensity
                    </span>
                    <div className="mt-1">
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getIntensityColor(product.intensity)}`}>
                        {product.intensity}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="body-md text-chocolate-600 dark:text-cream-300 mb-6 leading-relaxed">
                    {product.fullDescription}
                  </p>

                  {/* Fragrance Notes */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-chocolate-500 dark:text-cream-400">
                        Fragrance Notes
                      </h3>
                      <button
                        onClick={() => setShowFullDetails(!showFullDetails)}
                        className="text-xs text-gold hover:underline"
                      >
                        {showFullDetails ? 'Show Less' : 'Show All'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <NoteColumn title="Top Notes" notes={product.topNotes} showAll={showFullDetails} onShowAll={() => setShowFullDetails(true)} />
                      <NoteColumn title="Heart Notes" notes={product.heartNotes} showAll={showFullDetails} onShowAll={() => setShowFullDetails(true)} />
                      <NoteColumn title="Base Notes" notes={product.baseNotes} showAll={showFullDetails} onShowAll={() => setShowFullDetails(true)} />
                    </div>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="border-t border-chocolate/10 dark:border-cream/10 pt-6 space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-chocolate-500 dark:text-cream-400 mb-2 block">
                      Quantity
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-xl bg-chocolate/10 dark:bg-cream/10 text-chocolate dark:text-cream hover:bg-chocolate/20 dark:hover:bg-cream/20 transition-colors flex items-center justify-center text-2xl font-bold"
                      >
                        −
                      </button>
                      <span className="w-16 text-center text-3xl font-bold text-chocolate dark:text-cream-100">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-xl bg-chocolate/10 dark:bg-cream/10 text-chocolate dark:text-cream hover:bg-chocolate/20 dark:hover:bg-cream/20 transition-colors flex items-center justify-center text-2xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gold text-chocolate-900 text-base font-bold uppercase tracking-wider rounded-full hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
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

interface NoteColumnProps {
  title: string;
  notes: FragranceNote[];
  showAll: boolean;
  onShowAll: () => void;
}

function NoteColumn({ title, notes, showAll, onShowAll }: NoteColumnProps) {
  const displayNotes = showAll ? notes : notes.slice(0, 3);
  const hiddenCount = notes.length - 3;

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
        {title}
      </h4>
      <ul className="space-y-1">
        {displayNotes.map((note, idx) => (
          <li key={idx} className="text-xs text-chocolate-500 dark:text-cream-300">
            <span className="font-medium text-chocolate-700 dark:text-cream-100">{note.name}</span>
            {note.description && (
              <span className="text-chocolate-400 dark:text-cream-400"> – {note.description}</span>
            )}
          </li>
        ))}
      </ul>
      {!showAll && hiddenCount > 0 && (
        <button
          onClick={onShowAll}
          className="text-xs text-chocolate-400 hover:text-gold mt-1"
        >
          +{hiddenCount} more
        </button>
      )}
    </div>
  );
}
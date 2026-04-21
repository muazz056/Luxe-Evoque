'use client';

import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useProductModal } from './ProductModalContext';
import { formatPrice } from '@/config/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { addToCart } = useCart();
  const { openModal } = useProductModal();

  useEffect(() => {
    if (imgRef.current?.complete) setImageLoaded(true);
  }, []);

  const handleCardClick = () => openModal(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect fill="#F5F5F5" width="400" height="400"/>
      <text fill="#DAA520" font-family="Georgia, serif" font-size="28" x="50%" y="50%" text-anchor="middle" dy=".3em">${product.name}</text>
    </svg>
  `)}`;

  return (
    <div
      ref={ref}
      className="group relative cursor-pointer transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`,
      }}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-2xl transition-all duration-300" style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}>
        {/* Image Container */}
        <div className="relative aspect-square flex items-center justify-center p-6" style={{ backgroundColor: 'transparent' }}>
          <img
            ref={imgRef}
            src={imageError ? placeholderImage : product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
            onError={() => { setImageError(true); setImageLoaded(true); }}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestseller && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
                New
              </span>
            )}
            {product.isLimited && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
                Limited
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ backgroundColor: '#DC2626', color: '#FFF' }}>
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 font-semibold text-sm uppercase tracking-wider rounded-full transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {product.name}
            </h3>
            <span className="text-base font-bold" style={{ color: 'var(--gold-primary)' }}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          <p className="text-xs mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {product.shortDescription || product.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
              {product.volume}
            </span>
            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
              {product.concentration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
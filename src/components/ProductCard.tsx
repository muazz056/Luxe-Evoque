'use client';

import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useProductModal } from './ProductModalContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { addToCart } = useCart();
  const { openModal } = useProductModal();

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  const handleCardClick = () => {
    openModal(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#1A1A1A" width="400" height="300"/>
      <text fill="#C6A96B" font-family="Georgia, serif" font-size="24" x="50%" y="50%" text-anchor="middle" dy=".3em">${product.name}</text>
    </svg>
  `)}`;

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-700 cursor-pointer card ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
      onClick={handleCardClick}
    >
      <div className="overflow-hidden rounded-3xl">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-transparent">
          {/* Skeleton loader */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 skeleton rounded-t-3xl" />
          )}

          {/* Product Image */}
          <img
            ref={imgRef}
            src={imageError ? placeholderImage : product.images[0]}
            alt={product.name}
            className={`w-full h-full object-contain transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestseller && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gold text-bgPrimary rounded-full shadow-soft">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-bgCard text-text-primary border border-border rounded-full">
                New
              </span>
            )}
            {product.isLimited && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-900 text-cream rounded-full">
                Limited Edition
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary/90 via-bgPrimary/20 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100">
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-gold text-bgPrimary text-sm font-bold uppercase tracking-wider rounded-full shadow-soft hover:bg-gold-hover transition-all transform hover:-translate-y-0.5"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-bgCard border-t border-border">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="heading-sm text-text-primary group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-gold flex-shrink-0">
              ${product.price}
            </span>
          </div>
          
          <p className="body-sm text-text-muted mb-4 line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-text-muted">
            <span className="px-2 py-1 bg-bgPrimary/50 border border-border/50 rounded">
              {product.volume}
            </span>
            <span className="px-2 py-1 bg-bgPrimary/50 border border-border/50 rounded">
              {product.concentration}
            </span>
            <span className="px-2 py-1 bg-bgPrimary/50 border border-border/50 rounded">
              {product.intensity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
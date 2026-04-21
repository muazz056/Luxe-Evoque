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
      className="group relative transition-all duration-700 cursor-pointer"
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-2xl" style={{
        background: 'rgba(26, 22, 20, 0.6)',
        border: '1px solid rgba(198, 169, 107, 0.1)',
      }}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden flex items-center justify-center p-6" style={{ background: 'transparent' }}>
          {/* Product Image */}
          <img
            ref={imgRef}
            src={imageError ? placeholderImage : product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestseller && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: '#C6A96B', color: '#0D0B0A' }}>
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: 'rgba(198, 169, 107, 0.2)', color: '#C6A96B', border: '1px solid rgba(198, 169, 107, 0.3)' }}>
                New
              </span>
            )}
            {product.isLimited && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: 'rgba(180, 120, 60, 0.2)', color: '#E5D3A5' }}>
                Limited
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: 'rgba(220, 38, 38, 0.8)', color: '#fff' }}>
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(13, 11, 10, 0.7)' }}>
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 font-semibold text-sm uppercase tracking-wider rounded-full transition-transform hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #C6A96B 0%, #B8956A 100%)',
                color: '#0D0B0A',
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(198, 169, 107, 0.1)' }}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-semibold transition-colors duration-300"
              style={{ color: '#FAF8F5' }}>
              {product.name}
            </h3>
            <span className="text-base font-bold" style={{ color: '#C6A96B' }}>
              {formatPrice(product.price)}
            </span>
          </div>
          
          <p className="text-xs mb-4 line-clamp-2" style={{ color: 'rgba(250, 248, 245, 0.5)' }}>
            {product.shortDescription || product.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
            <span className="px-2 py-1 rounded" style={{ background: 'rgba(198, 169, 107, 0.1)', color: 'rgba(250, 248, 245, 0.6)' }}>
              {product.volume}
            </span>
            <span className="px-2 py-1 rounded" style={{ background: 'rgba(198, 169, 107, 0.1)', color: 'rgba(250, 248, 245, 0.6)' }}>
              {product.concentration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
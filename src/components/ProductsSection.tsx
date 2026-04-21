'use client';

import { useState, useEffect } from 'react';
import { PRODUCTS, PERFUME_CATEGORIES } from '@/lib/constants';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('products-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filteredProducts = PRODUCTS.filter(product => {
    return activeCategory === 'all' || product.categories.includes(activeCategory as any);
  });

  return (
    <section id="products-section" className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4" 
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Premium Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Luxury Fragrances
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Discover our curated collection of exquisite scents.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {PERFUME_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: activeCategory === category.id ? 'var(--gold-primary)' : 'transparent',
                  border: '1px solid ' + (activeCategory === category.id ? 'transparent' : 'var(--border-color)'),
                  color: activeCategory === category.id ? '#000' : 'var(--text-muted)',
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            No products found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
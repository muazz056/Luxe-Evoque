'use client';

import { useState, useEffect } from 'react';
import { PRODUCTS, PERFUME_CATEGORIES } from '@/lib/constants';
import { useProductModal } from './ProductModalContext';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const { openModal } = useProductModal();

  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('products-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Filter products
  const filteredProducts = PRODUCTS.filter(product => {
    return activeCategory === 'all' || product.categories.includes(activeCategory as any);
  });

  return (
    <section id="products-section" className="section bg-bgPrimary">
      <div className="container-custom">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-gold mb-3 block">
            Our Collection
          </span>
          <h2 className="heading-lg text-text-primary mb-4">
            Luxury Fragrances
          </h2>
          <p className="body-lg text-text-muted max-w-2xl mx-auto">
            Discover our curated collection of premium perfumes, each crafted with the finest ingredients from around the world.
          </p>
        </div>

        {/* Filters */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 text-center">
              Collections
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {PERFUME_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gold text-bgPrimary shadow-soft'
                      : 'bg-bgCard/50 border border-border text-text-muted hover:text-text-primary hover:border-gold/50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="transition-all duration-700"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="body-lg text-text-muted">
                No perfumes match your selected filters.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-6 py-3 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors text-sm font-medium border border-gold/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
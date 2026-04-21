'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { PRODUCTS } from '@/lib/constants';
import { useProductModal } from './ProductModalContext';

export default function CTASection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const { openModal } = useProductModal();

  const handleShopClick = () => {
    const product = PRODUCTS.find(p => p.categories.includes('luxury'));
    if (product) openModal(product);
  };

  const handleCollectionClick = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cta" className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(218, 165, 32, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="container-custom relative z-10">
        <div ref={ref} className="max-w-3xl mx-auto text-center"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(10px)', transition: 'all 1s ease' }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Your signature scent is{' '}
            <span style={{ color: 'var(--gold-primary)' }}>just one click</span> away.
          </h2>

          <p className="text-base md:text-lg mb-10" style={{ color: 'var(--text-muted)' }}>
            Discover luxury fragrances crafted with the finest ingredients. Order now and redefine your presence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleShopClick}
              className="px-10 py-4 text-base font-semibold uppercase tracking-wider rounded-full transition-all hover:opacity-90 hover:-translate-y-1"
              style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
              Shop Luxury
            </button>

            <button onClick={handleCollectionClick}
              className="px-8 py-4 text-base font-semibold uppercase tracking-wider rounded-full transition-all hover:opacity-90"
              style={{ border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)' }}>
              View Collections
            </button>

            <a href="https://wa.me/923297189301?text=Hello! I'm interested in your luxury perfumes."
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 text-base font-semibold uppercase tracking-wider rounded-full transition-all hover:opacity-90"
              style={{ border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)' }}>
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
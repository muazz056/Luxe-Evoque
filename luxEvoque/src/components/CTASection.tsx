'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { PRODUCTS } from '@/lib/constants';
import { useProductModal } from './ProductModalContext';

export default function CTASection() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  const { openModal } = useProductModal();

  const handleShopClick = () => {
    const product = PRODUCTS.find(p => p.categories.includes('luxury'));
    if (product) {
      openModal(product);
    }
  };

  const handleCollectionClick = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta"
      className="section bg-bgPrimary relative overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bgPrimary via-bgSecondary to-bgCard" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-soft delay-500" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Headline */}
          <h2 className="heading-lg text-text-primary mb-6">
            Your signature scent is{' '}
            <span className="text-gradient-gold">just one click</span> away.
          </h2>

          {/* Subtext */}
          <p className={`body-lg text-text-muted mb-10 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Discover luxury fragrances crafted with the finest ingredients. 
            Order now and redefine your presence with a scent that tells your story.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            {/* Primary CTA */}
            <button
              onClick={handleShopClick}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold uppercase tracking-wider bg-gold text-bgPrimary rounded-full transition-all duration-300 hover:bg-gold-hover hover:shadow-glow hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bgPrimary"
            >
              <span className="flex items-center gap-2">
                Shop Luxury
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            {/* Secondary CTAs */}
            <button
              onClick={handleCollectionClick}
              className="group inline-flex items-center justify-center px-8 py-5 text-base font-semibold uppercase tracking-wider bg-transparent text-text-primary border-2 border-gold/50 rounded-full transition-all duration-300 hover:bg-gold/10 hover:border-gold hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bgPrimary"
            >
              <span className="flex items-center gap-2">
                View Collections
              </span>
            </button>

            <a
              href="https://wa.me/923297189301?text=Hello! I'm interested in your luxury perfumes."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-5 text-base font-semibold uppercase tracking-wider bg-transparent text-text-primary border-2 border-gold/50 rounded-full transition-all duration-300 hover:bg-gold/10 hover:border-gold hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bgPrimary"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Inquiry
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
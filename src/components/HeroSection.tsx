'use client';

import { useRouter } from 'next/navigation';
import { useProductModal } from './ProductModalContext';
import { PRODUCTS } from '@/lib/constants';
import { trackProductClick } from '@/lib/shopify';

export default function HeroSection() {
  const router = useRouter();
  const { openModal } = useProductModal();

  const handleShopNow = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#products-section');
    }
  };

  const handleOrderClick = (productId: string) => {
    trackProductClick(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      openModal(product);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0" style={{ opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(218, 165, 32, 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(218, 165, 32, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10" style={{ 
            backgroundColor: 'var(--gold-highlight)', 
            border: '1px solid var(--gold-primary)',
          }}>
            <svg className="w-4 h-4" style={{ color: 'var(--gold-primary)' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--gold-primary)' }}>
              Luxury Parfums
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
            <span className="block font-light">Find Your</span>
            <span className="block font-bold" style={{ color: 'var(--gold-primary)' }}>
              Signature Scent
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg max-w-xl mx-auto mb-12" style={{ color: 'var(--text-muted)' }}>
            Discover our curated collection of exquisite fragrances. Each scent tells a story of luxury and elegance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShopNow}
              className="px-10 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px]"
              style={{ 
                backgroundColor: 'var(--gold-primary)',
                color: '#000',
                boxShadow: '0 10px 40px -10px rgba(218, 165, 32, 0.3)',
              }}
            >
              Shop Collection
            </button>
            
            <button
              onClick={() => handleOrderClick('glory')}
              className="px-10 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px]"
              style={{ 
                border: '1px solid var(--gold-primary)',
                color: 'var(--gold-primary)',
              }}
            >
              View Bestsellers
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border flex justify-center pt-2" style={{ borderColor: 'var(--gold-primary)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--gold-primary)', animation: 'bounce 2s infinite' }} />
        </div>
      </div>
    </section>
  );
}
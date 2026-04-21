'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { BRAND_PROMISES } from '@/lib/constants';

const icons = {
  hands: <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M24 8c-4 0-6 2-6 6v8c0 2-2 4-4 4s-4-2-4-4v-4c0-2 2-4 4-4"/><path strokeLinecap="round" strokeLinejoin="round" d="M24 8c4 0 6 2 6 6v8c0 2 2 4 4 4s4-2 4-4v-4c0-2-2-4-4-4"/><path strokeLinecap="round" strokeLinejoin="round" d="M18 22v14c0 2 2 4 6 4s6-2 6-4V22"/></svg>,
  leaf: <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 36c0-12 12-24 24-24C36 24 24 36 12 36z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 36c6-6 12-12 24-24"/></svg>,
  crown: <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 36l6-18 8 12 8-12 8 12 6-18v16H8z"/></svg>,
  star: <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M24 6l5 12h13l-11 8 4 13-11-8-11 8 4-13-11-8h13z"/></svg>,
};

export default function BrandPromiseSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });

  return (
    <section id="about" className="py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-custom">
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'none' : 'translateY(8px)', transition: 'all 0.7s ease' }}>
          <span className="inline-block font-medium uppercase tracking-wider text-sm mb-4" style={{ color: 'var(--gold-primary)' }}>Our Promise</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>What Makes Us Special</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BRAND_PROMISES.map((promise, index) => (
            <PromiseCard key={promise.title} promise={promise} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseCard({ promise, index }: { promise: typeof BRAND_PROMISES[number]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3, freezeOnceVisible: true });

  return (
    <div ref={ref} className="text-center p-8 rounded-2xl transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(10px)',
        transitionDelay: `${index * 200}ms`,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}>
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ color: 'var(--gold-primary)', backgroundColor: 'var(--gold-highlight)' }}>
        {icons[promise.icon as keyof typeof icons]}
      </div>
      <h3 className="font-serif text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{promise.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{promise.description}</p>
    </div>
  );
}
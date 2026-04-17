'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { BRAND_PROMISES } from '@/lib/constants';

// Icon components
const icons = {
  hands: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 8c-4 0-6 2-6 6v8c0 2-2 4-4 4s-4-2-4-4v-4c0-2 2-4 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 8c4 0 6 2 6 6v8c0 2 2 4 4 4s4-2 4-4v-4c0-2-2-4-4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 22v14c0 2 2 4 6 4s6-2 6-4V22" />
    </svg>
  ),
  leaf: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 36c0-12 12-24 24-24C36 24 24 36 12 36z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 36c6-6 12-12 24-24" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 32c-2.5 0-5-1-6-4" />
    </svg>
  ),
  heart: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 40s-12-8-16-16c-2-4-1-10 4-12s8 0 10 4l2 4 2-4c2-4 5-6 10-4s6 8 4 12c-4 8-16 16-16 16z" />
    </svg>
  ),
};

export default function BrandPromiseSection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  return (
<section id="about" className="section bg-bgPrimary overflow-hidden">
  <div className="container-custom">
    {/* Section Header */}
    <div
      ref={headerRef}
      className={`text-center mb-16 transition-all duration-700 ${
        headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <span className="inline-block text-gold font-medium uppercase tracking-wider text-sm mb-4">
        Our Promise
      </span>
      <h2 className="heading-lg text-text-primary mb-4">
        What Makes Us Special
      </h2>
      <div className="line-decoration mx-auto" />
    </div>

    {/* Promise Cards */}
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      {BRAND_PROMISES.map((promise, index) => (
        <PromiseCard
          key={promise.title}
          promise={promise}
          index={index}
        />
      ))}
    </div>
  </div>
</section>
  );
}

interface PromiseCardProps {
  promise: (typeof BRAND_PROMISES)[number];
  index: number;
}

function PromiseCard({ promise, index }: PromiseCardProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  return (
    <div
      ref={ref}
      className={`text-center p-8 rounded-3xl bg-bgCard/50 dark:bg-bgCard/50 transition-all duration-700 card-hover ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 text-gold mb-6 animate-pulse-soft">
        {icons[promise.icon as keyof typeof icons]}
      </div>

      {/* Content */}
      <h3 className="heading-sm text-text-primary mb-3">
        {promise.title}
      </h3>
      <p className="body-md text-text-muted">
        {promise.description}
      </p>
    </div>
  );
}
'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { STORY_STEPS } from '@/lib/constants';

export default function ScrollStorySection() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  return (
    <section id="story" className="py-20 md:py-32 bg-bgPrimary">
      <div className="container-custom">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold font-medium uppercase tracking-wider text-sm mb-4">
            Our Process
          </span>
          <h2 className="heading-lg text-text-primary mb-4">
            Our Story
          </h2>
          <div className="line-decoration mx-auto mb-6" />
          <p className="body-lg text-text-muted max-w-2xl mx-auto">
            From carefully selected ingredients to the final golden finish,
            every step is crafted with passion and precision.
          </p>
        </div>

        {/* Story Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORY_STEPS.map((step, index) => (
            <StoryCard
              key={step.id}
              step={step}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StoryCardProps {
  step: (typeof STORY_STEPS)[number];
  index: number;
}

function StoryCard({ step, index }: StoryCardProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  // Icons for each step
  const icons = [
    // Oven icon
    <svg key="oven" className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <rect x="8" y="12" width="32" height="28" rx="2" />
      <rect x="12" y="20" width="24" height="16" rx="1" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="24" cy="16" r="2" />
      <circle cx="32" cy="16" r="2" />
      <line x1="12" y1="28" x2="36" y2="28" />
    </svg>,
    // Hands icon
    <svg key="hands" className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <path d="M24 8c-4 0-6 2-6 6v8c0 2-2 4-4 4s-4-2-4-4v-4c0-2 2-4 4-4" />
      <path d="M24 8c4 0 6 2 6 6v8c0 2 2 4 4 4s4-2 4-4v-4c0-2-2-4-4-4" />
      <path d="M18 22v14c0 2 2 4 6 4s6-2 6-4V22" />
    </svg>,
    // Fire/Heat icon
    <svg key="heat" className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <path d="M24 4c0 8-8 12-8 20 0 6 4 10 8 10s8-4 8-10c0-8-8-12-8-20z" />
      <path d="M24 20c0 4-4 6-4 10 0 3 2 4 4 4s4-1 4-4c0-4-4-6-4-10z" />
    </svg>,
    // Sparkle/Ready icon
    <svg key="ready" className="w-10 h-10" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.5}>
      <path d="M24 4v8M24 36v8M4 24h8M36 24h8" />
      <path d="M10 10l6 6M32 32l6 6M10 38l6-6M32 16l6-6" />
      <circle cx="24" cy="24" r="6" />
    </svg>,
  ];

  return (
    <div
      ref={ref}
      className={`text-center p-8 rounded-3xl bg-bgCard/50 dark:bg-bgCard/50 transition-all duration-700 card-hover ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Step number */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 text-gold font-serif font-bold text-xl mb-4">
        {index + 1}
      </div>
      
      {/* Icon */}
      <div className="flex justify-center text-text-primary dark:text-gold mb-4">
        {icons[index]}
      </div>

      {/* Content */}
      <h3 className="heading-sm text-text-primary mb-3">
        {step.title}
      </h3>
      <p className="body-md text-text-muted">
        {step.description}
      </p>
    </div>
  );
}
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ScrollStorySection from '@/components/ScrollStorySection';
import ProductsSection from '@/components/ProductsSection';
import BrandPromiseSection from '@/components/BrandPromiseSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Scroll container with snap points */}
      <div className="scroll-smooth">
        {/* Hero Section - Scroll-controlled animation */}
        <HeroSection />

        {/* Rest of the sections */}
        <div className="relative z-10">
          {/* Scroll Animation Storytelling Section */}
          <ScrollStorySection />

          {/* Featured Products Section */}
          <ProductsSection />

          {/* Brand Promise Section */}
          <BrandPromiseSection />

          {/* Call to Action Section */}
          <CTASection />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for easy deployment
  output: 'export',
  
  // Image optimization settings
  images: {
    unoptimized: true, // For static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Compiler options for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;

# Premium Bakery Showcase Website

A beautiful, animated bakery showcase website built with Next.js 14, React 18, and Tailwind CSS. Features scroll-driven animations, premium UI design, and seamless Shopify integration.

## Features

- **Premium Design**: Luxury bakery brand aesthetic with warm tones, elegant typography
- **Scroll Animations**: Smooth scroll-driven storytelling with frame-by-frame animations
- **Dark Mode**: Full dark mode support with chocolate-themed colors
- **Accessibility**: Reduced motion option, proper contrast ratios, keyboard navigation
- **Performance**: Optimized for Core Web Vitals (90+ Lighthouse score target)
- **Mobile First**: Responsive design with touch-friendly interactions
- **Shopify Integration**: Simple redirect links to Shopify product pages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: CSS animations + IntersectionObserver
- **Fonts**: Playfair Display (serif) + Inter (sans-serif)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind config
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── Navigation.tsx        # Fixed navigation bar
│   ├── HeroSection.tsx       # Animated hero with frame animation
│   ├── ScrollStorySection.tsx # Scroll-driven storytelling
│   ├── ProductsSection.tsx   # Featured products grid
│   ├── ProductCard.tsx       # Individual product card
│   ├── BrandPromiseSection.tsx # Brand values section
│   ├── CTASection.tsx        # Call to action section
│   ├── Footer.tsx            # Site footer
│   ├── ThemeProvider.tsx     # Dark mode context
│   └── ReducedMotionProvider.tsx # Accessibility context
├── hooks/
│   ├── useIntersectionObserver.ts # Scroll visibility hook
│   └── useFrameAnimation.ts  # Frame-based animation hook
├── lib/
│   ├── constants.ts     # Site configuration
│   └── shopify.ts       # Shopify URLs & tracking
public/
├── assets/
│   ├── animations/      # Video frame images
│   └── images/          # Product images
```

## Configuration

### Shopify URLs

Update the Shopify product URLs in `src/lib/shopify.ts`:

```typescript
export const SHOPIFY_STORE_URL = 'https://yourstore.myshopify.com';

export const SHOPIFY_PRODUCTS = {
  cupcakes: `${SHOPIFY_STORE_URL}/products/cupcakes`,
  cookies: `${SHOPIFY_STORE_URL}/products/cookies`,
  kunafa: `${SHOPIFY_STORE_URL}/products/kunafa-bar`,
};
```

### Social Links

Update social media links in the same file:

```typescript
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/yourbakery',
  whatsapp: 'https://wa.me/1234567890',
};
```

### Colors

The color palette can be customized in `tailwind.config.ts`:

- `cream` - Background colors
- `chocolate` - Primary brand color
- `gold` - Accent color
- `beige` - Secondary backgrounds

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel
```

### Netlify

```bash
npm run build
# Deploy the 'out' folder
```

### Static Export

The site is configured for static export. Run `npm run build` to generate static files in the `out` directory.

## Performance Optimizations

- Lazy loading for images below the fold
- Frame preloading for hero animation
- CSS-first animations (no heavy JS libraries)
- Skeleton loaders for async content
- Code splitting via Next.js
- Optimized fonts with `next/font`

## Accessibility

- Respects `prefers-reduced-motion` system setting
- Manual reduced motion toggle in navigation
- Proper color contrast ratios
- Semantic HTML structure
- Keyboard navigation support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Feel free to use for your bakery!

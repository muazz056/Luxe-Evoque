import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ReducedMotionProvider } from '@/components/ReducedMotionProvider';
import { ProductModalProvider } from '@/components/ProductModalContext';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Nabia's Eatry | Freshly Baked. Perfectly Crafted.",
  description: 'Discover our handcrafted premium cupcakes, cookies, and signature kunafa chocolate bars. Made with fresh ingredients and baked with love.',
  keywords: ['bakery', 'cupcakes', 'cookies', 'kunafa', 'chocolate', 'premium desserts', 'handcrafted', "nabia's eatry"],
  authors: [{ name: "Nabia's Eatry" }],
  creator: "Nabia's Eatry",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-bakery.com',
    siteName: "Nabia's Eatry",
    title: "Nabia's Eatry | Freshly Baked. Perfectly Crafted.",
    description: 'Discover our handcrafted premium cupcakes, cookies, and signature kunafa chocolate bars.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Nabia's Eatry - Freshly Baked Desserts",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nabia's Eatry | Freshly Baked. Perfectly Crafted.",
    description: 'Discover our handcrafted premium cupcakes, cookies, and signature kunafa chocolate bars.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FEF9E7' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1107' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/assets/animations/ezgif-frame-001.jpg"
          as="image"
          type="image/jpeg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ReducedMotionProvider>
            <AuthProvider>
              <CartProvider>
                <ProductModalProvider>
                  {children}
                </ProductModalProvider>
              </CartProvider>
            </AuthProvider>
          </ReducedMotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

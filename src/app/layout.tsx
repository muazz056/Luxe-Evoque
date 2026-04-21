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
  title: "Luxe Evoque | Premium Perfumes",
  description: 'Discover our curated collection of luxury fragrances. From elegant floral scents to bold oud perfumes, find your perfect signature scent.',
  keywords: ['perfume', 'fragrance', 'luxury perfume', 'designer scents', 'oud', 'eau de parfum', 'signature scent'],
  authors: [{ name: "Luxe Evoque" }],
  creator: "Luxe Evoque",
  icons: {
    icon: '/assets/images/logo.png',
    apple: '/assets/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luxe-evoque.com',
    siteName: "Luxe Evoque",
    title: "Luxe Evoque | Premium Perfumes",
    description: 'Discover our curated collection of luxury fragrances.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Luxe Evoque - Premium Fragrances",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luxe Evoque | Premium Perfumes",
    description: 'Discover our curated collection of luxury fragrances.',
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
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0B0A' },
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
        {/* <link
          rel="preload"
          href="/assets/animations/ezgif-frame-001.jpg"
          as="image"
          type="image/jpeg"
        /> */}
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

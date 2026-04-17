// WhatsApp order links
export const WHATSAPP_NUMBER = '923297189301';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// WhatsApp message template for perfume orders
const PERFUME_ORDER_MESSAGE = `Assalam o Alaikum! *I'd like to order from Luxe Evoque!*

*Order Details:*
Product: 
Quantity: 

*Customer Information:*
Name: 
Phone: 
Address: 

Payment: Cash on Delivery
Notes: 

JazakAllah!`;

export const PERFUME_WHATSAPP_LINK = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(PERFUME_ORDER_MESSAGE)}`;

// Social media links for Luxe Evoque
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/luxeevoque/',
  whatsapp: PERFUME_WHATSAPP_LINK,
  facebook: 'https://facebook.com/luxeevoque',
  twitter: 'https://twitter.com/luxeevoque',
} as const;

// Track click events (placeholder for analytics)
export function trackProductClick(productName: string) {
  // Implement your analytics tracking here
  // Example: Google Analytics, Mixpanel, etc.
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'click', {
      event_category: 'product',
      event_label: productName,
    });
  }
  
  console.log(`Product clicked: ${productName}`);
}

export function trackCTAClick(ctaName: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'click', {
      event_category: 'cta',
      event_label: ctaName,
    });
  }
  
  console.log(`CTA clicked: ${ctaName}`);
}
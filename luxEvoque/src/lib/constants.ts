// WhatsApp configuration
export const WHATSAPP_NUMBER = '923297189301';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Perfume categories
export const PERFUME_CATEGORIES = [
  { id: 'all', label: 'All Perfumes' },
  { id: 'men', label: 'For Men' },
  { id: 'women', label: 'For Women' },
  { id: 'arabic', label: 'Arabic' },
  { id: 'unisex', label: 'Unisex' },
  { id: 'luxury', label: 'Luxury Collection' },
] as const;

// Scent profiles for user preferences
export const SCENT_PROFILES = [
  { id: 'woody', label: 'Woody' },
  { id: 'oud', label: 'Oud' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'sweet', label: 'Sweet' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'floral', label: 'Floral' },
  { id: 'citrus', label: 'Citrus' },
  { id: 'oriental', label: 'Oriental' },
] as const;

// Fragrance note examples
export const FRAGRANCE_NOTES = {
  top: [
    'Bergamot', 'Lemon', 'Orange', 'Pink Pepper', 'Cardamom', 'Saffron', 'Aldehydes', 'Fig', 'Apple', 'Pear'
  ],
  heart: [
    'Rose', 'Jasmine', 'Lavender', 'Cinnamon', 'Clove', 'Nutmeg', 'Iris', 'Orchid', 'Tuberose', 'Ylang-Ylang'
  ],
  base: [
    'Sandalwood', 'Cedarwood', 'Patchouli', 'Vanilla', 'Amber', 'Musk', 'Oud', 'Leather', 'Tobacco', 'Tonka Bean'
  ],
};

// Navigation items
export interface NavItem {
  label: string;
  href: string;
  isPrimary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Collections', href: '#products-section' },
  { label: 'Shop', href: '#products-section' },
  { label: 'About', href: '#story' },
];

// Brand promises
export const BRAND_PROMISES = [
  {
    title: 'Rare Ingredients',
    description: 'Sourced from the finest origins worldwide',
    icon: 'leaf',
  },
  {
    title: 'Master Craftsmanship',
    description: 'Blended by expert perfumers with decades of experience',
    icon: 'hands',
  },
  {
    title: 'Timeless Elegance',
    description: 'Fragrances that transcend trends and seasons',
    icon: 'crown',
  },
  {
    title: 'Pure Luxury',
    description: 'An unforgettable sensory experience',
    icon: 'star',
  },
] as const;

// Scroll animation storytelling steps
export const STORY_STEPS = [
  {
    id: 'step1',
    title: 'The Essence Awaits',
    description: 'Our journey begins with the finest raw materials',
    frameRange: [0, 71],
  },
  {
    id: 'step2',
    title: 'Crafted by Masters',
    description: 'Expert hands blend each fragrance with precision',
    frameRange: [72, 142],
  },
  {
    id: 'step3',
    title: 'The Magic Happens',
    description: 'Alchemy transforms ingredients into liquid gold',
    frameRange: [143, 213],
  },
  {
    id: 'step4',
    title: 'Ready to Define You',
    description: 'A signature scent that tells your story',
    frameRange: [214, 284],
  },
] as const;

// Price range for filters
export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $200', min: 150, max: 200 },
  { label: '$200 - $300', min: 200, max: 300 },
  { label: 'Over $300', min: 300, max: Infinity },
] as const;

// Social media links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/luxeevoque/',
  whatsapp: `${WHATSAPP_BASE_URL}?text=Hello! I'm interested in your luxury perfumes.`,
  facebook: 'https://facebook.com/luxeevoque',
  twitter: 'https://twitter.com/luxeevoque',
} as const;

// Re-export products from centralized config
export {
  PRODUCTS,
  getProductById,
  getProductsByCategory,
  getProductsByScentProfile,
  getBestsellers,
  getNewArrivals,
  getLimitedEdition,
  formatPrice,
  calculateDiscount,
} from '@/config/products';
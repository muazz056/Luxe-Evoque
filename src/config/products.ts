/**
 * ========================================================================
 * CENTRALIZED PRODUCT CONFIGURATION FILE
 * ========================================================================
 * 
 * Update all product data here to reflect across the entire website.
 * This includes: prices, images, categories, descriptions, notes, etc.
 * 
 * HOW TO UPDATE:
 * 1. Find the product by ID
 * 2. Update any field you need
 * 3. Categories array can include: 'men', 'women', 'arabic', 'unisex', 'luxury'
 * 4. Images array supports multiple images per product
 * 5. All prices are in USD
 * 
 * ========================================================================
 */

import type { Product, FragranceNote } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'glory',
    name: 'Glory',
    description: 'A majestic blend of rare oud and golden amber',
    fullDescription: 'Glory is our signature masterpiece, blending the finest Arabian oud with warm amber and precious spices. This luxurious fragrance commands attention and leaves an unforgettable impression. Crafted for those who seek excellence and appreciate the art of perfumery.',
    shortDescription: 'Majestic oud and amber blend',
    images: [
      '/assets/images/perfume-placeholder.svg',
      '/assets/images/glory-2.jpg',
      '/assets/images/glory-3.jpg',
    ],
    categories: ['luxury', 'arabic', 'unisex'],
    subcategory: 'oud',
    price: 250,
    originalPrice: 300,
    discount: 17,
    volume: '100ml',
    concentration: 'Parfum',
    intensity: 'Strong',
    topNotes: [
      { name: 'Saffron', description: 'Luxurious and exotic spice' },
      { name: 'Bergamot', description: 'Fresh citrus with a spicy edge' },
      { name: 'Pink Pepper', description: 'Subtle spicy warmth' },
    ],
    heartNotes: [
      { name: 'Rose', description: 'Elegant floral heart' },
      { name: 'Jasmine', description: 'Rich and intoxicating' },
      { name: 'Oud', description: 'Rare and precious wood' },
    ],
    baseNotes: [
      { name: 'Sandalwood', description: 'Creamy and smooth' },
      { name: 'Amber', description: 'Warm and golden' },
      { name: 'Musk', description: 'Sensual and lasting' },
    ],
    ingredients: ['Alcohol', 'Fragrance Oils', 'Natural Essential Oils'],
    isBestseller: true,
    inStock: true,
    stockCount: 50,
  },
  {
    id: 'noir-essence',
    name: 'Noir Essence',
    description: 'Mysterious and sophisticated dark woody fragrance',
    fullDescription: 'Noir Essence embodies the allure of the night. A sophisticated blend of black woods, smoky incense, and dark chocolate creates an enigmatic presence. Perfect for evening events and special occasions where you want to make a bold statement.',
    shortDescription: 'Dark woody mystery',
    images: [
      '/assets/images/perfume-placeholder.svg',
      '/assets/images/noir-essence-2.jpg',
    ],
    categories: ['men', 'luxury'],
    subcategory: 'woody',
    price: 180,
    volume: '100ml',
    concentration: 'Eau de Parfum',
    intensity: 'Strong',
    topNotes: [
      { name: 'Black Pepper', description: 'Spicy and sharp' },
      { name: 'Cardamom', description: 'Warm and aromatic' },
      { name: 'Fig', description: 'Sweet and mysterious' },
    ],
    heartNotes: [
      { name: 'Cedarwood', description: 'Dry and masculine' },
      { name: 'Leather', description: 'Rich and rugged' },
      { name: 'Tobacco', description: 'Smoky and sophisticated' },
    ],
    baseNotes: [
      { name: 'Patchouli', description: 'Earthy and deep' },
      { name: 'Vanilla', description: 'Sweet and creamy' },
      { name: 'Musk', description: 'Sensual and warm' },
    ],
    ingredients: ['Alcohol', 'Fragrance Oils', 'Natural Extracts'],
    isNew: true,
    inStock: true,
    stockCount: 35,
  },
  {
    id: 'velvet-oud',
    name: 'Velvet Oud',
    description: 'Luxurious Arabian oud with floral elegance',
    fullDescription: 'Velvet Oud is a tribute to Arabian perfumery tradition. The finest oud oil is blended with delicate rose and jasmine, creating a velvety smooth experience. This masterpiece balances the intensity of oud with the softness of precious florals.',
    shortDescription: 'Arabian oud with floral grace',
    images: [
      '/assets/images/perfume-placeholder.svg',
      '/assets/images/velvet-oud-2.jpg',
    ],
    categories: ['arabic', 'luxury', 'women'],
    subcategory: 'oud',
    price: 320,
    originalPrice: 380,
    discount: 16,
    volume: '50ml',
    concentration: 'Oud',
    intensity: 'Strong',
    topNotes: [
      { name: 'Saffron', description: 'Golden and opulent' },
      { name: 'Rose', description: 'Classic and romantic' },
      { name: 'Aldehydes', description: 'Sparkling and bright' },
    ],
    heartNotes: [
      { name: 'Oud', description: 'Rare and precious' },
      { name: 'Jasmine', description: 'Exotic and rich' },
      { name: 'Iris', description: 'Elegant and powdery' },
    ],
    baseNotes: [
      { name: 'Sandalwood', description: 'Creamy and soft' },
      { name: 'Amber', description: 'Warm and golden' },
      { name: 'Tonka Bean', description: 'Sweet and comforting' },
    ],
    ingredients: ['Oud Oil', 'Rose Absolute', 'Alcohol', 'Natural Oils'],
    isLimited: true,
    inStock: true,
    stockCount: 20,
  },
  {
    id: 'royal-amber',
    name: 'Royal Amber',
    description: 'Regal amber and oriental spices masterpiece',
    fullDescription: 'Royal Amber captures the essence of royalty. A rich composition of golden amber, oriental spices, and precious woods creates a commanding presence. This fragrance is for those who lead and inspire, leaving a trail of elegance and power.',
    shortDescription: 'Golden amber royalty',
    images: [
      '/assets/images/perfume-placeholder.svg',
    ],
    categories: ['luxury', 'men', 'unisex'],
    subcategory: 'oriental',
    price: 220,
    volume: '100ml',
    concentration: 'Parfum',
    intensity: 'Strong',
    topNotes: [
      { name: 'Cinnamon', description: 'Warm and spicy' },
      { name: 'Cardamom', description: 'Aromatic and fresh' },
      { name: 'Orange', description: 'Bright and uplifting' },
    ],
    heartNotes: [
      { name: 'Amber', description: 'Golden and warm' },
      { name: 'Lavender', description: 'Herbal and refined' },
      { name: 'Clove', description: 'Intense and spicy' },
    ],
    baseNotes: [
      { name: 'Vanilla', description: 'Sweet and creamy' },
      { name: 'Sandalwood', description: 'Smooth and woody' },
      { name: 'Tonka Bean', description: 'Warm and nutty' },
    ],
    ingredients: ['Amber Accord', 'Spice Oils', 'Alcohol', 'Natural Extracts'],
    isBestseller: true,
    inStock: true,
    stockCount: 45,
  },
  {
    id: 'midnight-musk',
    name: 'Midnight Musk',
    description: 'Deep mysterious musk with modern sophistication',
    fullDescription: 'Midnight Musk is an intoxicating blend of dark musks, sensual woods, and a touch of sweetness. Designed for the modern individual who embraces mystery and confidence. This fragrance evolves beautifully throughout the night, revealing its complex layers.',
    shortDescription: 'Deep sensual musk',
    images: [
      '/assets/images/perfume-placeholder.svg',
    ],
    categories: ['unisex', 'men', 'women'],
    subcategory: 'woody',
    price: 160,
    volume: '100ml',
    concentration: 'Eau de Parfum',
    intensity: 'Moderate',
    topNotes: [
      { name: 'Aldehydes', description: 'Clean and modern' },
      { name: 'Pear', description: 'Fresh and juicy' },
      { name: 'Pink Pepper', description: 'Subtle spice' },
    ],
    heartNotes: [
      { name: 'Musk', description: 'Sensual and warm' },
      { name: 'Iris', description: 'Elegant and powdery' },
      { name: 'Lavender', description: 'Calming and fresh' },
    ],
    baseNotes: [
      { name: 'Cedarwood', description: 'Dry and woody' },
      { name: 'Patchouli', description: 'Earthy and deep' },
      { name: 'Vanilla', description: 'Sweet and comforting' },
    ],
    ingredients: ['Musk Accord', 'Woodsy Oils', 'Alcohol', 'Natural Extracts'],
    inStock: true,
    stockCount: 60,
  },
  {
    id: 'arabian-nights',
    name: 'Arabian Nights',
    description: 'Authentic Arabic perfume with rich oud and spices',
    fullDescription: 'Arabian Nights transports you to the heart of the Middle East. An authentic blend of aged oud, precious rose, and traditional spices creates an unforgettable olfactory journey. This perfume honors centuries of Arabian perfumery heritage.',
    shortDescription: 'Traditional Arabic blend',
    images: [
      '/assets/images/perfume-placeholder.svg',
    ],
    categories: ['arabic', 'luxury'],
    subcategory: 'oud',
    price: 280,
    volume: '50ml',
    concentration: 'Oud',
    intensity: 'Strong',
    topNotes: [
      { name: 'Saffron', description: 'Luxurious spice' },
      { name: 'Cardamom', description: 'Aromatic and warm' },
      { name: 'Fig', description: 'Sweet and lush' },
    ],
    heartNotes: [
      { name: 'Oud', description: 'Deep and complex' },
      { name: 'Rose', description: 'Romantic and rich' },
      { name: 'Jasmine', description: 'Exotic and floral' },
    ],
    baseNotes: [
      { name: 'Amber', description: 'Golden and warm' },
      { name: 'Sandalwood', description: 'Creamy and smooth' },
      { name: 'Musk', description: 'Sensual and lasting' },
    ],
    ingredients: ['Aged Oud', 'Rose Absolute', 'Traditional Spices', 'Alcohol'],
    isLimited: true,
    inStock: true,
    stockCount: 15,
  },
  {
    id: 'citrus-sunrise',
    name: 'Citrus Sunrise',
    description: 'Fresh and uplifting citrus blend for everyday wear',
    fullDescription: 'Citrus Sunrise is a refreshing burst of energy. Bright citrus notes dance with aromatic herbs and a touch of floral sweetness. Perfect for daytime wear, this light and uplifting fragrance brings optimism and joy to every moment.',
    shortDescription: 'Fresh citrus energy',
    images: [
      '/assets/images/perfume-placeholder.svg',
    ],
    categories: ['women', 'unisex'],
    subcategory: 'citrus',
    price: 120,
    volume: '100ml',
    concentration: 'Eau de Toilette',
    intensity: 'Light',
    topNotes: [
      { name: 'Lemon', description: 'Zesty and bright' },
      { name: 'Orange', description: 'Sweet and juicy' },
      { name: 'Bergamot', description: 'Fresh and elegant' },
    ],
    heartNotes: [
      { name: 'Lavender', description: 'Calming and fresh' },
      { name: 'Rosemary', description: 'Herbal and invigorating' },
      { name: 'Jasmine', description: 'Light and floral' },
    ],
    baseNotes: [
      { name: 'Cedarwood', description: 'Light and woody' },
      { name: 'Musk', description: 'Soft and clean' },
      { name: 'Amber', description: 'Warm and subtle' },
    ],
    ingredients: ['Citrus Oils', 'Herbal Extracts', 'Alcohol', 'Natural Oils'],
    isNew: true,
    inStock: true,
    stockCount: 80,
  },
  {
    id: 'sweet-oriental',
    name: 'Sweet Oriental',
    description: 'Indulgent sweet and spicy oriental fragrance',
    fullDescription: 'Sweet Oriental is a decadent celebration of sweetness and spice. Rich vanilla, caramel, and exotic spices create an irresistible gourmand experience. This comforting yet sophisticated fragrance is perfect for those who love sweet, warm scents with an oriental twist.',
    shortDescription: 'Gourmand sweet spice',
    images: [
      '/assets/images/perfume-placeholder.svg',
    ],
    categories: ['women', 'arabic'],
    subcategory: 'sweet',
    price: 190,
    volume: '100ml',
    concentration: 'Eau de Parfum',
    intensity: 'Moderate',
    topNotes: [
      { name: 'Caramel', description: 'Sweet and buttery' },
      { name: 'Almond', description: 'Nutty and warm' },
      { name: 'Orange Blossom', description: 'Floral and sweet' },
    ],
    heartNotes: [
      { name: 'Vanilla', description: 'Rich and creamy' },
      { name: 'Cinnamon', description: 'Warm and spicy' },
      { name: 'Jasmine', description: 'Floral and sweet' },
    ],
    baseNotes: [
      { name: 'Tonka Bean', description: 'Warm and nutty' },
      { name: 'Sandalwood', description: 'Creamy and smooth' },
      { name: 'Musk', description: 'Sensual and soft' },
    ],
    ingredients: ['Vanilla Absolute', 'Spice Oils', 'Caramel Accord', 'Alcohol'],
    inStock: true,
    stockCount: 55,
  },
];

/**
 * ========================================================================
 * PRODUCT HELPER FUNCTIONS
 * ========================================================================
 */

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.categories.includes(category as any));
}

export function getProductsByScentProfile(profile: string): Product[] {
  return PRODUCTS.filter(p =>
    p.subcategory === profile ||
    p.topNotes.some(note => note.name.toLowerCase().includes(profile.toLowerCase())) ||
    p.heartNotes.some(note => note.name.toLowerCase().includes(profile.toLowerCase())) ||
    p.baseNotes.some(note => note.name.toLowerCase().includes(profile.toLowerCase()))
  );
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter(p => p.isBestseller);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter(p => p.isNew);
}

export function getLimitedEdition(): Product[] {
  return PRODUCTS.filter(p => p.isLimited);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}

export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

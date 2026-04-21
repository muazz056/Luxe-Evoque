import type { Product, FragranceNote } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'glory',
    name: 'Glory',
    description: 'A majestic blend of rare oud and golden amber',
    fullDescription: 'Glory is our signature masterpiece, blending the finest Arabian oud with warm amber and precious spices. This luxurious fragrance commands attention and leaves an unforgettable impression. Crafted for those who seek excellence and appreciate the art of perfumery.',
    shortDescription: 'Majestic oud and amber blend',
    images: [
      '/assets/images/GLORY - MEN.png',
    ],
    categories: ['luxury', 'men'],
    subcategory: 'oud',
    price: 4000,
    originalPrice: 4800,
    discount: 17,
    volume: '50ml',
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
    id: 'aura',
    name: 'Aura',
    description: 'Mysterious and sophisticated dark woody fragrance',
    fullDescription: 'Aura embodies the allure of the night. A sophisticated blend of black woods, smoky incense, and dark chocolate creates an enigmatic presence. Perfect for evening events and special occasions where you want to make a bold statement.',
    shortDescription: 'Dark woody mystery',
    images: [
      '/assets/images/AURA - MEN.png',
    ],
    categories: ['luxury', 'men'],
    subcategory: 'woody',
    price: 2200,
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
    id: 'faris',
    name: 'Faris',
    description: 'Luxurious Arabian oud with floral elegance',
    fullDescription: 'Faris is a tribute to Arabian perfumery tradition. The finest oud oil is blended with delicate rose and jasmine, creating a velvety smooth experience. This masterpiece balances the intensity of oud with the softness of precious florals.',
    shortDescription: 'Arabian oud with floral grace',
    images: [
      '/assets/images/FARIS - ARABIC.png',
    ],
    categories: ['luxury', 'arabic', 'unisex'],
    subcategory: 'oud',
    price: 2700,
    originalPrice: 3200,
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
    id: 'ela-nora',
    name: 'Ela Nora',
    description: 'Regal amber and oriental spices masterpiece',
    fullDescription: 'Ela Nora captures the essence of royalty. A rich composition of golden amber, oriental spices, and precious woods creates a commanding presence. This fragrance is for those who lead and inspire, leaving a trail of elegance and power.',
    shortDescription: 'Golden amber royalty',
    images: [
      '/assets/images/ELA NORA - WOMEN.png',
    ],
    categories: ['luxury', 'women'],
    subcategory: 'oriental',
    price: 3700,
    volume: '50ml',
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
    id: 'eloire',
    name: 'Eloire',
    description: 'Deep mysterious musk with modern sophistication',
    fullDescription: 'Eloire is an intoxicating blend of dark musks, sensual woods, and a touch of sweetness. Designed for the modern individual who embraces mystery and confidence. This fragrance evolves beautifully throughout the night, revealing its complex layers.',
    shortDescription: 'Deep sensual musk',
    images: [
      '/assets/images/ELOIRE - WOMEN.png',
    ],
    categories: ['luxury', 'women'],
    subcategory: 'woody',
    price: 2900,
    volume: '50ml',
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
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  if (category === 'arabic') {
    return PRODUCTS.filter(p => p.categories.includes('arabic'));
  }
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
export type PerfumeCategory = 'men' | 'women' | 'arabic' | 'unisex' | 'luxury';

export type ScentProfile = 'woody' | 'oud' | 'fresh' | 'sweet' | 'spicy' | 'floral' | 'citrus' | 'oriental';

// Product types
export interface FragranceNote {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  shortDescription?: string;
  images: string[]; // Support multiple images
  categories: PerfumeCategory[]; // Support multiple categories
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  volume: string; // e.g., "100ml", "50ml"
  concentration: string; // e.g., "Eau de Parfum", "Parfum", "Oud"
  intensity: 'Light' | 'Moderate' | 'Strong';
  topNotes: FragranceNote[];
  heartNotes: FragranceNote[];
  baseNotes: FragranceNote[];
  ingredients?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isLimited?: boolean;
  inStock: boolean;
  stockCount?: number;
}

// Cart types
export interface CartItem {
  id: string; // unique cart item ID
  productId: string;
  product: Product;
  quantity: number;
  selectedVolume?: string;
  selectedConcentration?: string;
  priceAtAdd: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// User types
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  preferredFragranceTypes: ScentProfile[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionToken: string | null;
}

// Checkout types
export interface CheckoutItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CheckoutData {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
}

// Filter types
export interface ProductFilters {
  category: PerfumeCategory;
  scentProfiles: ScentProfile[];
  priceRange: [number, number];
  intensity: string[];
  inStockOnly: boolean;
}

// Modal types
export interface ModalState {
  isOpen: boolean;
  content: 'product' | 'cart' | 'login' | 'signup' | null;
  data?: Product | null;
}

// API types (for future backend integration)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
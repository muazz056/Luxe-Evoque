'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/types';

interface ProductModalContextType {
  selectedProduct: Product | null;
  isModalOpen: boolean;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | null>(null);

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ProductModalContext.Provider value={{ selectedProduct, isModalOpen, openModal, closeModal }}>
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  const context = useContext(ProductModalContext);
  if (!context) {
    throw new Error('useProductModal must be used within a ProductModalProvider');
  }
  return context;
}

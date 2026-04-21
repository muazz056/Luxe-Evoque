'use client';

import CartContent from './CartContent';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose} />
      <div className="relative w-full max-w-md h-full shadow-2xl transform transition-transform duration-300 ease-out"
        style={{ backgroundColor: 'var(--bg-card)' }}>
        <CartContent onClose={onClose} />
      </div>
    </div>
  );
}
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
      <div className="absolute inset-0 bg-bgPrimary/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-bgCard shadow-2xl transform transition-transform duration-300 ease-out">
        <CartContent onClose={onClose} />
      </div>
    </div>
  );
}
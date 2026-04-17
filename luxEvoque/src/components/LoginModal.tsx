'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PERFUME_CATEGORIES, SCENT_PROFILES } from '@/lib/constants';
import type { ScentProfile } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setFormData({ email: '', password: '' });
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bgPrimary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 bottom-0 flex items-start sm:items-center justify-center overflow-hidden p-0 sm:p-4">
        <div className="relative w-full max-w-md mx-0 sm:mx-auto bg-bgCard border border-border shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-bgPrimary/50 hover:bg-bgPrimary/80 transition-colors"
            aria-label="Close login modal"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-border">
            <div className="text-center mb-4">
              <h2 className="heading-md text-text-primary mb-2">
                Welcome Back
              </h2>
              <p className="body-md text-text-muted">
                Sign in to your Luxe Evoque account
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 btn-gold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-bgPrimary/30 border-t-bgPrimary rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-bgCard text-text-muted">
                  New to Luxe Evoque?
                </span>
              </div>
            </div>

            {/* Signup Link */}
            <button
              onClick={() => {
                onClose();
                onSwitchToSignup();
              }}
              className="w-full py-3 border border-border/30 rounded-full text-sm font-semibold text-text-primary hover:bg-bgPrimary/10 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
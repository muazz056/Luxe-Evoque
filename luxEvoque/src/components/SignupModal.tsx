'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PERFUME_CATEGORIES, SCENT_PROFILES } from '@/lib/constants';
import type { ScentProfile } from '@/types';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    preferredFragranceTypes: [] as ScentProfile[],
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        preferredFragranceTypes: checked
          ? [...prev.preferredFragranceTypes, value as ScentProfile]
          : prev.preferredFragranceTypes.filter(t => t !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
        preferredFragranceTypes: formData.preferredFragranceTypes,
      });

      if (result.success) {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          address: '',
          city: '',
          country: '',
          postalCode: '',
          preferredFragranceTypes: [],
        });
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

  const toggleFragranceType = (type: ScentProfile) => {
    setFormData(prev => ({
      ...prev,
      preferredFragranceTypes: prev.preferredFragranceTypes.includes(type)
        ? prev.preferredFragranceTypes.filter(t => t !== type)
        : [...prev.preferredFragranceTypes, type]
    }));
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bgPrimary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 bottom-0 flex items-start sm:items-center justify-center overflow-hidden p-0 sm:p-4">
        <div className="relative w-full max-w-lg mx-0 sm:mx-auto bg-bgCard border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-bgPrimary/50 hover:bg-bgPrimary/80 transition-colors"
            aria-label="Close signup modal"
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-border">
            <div className="text-center mb-4">
              <h2 className="heading-md text-text-primary mb-2">
                Create Your Account
              </h2>
              <p className="body-md text-text-muted">
                Join Luxe Evoque and start your fragrance journey
              </p>
            </div>
          </div>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03XXXXXXXXX"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Your city"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete street address"
                  rows={2}
                  className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Country *
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Pakistan"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Postal Code *
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="Min. 6 characters"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Confirm Password *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat password"
                    className="w-full p-3 rounded-lg border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Fragrance Preferences */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                  Preferred Fragrance Types (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SCENT_PROFILES.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => toggleFragranceType(profile.id as ScentProfile)}
                      className={`p-2 text-xs rounded-lg border transition-all ${
                        formData.preferredFragranceTypes.includes(profile.id as ScentProfile)
                          ? 'border-gold bg-gold/10 dark:bg-gold/20 text-gold'
                          : 'border-border text-text-muted hover:border-gold/50'
                      }`}
                    >
                      {profile.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 btn-gold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-bgPrimary/30 border-t-bgPrimary rounded-full animate-spin" />
                ) : (
                  'Create Account'
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
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <button
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
              className="w-full py-3 border border-border/30 rounded-full text-sm font-semibold text-text-primary hover:bg-bgPrimary/10 transition-colors"
            >
              Sign In Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AuthPage() {
  const router = useRouter();
  const { user, isAuthenticated, login, signup, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
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
        router.push('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
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
        preferredFragranceTypes: [],
      });

      if (result.success) {
        router.push('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgPrimary">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-bgCard rounded-3xl border border-border shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-border">
              <div className="text-center">
                <h1 className="heading-md text-text-primary mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="body-md text-text-muted">
                  {isLogin 
                    ? 'Sign in to your Luxe Evoque account' 
                    : 'Join Luxe Evoque for exclusive fragrances'}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03XXXXXXXXX"
                      className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                        required={!isLogin}
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                        className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                        required={!isLogin}
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete delivery address"
                        rows={2}
                        className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                        required={!isLogin}
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                        Country
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Pakistan"
                        className="w-full p-3.5 rounded-xl border border-border bg-bgSecondary text-text-primary placeholder-text-muted/50 focus:border-gold focus:outline-none transition-colors"
                        required={!isLogin}
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 btn-gold text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="w-6 h-6 border-2 border-bgPrimary/30 border-t-bgPrimary rounded-full animate-spin" />
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-bgCard text-text-muted">
                    {isLogin ? 'New to Luxe Evoque?' : 'Already have an account?'}
                  </span>
                </div>
              </div>

              {/* Switch Mode */}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="w-full py-3.5 border border-border/30 rounded-full text-sm font-semibold text-text-primary hover:bg-bgPrimary/10 transition-colors"
              >
                {isLogin ? 'Create New Account' : 'Sign In Instead'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
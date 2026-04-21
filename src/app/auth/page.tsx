'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useProductModal } from '@/components/ProductModalContext';
import { PRODUCTS } from '@/lib/constants';

export default function AuthPage() {
  const router = useRouter();
  const { user, isAuthenticated, login, signup } = useAuth();
  const { openModal } = useProductModal();
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

  const handleProductClick = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      openModal(product);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0D0B0A 0%, #1A1614 50%, #0D0B0A 100%)' }}>
      <Navigation />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none" style={{ opacity: 0.05 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A96B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(198, 169, 107, 0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(198, 169, 107, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="rounded-3xl border overflow-hidden" style={{ 
            borderColor: 'rgba(198, 169, 107, 0.2)',
            background: 'rgba(13, 11, 10, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(198, 169, 107, 0.1)',
          }}>
            {/* Header */}
            <div className="p-8 text-center" style={{ borderBottom: '1px solid rgba(198, 169, 107, 0.15)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(198, 169, 107, 0.1)' }}>
                <svg className="w-4 h-4" style={{ color: '#C6A96B' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-semibold" style={{ color: '#C6A96B', letterSpacing: '0.1em' }}>LUXE EVOQUE</span>
              </div>
              <h1 className="font-serif text-2xl font-bold mb-2" style={{ color: '#FAF8F5' }}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p style={{ color: 'rgba(250, 248, 245, 0.5)' }}>
                {isLogin 
                  ? 'Sign in to continue your fragrance journey' 
                  : 'Join us for exclusive luxury scents'}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-3 rounded-lg text-sm" style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                      FULL NAME
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                      style={{ 
                        background: 'rgba(250, 248, 245, 0.05)',
                        border: '1px solid rgba(198, 169, 107, 0.2)',
                        color: '#FAF8F5',
                      }}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                    style={{ 
                      background: 'rgba(250, 248, 245, 0.05)',
                      border: '1px solid rgba(198, 169, 107, 0.2)',
                      color: '#FAF8F5',
                    }}
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                      PHONE NUMBER
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                      style={{ 
                        background: 'rgba(250, 248, 245, 0.05)',
                        border: '1px solid rgba(198, 169, 107, 0.2)',
                        color: '#FAF8F5',
                      }}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                    style={{ 
                      background: 'rgba(250, 248, 245, 0.05)',
                      border: '1px solid rgba(198, 169, 107, 0.2)',
                      color: '#FAF8F5',
                    }}
                    required
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                        CONFIRM PASSWORD
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                        style={{ 
                          background: 'rgba(250, 248, 245, 0.05)',
                          border: '1px solid rgba(198, 169, 107, 0.2)',
                          color: '#FAF8F5',
                        }}
                        required={!isLogin}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                          CITY
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                          style={{ 
                            background: 'rgba(250, 248, 245, 0.05)',
                            border: '1px solid rgba(198, 169, 107, 0.2)',
                            color: '#FAF8F5',
                          }}
                          required={!isLogin}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                          COUNTRY
                        </label>
                        <input
                          id="country"
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Pakistan"
                          className="w-full px-4 py-3 rounded-xl transition-all outline-none"
                          style={{ 
                            background: 'rgba(250, 248, 245, 0.05)',
                            border: '1px solid rgba(198, 169, 107, 0.2)',
                            color: '#FAF8F5',
                          }}
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-xs font-semibold mb-2" style={{ color: 'rgba(250, 248, 245, 0.6)', letterSpacing: '0.05em' }}>
                        DELIVERY ADDRESS
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete delivery address"
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl transition-all outline-none resize-none"
                        style={{ 
                          background: 'rgba(250, 248, 245, 0.05)',
                          border: '1px solid rgba(198, 169, 107, 0.2)',
                          color: '#FAF8F5',
                        }}
                        required={!isLogin}
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ 
                    background: 'linear-gradient(135deg, #C6A96B 0%, #B8956A 100%)',
                    color: '#0D0B0A',
                  }}
                >
                  {isLoading ? (
                    <span className="w-6 h-6 border-2 border-t-transparent border-black rounded-full animate-spin" />
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full" style={{ borderTop: '1px solid rgba(198, 169, 107, 0.2)' }}></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-sm" style={{ background: 'rgba(13, 11, 10, 0.8)', color: 'rgba(250, 248, 245, 0.5)' }}>
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
                className="w-full py-3 font-semibold rounded-xl transition-all"
                style={{ 
                  border: '1px solid rgba(198, 169, 107, 0.3)',
                  color: '#C6A96B',
                }}
              >
                {isLogin ? 'Create New Account' : 'Sign In Instead'}
              </button>
            </div>
          </div>

          {/* Featured Products */}
          <div className="mt-12 text-center">
            <p className="text-sm mb-6" style={{ color: 'rgba(250, 248, 245, 0.5)' }}>
              Explore our signature collection
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {PRODUCTS.slice(0, 3).map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ 
                    background: 'rgba(198, 169, 107, 0.1)',
                    border: '1px solid rgba(198, 169, 107, 0.2)',
                    color: '#C6A96B',
                  }}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
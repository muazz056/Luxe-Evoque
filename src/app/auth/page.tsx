'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/constants';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, login, signup } = useAuth();
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
    if (isAuthenticated) router.push('/');
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
      if (result.success) router.push('/');
      else setError(result.message);
    } catch { setError('An unexpected error occurred'); }
    finally { setIsLoading(false); }
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
      if (result.success) router.push('/');
      else setError(result.message);
    } catch { setError('An unexpected error occurred'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navigation />

      <div className="relative pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          }}>
            {/* Header */}
            <div className="p-8 text-center" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ backgroundColor: 'var(--gold-highlight)' }}>
                <svg className="w-4 h-4" style={{ color: 'var(--gold-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-semibold" style={{ color: 'var(--gold-primary)', letterSpacing: '0.1em' }}>LUXE EVOQUE</span>
              </div>
              <h1 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p style={{ color: 'var(--text-muted)' }}>
                {isLogin ? 'Sign in to continue your fragrance journey' : 'Join us for exclusive luxury scents'}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              {error && (
                <div className="mb-6 p-3 rounded-lg text-sm" style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  color: '#DC2626',
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      FULL NAME
                    </label>
                    <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      required />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    EMAIL ADDRESS
                  </label>
                  <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      PHONE NUMBER
                    </label>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="03XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      required />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    PASSWORD
                  </label>
                  <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    required />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                        CONFIRM PASSWORD
                      </label>
                      <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                        required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>CITY</label>
                        <input name="city" type="text" value={formData.city} onChange={handleInputChange} placeholder="City"
                          className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                          required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>COUNTRY</label>
                        <input name="country" type="text" value={formData.country} onChange={handleInputChange} placeholder="Pakistan"
                          className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                          required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>DELIVERY ADDRESS</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete delivery address"
                        rows={2} className="w-full px-4 py-3 rounded-xl outline-none resize-none transition-all"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                        required />
                    </div>
                  </>
                )}

                <button type="submit" disabled={isLoading}
                  className="w-full py-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--gold-primary)', color: '#000' }}>
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
                  <div className="w-full" style={{ borderTop: '1px solid var(--border-color)' }}></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-sm" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                    {isLogin ? 'New to Luxe Evoque?' : 'Already have an account?'}
                  </span>
                </div>
              </div>

              <button onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="w-full py-3 font-semibold rounded-xl transition-all"
                style={{ border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)' }}>
                {isLogin ? 'Create New Account' : 'Sign In Instead'}
              </button>
            </div>
          </div>

          {/* Featured Products */}
          <div className="mt-12 text-center">
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Explore our signature collection</p>
            <div className="flex flex-wrap justify-center gap-4">
              {PRODUCTS.slice(0, 3).map((product) => (
                <button key={product.id}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--gold-primary)' }}>
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
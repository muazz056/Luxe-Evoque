'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from './ThemeProvider';
import { NAV_ITEMS } from '@/lib/constants';
import CartModal from './CartModal';

export default function Navigation() {
  const router = useRouter();
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      if (window.location.pathname !== '/') {
        router.push('/');
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => router.push('/auth');

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const textColor = 'var(--text-primary)';
  const goldColor = 'var(--gold-primary)';
  const bgColor = isScrolled ? 'var(--bg-navbar)' : 'transparent';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-md' : ''}`}
        style={{ 
          backgroundColor: bgColor,
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="w-10 h-10 md:w-12 md:h-12">
                <img src="/assets/images/logo.png" alt="Luxe Evoque" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-xl md:text-2xl font-bold" style={{ color: textColor }}>
                Luxe Evoque
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: textColor }}
                >
                  {item.label}
                </a>
              ))}

              {/* Cart */}
              <button onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 transition-colors hover:opacity-80"
                style={{ color: textColor }}
                aria-label={`Cart (${cartItemCount} items)`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: goldColor, color: '#000' }}>
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-2 rounded-full transition-colors" style={{ color: textColor }}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {/* Auth */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium hidden lg:block" style={{ color: textColor }}>
                    Hi, {user.fullName.split(' ')[0]}
                  </span>
                  <button onClick={handleLogout} className="text-sm font-medium transition-colors" style={{ color: goldColor }}>
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={handleLogin} className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: goldColor, color: '#000' }}>
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile: Cart + Theme + Auth + Menu */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setIsCartModalOpen(true)} className="relative p-2" style={{ color: textColor }}
                aria-label={`Cart (${cartItemCount} items)`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: goldColor, color: '#000' }}>
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button onClick={toggleTheme} className="p-2" style={{ color: textColor }}
                aria-label="Toggle theme">
                {theme === 'light' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {isAuthenticated && user ? (
                <button onClick={handleLogout} className="p-2" style={{ color: textColor }} aria-label="Logout">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              ) : (
                <button onClick={handleLogin} className="p-2" style={{ color: textColor }} aria-label="Sign in">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              )}

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2" style={{ color: textColor }}
                aria-label="Menu">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container-custom py-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="block py-3 px-4 text-center font-medium rounded-lg"
                  style={{ color: textColor, backgroundColor: 'var(--bg-card)' }}>
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                {isAuthenticated && user ? (
                  <div className="text-center py-3" style={{ color: textColor }}>
                    Logged in as: <strong>{user.fullName}</strong>
                    <button onClick={handleLogout} className="block w-full mt-2 py-2 text-red-500">
                      Logout
                    </button>
                  </div>
                ) : (
                  <button onClick={handleLogin}
                    className="w-full py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: goldColor, color: '#000' }}>
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
    </>
  );
}
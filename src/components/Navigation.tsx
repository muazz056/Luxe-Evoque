'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { NAV_ITEMS } from '@/lib/constants';
import CartModal from './CartModal';

export default function Navigation() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const cartItemCount = getCartItemCount();

  // Handle scroll on page load if there's a hash in URL
  useEffect(() => {
    const handleHashNavigation = () => {
      if (window.location.hash && (window.location.pathname === '/' || window.location.pathname === '')) {
        const hash = window.location.hash;
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashNavigation();
    window.addEventListener('popstate', handleHashNavigation);

    return () => window.removeEventListener('popstate', handleHashNavigation);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

      if (isHomePage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(`/${href}`);
      }
    }
  };

  const handleLogin = () => {
    router.push('/auth');
  };

const handleSignup = () => {
    router.push('/auth');
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-navbar shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-2 transition-all hover:opacity-80"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <img 
                  src="/assets/images/logo.png" 
                  alt="Luxe Evoque Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl md:text-2xl font-bold text-text-primary">
                Luxe Evoque
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`font-medium transition-all duration-300 ${
                    item.isPrimary
                      ? 'bg-gold text-bgPrimary py-1.5 px-3 lg:py-2 lg:px-4 xl:py-2.5 xl:px-5 rounded-full font-semibold uppercase text-[10px] lg:text-xs xl:text-sm tracking-wide hover:bg-gold-hover hover:shadow-glow hover:-translate-y-0.5 shadow-md whitespace-nowrap'
                      : 'text-xs lg:text-sm font-bold text-text-primary hover:text-gold whitespace-nowrap'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 text-text-primary hover:text-gold transition-colors"
                aria-label={`View cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-bgPrimary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Auth Section */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs lg:text-sm font-bold text-text-primary hidden lg:block">
                    Hi, {user.fullName.split(' ')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs lg:text-sm font-bold text-text-primary hover:text-gold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="text-xs lg:text-sm font-bold text-text-primary hover:text-gold transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-bgPrimary/10 dark:hover:bg-text-primary/10 transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile: Cart + Auth + Menu */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 text-text-primary hover:text-gold transition-colors"
                aria-label={`View cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-bgPrimary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Auth Button (Mobile) */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">
                    {user.fullName.split(' ')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-text-primary hover:text-red-400 transition-colors"
                    aria-label="Logout"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 text-text-primary hover:text-gold transition-colors"
                  aria-label="Sign in"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              )}

              {/* Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 text-text-primary"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
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

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="glass-navbar rounded-2xl p-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block py-3 px-4 rounded-xl text-center font-medium transition-colors ${
                    item.isPrimary
                      ? 'bg-gold text-bgPrimary shadow-soft'
                      : 'font-bold text-text-primary hover:bg-bgPrimary/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Auth */}
              <div className="pt-2 border-t border-border">
                {isAuthenticated && user ? (
                  <>
                    <div className="py-3 px-4 text-center text-sm text-text-primary">
                      Logged in as:<br />
                      <span className="font-bold">{user.fullName}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 rounded-xl text-center font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full py-3 px-4 rounded-xl text-center font-bold text-text-primary hover:bg-bgPrimary/10"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleSignup}
                      className="w-full py-3 px-4 rounded-xl text-center font-bold bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>

              {/* Mobile toggles */}
              <div className="flex flex-col gap-3 pt-2 border-t border-border">
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl hover:bg-bgPrimary/10 transition-colors flex items-center justify-center gap-2"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? (
                    <>
                      <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span className="text-sm text-text-primary">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm text-text-primary">Light Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}
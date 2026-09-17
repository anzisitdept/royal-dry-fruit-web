'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Globe, LogOut, Package, UserCircle, Gift, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { SignInModal } from '@/components/auth/SignInModal';
import { COLLECTION_NAVIGATION } from '@/data/navigation';

const NAV_ITEMS = [
  { label: 'About RDF', href: '/pages/about' },
  { label: 'Outlets', href: '/pages/outlets' },
  { label: 'Contact', href: '/pages/contact-us' },
];

export default function Header() {
  const { totalCount, setIsCartOpen, setIsSearchOpen, wishlist } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [desktopCollectionsOpen, setDesktopCollectionsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 120) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const displayName = user
    ? (user.displayName || user.email?.split('@')[0] || '').slice(0, 12)
    : '';

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-wine text-ivory transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 lg:px-8 py-1 lg:py-1.5">
          {/* Left zone — Logo & Mobile menu button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              suppressHydrationWarning
              onClick={() => {
                setMobileCollectionsOpen(false);
                setMobileMenuOpen(true);
              }}
              className="lg:hidden p-1.5 -ml-1 text-ivory flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" aria-label="Royal Dry Fruits — Home" className="flex-shrink-0 flex items-center -mt-4 sm:-mt-5 lg:-mt-6 relative z-10">
              <Image
                src="/RDF-logo.png"
                alt="Royal Dry Fruits"
                width={130}
                height={44}
                priority
                className="w-24 sm:w-28 lg:w-32 h-auto object-contain drop-shadow-md"
              />
            </Link>
          </div>

          {/* Desktop center — Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              href="/collections/all-products"
              className="text-ivory/90 hover:text-ivory text-[11px] xl:text-[12px] font-semibold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors"
            >
              Shop All
            </Link>

            <Link
              href="/custom-basket"
              className="text-ivory hover:text-ivory text-[11px] xl:text-[12px] font-bold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors border border-sand/40 rounded-full px-3 py-1.5 hover:bg-sand/15"
            >
              Custom Basket
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDesktopCollectionsOpen(true)}
              onMouseLeave={() => setDesktopCollectionsOpen(false)}
            >
              <button
                onClick={() => setDesktopCollectionsOpen((v) => !v)}
                aria-expanded={desktopCollectionsOpen}
                className="text-ivory/90 hover:text-ivory text-[11px] xl:text-[12px] font-semibold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors flex items-center gap-1"
              >
                Collections
                <ChevronDown
                  className={`w-3 h-3 opacity-70 transition-transform duration-200 ${desktopCollectionsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                  desktopCollectionsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 min-w-[220px] py-1">
                  {COLLECTION_NAVIGATION.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setDesktopCollectionsOpen(false)}
                      className="block px-4 py-2.5 text-charcoal hover:bg-sand/60 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-ivory/90 hover:text-ivory text-[11px] xl:text-[12px] font-semibold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right zone */}
          <div className="hidden lg:flex items-center justify-end gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
            <button
              suppressHydrationWarning
              aria-label="Switch language"
              className="text-ivory/90 hover:text-ivory transition-colors p-1"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              suppressHydrationWarning
              onClick={() => setIsSearchOpen(true)}
              className="text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-ivory text-wine text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              suppressHydrationWarning
              onClick={() => setIsCartOpen(true)}
              className="relative text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ivory text-wine text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {totalCount}
                </span>
              )}
            </button>

            {!authLoading && (
              <div
                className="relative border-l border-ivory/20 pl-3 lg:pl-4"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    if (!user) {
                      setSignInOpen(true);
                    } else {
                      setProfileDropdownOpen((v) => !v);
                    }
                  }}
                  className="flex items-center gap-1.5 text-ivory/90 hover:text-ivory transition-colors text-xs font-semibold p-1"
                  aria-label="Account / Profile"
                >
                  <User className="w-5 h-5 text-ivory" />
                  <span>{user ? displayName : 'Profile'}</span>
                  <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`absolute top-full right-0 pt-2 transition-all duration-200 z-50 ${
                    profileDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 min-w-[200px] py-1.5 text-charcoal">
                    <Link
                      href="/account"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand/60 text-xs font-semibold transition-colors"
                    >
                      <UserCircle className="w-4 h-4 text-wine" />
                      My Profile
                    </Link>

                    <Link
                      href="/account/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand/60 text-xs font-semibold transition-colors border-b border-gray-100"
                    >
                      <Package className="w-4 h-4 text-wine" />
                      Track Orders
                    </Link>

                    {user ? (
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-sand/60 text-xs font-semibold text-red-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSignInOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-sand/60 text-xs font-semibold text-wine transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Sign In / Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile right group */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden flex-shrink-0">
            <button
              suppressHydrationWarning
              onClick={() => setIsSearchOpen(true)}
              className="text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-ivory text-wine text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              suppressHydrationWarning
              onClick={() => setIsCartOpen(true)}
              className="relative text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ivory text-wine text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {totalCount}
                </span>
              )}
            </button>

            {!authLoading && (
              user ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-ivory/90">{displayName}</span>
                  <button
                    onClick={() => logout()}
                    className="text-ivory/90 hover:text-ivory transition-colors p-1"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="#"
                  onClick={(e) => { e.preventDefault(); setSignInOpen(true); }}
                  className="text-ivory/90 hover:text-ivory transition-colors p-1"
                  aria-label="Sign in"
                >
                  <User className="w-5 h-5" />
                </Link>
              )
            )}

            <button
              suppressHydrationWarning
              aria-label="Switch language"
              className="text-ivory/90 hover:text-ivory transition-colors p-1"
            >
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mounted && createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[100] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          <div
            className={`absolute top-0 left-0 h-full w-[82%] max-w-[340px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between bg-wine px-4 py-3.5 flex-shrink-0">
              <span className="text-ivory font-bold text-base">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-ivory p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <Link
                href="/account/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                <Package className="w-4 h-4" />
                Track Order
              </Link>

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                Profile
              </Link>

              <Link
                href="/collections/all-products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                Shop All
              </Link>

              <button
                onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileCollectionsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileCollectionsOpen && (
                <div className="bg-sand/20">
                  {COLLECTION_NAVIGATION.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block pl-10 pr-4 py-3 border-b border-gray-100 text-charcoal/80 hover:bg-sand/50 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/custom-basket"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 text-wine hover:bg-sand/50 font-bold text-sm transition-colors"
              >
                <Gift className="w-4 h-4" />
                Custom Basket
              </Link>

              <Link
                href="/pages/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                About RDF
              </Link>

              <Link
                href="/pages/outlets"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Our Outlets
              </Link>

              <Link
                href="/pages/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-4 py-3.5 border-b border-gray-100 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
              >
                Contact
              </Link>
            </nav>

            {!authLoading && user && (
              <div className="border-t border-gray-100 flex-shrink-0">
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-3.5 text-charcoal hover:bg-sand/50 font-semibold text-sm transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}

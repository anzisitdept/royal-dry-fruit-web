'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Globe, LogOut, Package, UserCircle, Gift, MapPin, Store, Info, PhoneCall } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { SignInModal } from '@/components/auth/SignInModal';
import { COLLECTION_NAVIGATION } from '@/data/navigation';

const NAV_ITEMS = [
  { key: 'nav.about', href: '/pages/about' },
  { key: 'nav.outlets', href: '/pages/outlets' },
  { key: 'nav.contact', href: '/pages/contact-us' },
];

const COLLECTION_LABEL_KEYS: Record<string, string> = {
  'Dry Fruits & Dates': 'collections.navDryFruits',
  'Roasted & Flavored': 'collections.navRoasted',
  'Combos': 'collections.navCombos',
  'Gift Boxes': 'collections.navGiftBoxes',
  'Best Sellers': 'collections.navBestSellers',
};

export default function Header() {
  const { totalCount, setIsCartOpen, setIsSearchOpen, wishlist } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const isUr = lang === 'ur';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [desktopCollectionsOpen, setDesktopCollectionsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-wine text-ivory transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'} outline-none border-none`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:px-4 lg:px-8 py-1 lg:py-1.5 relative">
          
          {/* MOBILE LEFT ZONE — Menu Toggle & Search Icon */}
          <div className="flex lg:hidden items-center gap-1 flex-shrink-0 z-10">
            <button
              suppressHydrationWarning
              onClick={() => {
                setMobileCollectionsOpen(false);
                setMobileMenuOpen(true);
              }}
              className="p-1.5 text-ivory hover:text-sand transition-colors"
              aria-label={t('ariaMenu.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              suppressHydrationWarning
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-ivory hover:text-sand transition-colors"
              aria-label={t('ariaMenu.searchProducts')}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* DESKTOP LEFT / MOBILE CENTER — Logo */}
          <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start items-center z-10">
            <Link href="/" aria-label="Royal Dry Fruits — Home" className="flex-shrink-0 flex items-center -mt-3 sm:-mt-4 lg:-mt-6">
              <Image
                src="/RDF-logo.png"
                alt="Royal Dry Fruits"
                width={130}
                height={44}
                priority
                className="w-20 sm:w-26 lg:w-32 h-auto object-contain drop-shadow-md"
              />
            </Link>
          </div>

          {/* DESKTOP CENTER — Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              href="/collections/all-products"
              className="text-ivory/90 hover:text-ivory text-[11px] xl:text-[12px] font-semibold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors"
            >
              {t('nav.shopAll')}
            </Link>

            <Link
              href="/custom-basket"
              className="text-ivory hover:text-ivory text-[11px] xl:text-[12px] font-bold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors border border-sand/40 rounded-full px-3 py-1.5 hover:bg-sand/15"
            >
              {t('nav.customBasket')}
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
                {t('nav.collections')}
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
                      {t(COLLECTION_LABEL_KEYS[item.label] ?? item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-ivory/90 hover:text-ivory text-[11px] xl:text-[12px] font-semibold uppercase tracking-wider xl:tracking-widest whitespace-nowrap transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* DESKTOP RIGHT ZONE */}
          <div className="hidden lg:flex items-center justify-end gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
            {/* Desktop Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center gap-1 bg-black/20 hover:bg-black/30 border border-ivory/30 text-ivory rounded px-2.5 py-1 text-xs font-bold uppercase transition-colors"
                aria-label={t('ariaMenu.switchLanguage')}
              >
                <Globe className="w-3.5 h-3.5 text-ivory/90" />
                <span>{lang === 'ur' ? 'UR' : 'EN'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute end-0 top-full mt-1 bg-white text-charcoal rounded-lg shadow-xl border border-gray-100 py-1 min-w-[110px] z-50">
                  <button
                    onClick={() => {
                      setLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-sand/40 ${
                      lang === 'en' ? 'text-wine font-extrabold bg-sand/20' : 'text-charcoal'
                    }`}
                    dir="ltr"
                  >
                    <span>EN</span>
                    <span className="text-[10px] text-gray-400">English</span>
                  </button>
                  <button
                    onClick={() => {
                      setLang('ur');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-sand/40 ${
                      lang === 'ur' ? 'text-wine font-extrabold bg-sand/20' : 'text-charcoal'
                    }`}
                    dir="rtl"
                  >
                    <span>UR</span>
                    <span className="text-[10px] text-gray-400">اردو</span>
                  </button>
                </div>
              )}
            </div>

            <button
              suppressHydrationWarning
              onClick={() => setIsSearchOpen(true)}
              className="text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label={t('ariaMenu.searchProducts')}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label={t('ariaMenu.wishlist')}
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
              aria-label={t('ariaMenu.shoppingCart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ivory text-wine text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

          {/* MOBILE RIGHT ZONE — Wishlist, Cart, Profile Icon & EN/UR Language Dropdown */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden flex-shrink-0 z-10">
            <Link
              href="/wishlist"
              className="relative text-ivory/90 hover:text-ivory transition-colors p-1"
              aria-label={t('ariaMenu.wishlist')}
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
              aria-label={t('ariaMenu.shoppingCart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ivory text-wine text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {totalCount}
                </span>
              )}
            </button>

            {!authLoading && (
              <button
                suppressHydrationWarning
                onClick={() => {
                  if (user) {
                    setMobileMenuOpen(true);
                  } else {
                    setSignInOpen(true);
                  }
                }}
                className="text-ivory/90 hover:text-ivory transition-colors p-1"
                aria-label={t('ariaMenu.profile')}
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile EN / UR Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center gap-0.5 bg-black/20 hover:bg-black/30 border border-ivory/30 text-ivory rounded px-1.5 py-0.5 text-[11px] font-bold uppercase transition-colors"
                aria-label={t('ariaMenu.switchLanguage')}
              >
                <span>{lang === 'ur' ? 'UR' : 'EN'}</span>
                <ChevronDown className={`w-3 h-3 opacity-80 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute end-0 top-full mt-1 bg-white text-charcoal rounded-md shadow-xl border border-gray-100 py-1 min-w-[95px] z-50">
                  <button
                    onClick={() => {
                      setLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1 text-xs font-semibold flex items-center justify-between hover:bg-sand/40 ${
                      lang === 'en' ? 'text-wine font-extrabold bg-sand/20' : 'text-charcoal'
                    }`}
                    dir="ltr"
                  >
                    <span>EN</span>
                    <span className="text-[10px] text-gray-400">English</span>
                  </button>
                  <button
                    onClick={() => {
                      setLang('ur');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1 text-xs font-semibold flex items-center justify-between hover:bg-sand/40 ${
                      lang === 'ur' ? 'text-wine font-extrabold bg-sand/20' : 'text-charcoal'
                    }`}
                    dir="rtl"
                  >
                    <span>UR</span>
                    <span className="text-[10px] text-gray-400">اردو</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {mounted && createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[100] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Drawer Content */}
          <div
            className={`absolute top-0 start-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : isUr ? 'translate-x-full' : '-translate-x-full'
            }`}
          >
            {/* Top Headline Header with Profile Info */}
            <div className="bg-wine text-ivory p-4 relative flex-shrink-0 border-b border-sand/20">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 text-ivory/80 hover:text-ivory rounded-full hover:bg-white/10 transition-colors"
                aria-label={t('ariaMenu.closeMenu')}
              >
                <X className="w-5 h-5" />
              </button>

              {!authLoading && user ? (
                /* Interactive Profile Banner for Logged In User */
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 pr-8 pt-1 pb-1 group"
                >
                  <div className="w-12 h-12 rounded-full bg-sand/30 border-2 border-sand/50 flex items-center justify-center text-ivory font-bold text-lg shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'Profile'}
                        width={48}
                        height={48}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-sand/90">{t('nav.signedInAs')}</p>
                    <h3 className="text-base font-bold text-ivory truncate group-hover:text-sand transition-colors">
                      {user.displayName || user.email?.split('@')[0] || 'User Profile'}
                    </h3>
                    <p className="text-xs text-ivory/70 truncate">{user.email}</p>
                  </div>
                </Link>
              ) : (
                /* Guest Profile Headline */
                <div className="pr-8 pt-1 pb-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-ivory flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ivory">{t('nav.welcomeGuest')}</h3>
                      <p className="text-xs text-ivory/70">{t('nav.signInForPersonal')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSignInOpen(true);
                    }}
                    className="w-full py-2 px-3 bg-sand text-wine rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ivory transition-colors shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    {t('nav.signInRegister')}
                  </button>
                </div>
              )}
            </div>

            {/* Structured Navigation Body */}
            <nav className="flex-1 overflow-y-auto py-2">
              {/* Section 1: Shop */}
              <div className="px-3 py-1">
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">{t('nav.shop')}</p>
                <Link
                  href="/collections/all-products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-wine" />
                  {t('nav.shopAllProducts')}
                </Link>

                {/* Collections Accordion */}
                <div>
                  <button
                    onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Store className="w-4 h-4 text-wine" />
                      {t('nav.collections')}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobileCollectionsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileCollectionsOpen && (
                    <div className="ms-4 ps-3 border-s-2 border-sand/60 space-y-0.5 my-1">
                      {COLLECTION_NAVIGATION.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-charcoal/80 hover:text-wine hover:bg-sand/30 rounded text-sm font-medium transition-colors"
                        >
                          {t(COLLECTION_LABEL_KEYS[item.label] ?? item.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/custom-basket"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 mt-1 rounded-lg bg-wine/5 border border-wine/15 text-wine hover:bg-wine/10 font-bold text-sm transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Gift className="w-4 h-4 text-wine" />
                    {t('nav.customBasket')}
                  </span>
                  <span className="text-[10px] font-extrabold bg-wine text-ivory px-2 py-0.5 rounded-full uppercase">{t('nav.create')}</span>
                </Link>
              </div>

              <div className="my-2 border-t border-gray-100" />

              {/* Section 2: Account Links */}
              <div className="px-3 py-1">
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">{t('nav.myAccount')}</p>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <UserCircle className="w-4 h-4 text-wine" />
                  {t('nav.myProfile')}
                </Link>

                <Link
                  href="/account/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <Package className="w-4 h-4 text-wine" />
                  {t('nav.trackOrders')}
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-wine" />
                    {t('nav.wishlist')}
                  </span>
                  {mounted && wishlist.length > 0 && (
                    <span className="bg-wine text-ivory text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </div>

              <div className="my-2 border-t border-gray-100" />

              {/* Section 3: Info & Pages */}
              <div className="px-3 py-1">
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">{t('nav.information')}</p>
                <Link
                  href="/pages/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <Info className="w-4 h-4 text-wine" />
                  {t('nav.aboutRdf')}
                </Link>

                <Link
                  href="/pages/outlets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4 text-wine" />
                  {t('nav.ourOutlets')}
                </Link>

                <Link
                  href="/pages/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal hover:bg-sand/40 font-semibold text-sm transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-wine" />
                  {t('nav.contactUs')}
                </Link>
              </div>
            </nav>

            {/* Bottom Sign Out (for logged in users) */}
            {!authLoading && user && (
              <div className="p-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm transition-colors border border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav.signOut')}
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

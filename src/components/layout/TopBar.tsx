'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ChevronDown, LogOut, Package, User, UserCircle } from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { KNOWN_ANNOUNCEMENTS } from '@/i18n/dictionaries';
import { SignInModal } from '@/components/auth/SignInModal';

export default function TopBar() {
  const { storeContent } = useStoreData();
  const messages = storeContent.topBarMessages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, loading: authLoading, logout } = useAuth();
  const { isUr, t } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<{ top: number; right?: number; left?: number } | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [messages]);

  useEffect(() => {
    const close = () => setProfileDropdownOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, []);

  if (messages.length === 0) return null;

  const displayName = user
    ? (user.displayName || user.email?.split('@')[0] || '').slice(0, 12)
    : '';

  const localizeMessage = (msg: string) => {
    if (!isUr) return msg;
    const key = KNOWN_ANNOUNCEMENTS[msg];
    return key ? t(key) : msg;
  };

  const currentMessage = localizeMessage(messages[currentIndex % messages.length]);

  const openDropdown = () => {
    const el = profileRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const style: { top: number; right?: number; left?: number } = { top: rect.bottom + 8 };
      if (isUr) {
        // Profile sits at the inline-end (left in RTL) — anchor dropdown's left edge to it
        style.left = rect.left;
      } else {
        // Profile sits on the right — anchor dropdown's right edge to it
        style.right = window.innerWidth - rect.right;
      }
      setDropdownStyle(style);
    }
    setProfileDropdownOpen(true);
  };

  return (
    <div className="bg-wine text-white relative z-30 -mb-px border-none outline-none">
      <div className="text-xs md:text-[13px] font-bold py-2 px-4 flex items-center justify-center select-none overflow-hidden">
        <div className="flex-1 text-center truncate px-1 md:px-8 lg:px-12 pe-[64px] lg:pe-[132px]">
          <span
            key={currentIndex}
            className="inline-block tracking-wider uppercase animate-slideIn text-[10px] md:text-[12px]"
          >
            {currentMessage}
          </span>
        </div>
      </div>

      {/* Profile — shifted up into the topbar, aligned to the inline-end (right in LTR / left in RTL) */}
      {!authLoading && (
        <div
          ref={profileRef}
          className="hidden lg:block absolute end-2 sm:end-4 top-2"
          onMouseEnter={() => {
            if (!profileDropdownOpen) openDropdown();
          }}
          onMouseLeave={() => setProfileDropdownOpen(false)}
        >
          <button
            onClick={() => {
              if (!user) {
                setSignInOpen(true);
                return;
              }
              if (profileDropdownOpen) {
                setProfileDropdownOpen(false);
              } else {
                openDropdown();
              }
            }}
            className="flex items-center gap-2 text-ivory/90 hover:text-ivory transition-colors text-xs font-semibold py-1 px-1"
            aria-label={t('topbar.accountProfile')}
          >
            <User className="w-5 h-5 text-ivory" />
            <span>{user ? displayName : t('topbar.profile')}</span>
            <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {profileDropdownOpen &&
        dropdownStyle &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{ top: dropdownStyle.top, right: dropdownStyle.right, left: dropdownStyle.left }}
            className="fixed z-[110]"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-100 min-w-[200px] py-1.5 text-charcoal">
              <Link
                href="/account"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand/60 text-xs font-semibold transition-colors"
              >
                <UserCircle className="w-4 h-4 text-wine" />
                {t('nav.myProfile')}
              </Link>

              <Link
                href="/account/orders"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand/60 text-xs font-semibold transition-colors border-b border-gray-100"
              >
                <Package className="w-4 h-4 text-wine" />
                {t('nav.trackOrders')}
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
                  {t('nav.signOut')}
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
                  {t('nav.signInRegister')}
                </button>
              )}
            </div>
          </div>,
          document.body
        )}

      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </div>
  );
}
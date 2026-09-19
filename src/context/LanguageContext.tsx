'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang, translate } from '@/i18n/dictionaries';

const STORAGE_KEY = 'rdf-language';

interface LanguageContextType {
  lang: Lang;
  isUr: boolean;
  dir: 'ltr' | 'rtl';
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function applyDocumentLang(lang: Lang) {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  el.lang = lang === 'ur' ? 'ur' : 'en';
  el.dir = lang === 'ur' ? 'rtl' : 'ltr';
  el.classList.toggle('lang-ur', lang === 'ur');
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ur' || stored === 'en') return stored;
  } catch {
    // ignore storage errors
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    applyDocumentLang(lang);
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
    applyDocumentLang(next);
  };

  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(lang, key, vars);

  return (
    <LanguageContext.Provider
      value={{ lang, isUr: lang === 'ur', dir: lang === 'ur' ? 'rtl' : 'ltr', setLang, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
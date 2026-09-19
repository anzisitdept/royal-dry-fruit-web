'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeaderProps {
  titleKey: string;
  subtitleKey?: string;
}

export default function PageHeader({ titleKey, subtitleKey }: PageHeaderProps) {
  const { t } = useLanguage();
  return (
    <section className="bg-sand py-10 border-b border-red-100">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-wine uppercase tracking-wide">
          {t(titleKey)}
        </h1>
        {subtitleKey && (
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">{t(subtitleKey)}</p>
        )}
      </div>
    </section>
  );
}
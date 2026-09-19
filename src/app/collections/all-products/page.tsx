'use client';

import React, { Suspense } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { CategoryInner } from '../[category]/page';
import { useLanguage } from '@/context/LanguageContext';

export default function AllProductsPage() {
  const { t } = useLanguage();
  return (
    <>
      <TopBar />
      <Header />
      <Suspense
        fallback={
          <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>
            {t('catalog.loadingAll')}
          </div>
        }
      >
        <CategoryInner forcedCategory="all-products" />
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

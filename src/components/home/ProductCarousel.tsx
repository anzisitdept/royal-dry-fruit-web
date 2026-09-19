'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStoreData } from '@/context/StoreDataContext';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/products/ProductCard';

interface ProductCarouselProps {
  title?: string;
  categoryFilter?: string;
  productIds?: string[];
  viewAllLink?: string;
}

export default function ProductCarousel({ 
  title, 
  categoryFilter,
  productIds,
  viewAllLink = "/collections/all-products"
}: ProductCarouselProps) {
  const { t } = useLanguage();
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  });

  const { products } = useStoreData();

  let filteredProducts: Product[] = [];

  // 1. If explicit productIds are provided from Firestore store_content curated section
  if (productIds && productIds.length > 0) {
    filteredProducts = productIds
      .map(id => products.find(p => p.id === id || p.slug === id))
      .filter((p): p is Product => Boolean(p));
  }

  // 2. Fallback if productIds list is empty or hasn't been configured yet in Admin
  if (filteredProducts.length === 0) {
    if (categoryFilter === 'best-selling') {
      filteredProducts = products.filter(p => p.isBestSeller);
      if (filteredProducts.length === 0) filteredProducts = products.slice(0, 8);
    } else if (categoryFilter === 'new-arrivals') {
      filteredProducts = products.filter(p => p.isNew);
      if (filteredProducts.length === 0) filteredProducts = products.slice(4, 12);
    } else if (categoryFilter === 'bundles') {
      filteredProducts = products.filter(p => 
        p.category === 'bundles' || 
        p.slug.toLowerCase().includes('bundle') || 
        p.name.toLowerCase().includes('bundle')
      );
      if (filteredProducts.length === 0) filteredProducts = products.filter(p => p.isBestSeller);
    } else if (categoryFilter === 'special') {
      filteredProducts = products.filter(p => 
        Boolean(p.discountBadge) || 
        p.category === 'special' || 
        p.isBestSeller
      );
      if (filteredProducts.length === 0) filteredProducts = products.slice(2, 10);
    } else if (categoryFilter) {
      filteredProducts = products.filter(p => p.category === categoryFilter);
      if (filteredProducts.length === 0) filteredProducts = products.slice(0, 8);
    } else {
      filteredProducts = products;
    }
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-white w-full overflow-hidden">
      <div className="container mx-auto px-3 md:px-4 lg:px-8 max-w-7xl">
        
        {/* Title Header */}
        <div className="flex flex-col items-center mb-6 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-serif text-charcoal uppercase tracking-wide">
            {title || t('productCarousel.discoverDefault')}
          </h2>
          <div className="w-full h-px bg-gray-200 my-3 md:my-4 relative max-w-3xl">
            <Link 
              href={viewAllLink} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 md:px-4 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-wine-deep transition whitespace-nowrap"
            >
              {t('productCarousel.viewAll')}
            </Link>
          </div>
        </div>
        
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 md:gap-5">
            {filteredProducts.map(product => (
              <div key={product.id} className="flex-[0_0_75%] xs:flex-[0_0_55%] sm:flex-[0_0_46%] lg:flex-[0_0_24%] min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

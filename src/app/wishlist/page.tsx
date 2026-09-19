'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { useCart } from '@/context/CartContext';
import { useStoreData } from '@/context/StoreDataContext';
import { useLanguage } from '@/context/LanguageContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { products } = useStoreData();
  const { t } = useLanguage();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <>
      <TopBar />
      <Header />

      <section className="bg-sand py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-wine uppercase tracking-wide">
            {t('wishlistPage.title', { count: wishlistProducts.length })}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            {t('wishlistPage.subtitle')}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-7xl py-12 min-h-[50vh]">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 space-y-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <Heart className="w-16 h-16 text-gray-300 mx-auto" />
            <p className="text-gray-600 font-medium text-sm">{t('wishlistPage.empty')}</p>
            <Link
              href="/collections/all-products"
              className="inline-block bg-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-wine-deep transition"
            >
              {t('wishlistPage.exploreProducts')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center">
                  {product.image && product.image.trim() !== '' ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-300 text-xs font-medium">{t('wishlistPage.noImage')}</span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-bold text-xs text-gray-900 hover:text-wine line-clamp-2 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] text-gray-400 mt-1">{product.urduName}</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <span className="text-wine font-extrabold text-sm block">
                      Rs. {product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-wine hover:bg-wine-deep text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center space-x-2 transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t('wishlistPage.addToCart')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

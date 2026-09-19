'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import {
  UserCircle,
  Package,
  Heart,
  ShoppingBag,
  LogOut,
  Calendar,
  Truck,
  CheckCircle,
} from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'RDF-1001', date: '2026-09-15', status: 'Delivered', total: 2450, itemsKey: 'accountPage.orderItems1' },
  { id: 'RDF-0987', date: '2026-09-10', status: 'Shipped', total: 1850, itemsKey: 'accountPage.orderItems2' },
  { id: 'RDF-0965', date: '2026-09-02', status: 'Delivered', total: 3200, itemsKey: 'accountPage.orderItems3' },
];

function statusBadge(status: string) {
  const base = 'inline-block px-3 py-1 rounded-full text-xs font-semibold';
  switch (status) {
    case 'Delivered':
      return `${base} bg-green-100 text-green-700`;
    case 'Shipped':
      return `${base} bg-blue-100 text-blue-700`;
    case 'Processing':
      return `${base} bg-yellow-100 text-yellow-700`;
    default:
      return `${base} bg-gray-100 text-gray-700`;
  }
}

const STATUS_KEY: Record<string, string> = {
  Delivered: 'accountPage.statusDelivered',
  Shipped: 'accountPage.statusShipped',
  Processing: 'accountPage.statusProcessing',
  'In Transit': 'accountPage.statusInTransit',
};

function formatDate(dateString: string, isUr: boolean) {
  const d = new Date(dateString);
  return d.toLocaleDateString(isUr ? 'ur-PK' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatMemberSince(creationTime: string | null | undefined, isUr: boolean) {
  if (!creationTime) return null;
  const d = new Date(creationTime);
  return d.toLocaleDateString(isUr ? 'ur-PK' : 'en-US', { year: 'numeric', month: 'long' });
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { wishlist } = useCart();
  const { t, isUr } = useLanguage();
  const router = useRouter();

  if (!user) {
    return (
      <>
        <TopBar />
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center max-w-md w-full">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/rdf-logo.png"
                alt="RDF Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <h2 className="text-xl font-bold text-wine mb-2">Royal Dry Fruits</h2>
            <p className="text-gray-600 mb-6">
              {t('accountPage.signInPrompt')}
            </p>
            <Link
              href="/"
              className="inline-block w-full bg-wine text-white py-3 rounded-xl font-semibold hover:bg-wine/90 transition-colors mb-4"
            >
              {t('accountPage.signIn')}
            </Link>
            <Link
              href="/collections/all-products"
              className="inline-block text-sm text-wine hover:underline"
            >
              {t('accountPage.continueShopping')}
            </Link>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Header />

      <section className="bg-sand py-16 text-center">
        <h1 className="text-4xl font-bold text-wine mb-2">{t('accountPage.title')}</h1>
        <p className="text-gray-700 text-lg">
          {t('accountPage.subtitle')}
        </p>
      </section>

      <main className="container mx-auto px-4 max-w-5xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={80}
                    height={80}
                    unoptimized
                    className="rounded-full object-cover mb-3"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-wine/10 flex items-center justify-center mb-3">
                    <UserCircle size={48} className="text-wine" />
                  </div>
                )}
                <h2 className="font-bold text-lg text-gray-900">
                  {user.displayName || t('accountPage.customer')}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <hr className="border-gray-200 mb-6" />

              <div className="mb-6">
                <h3 className="font-semibold text-wine mb-3">{t('accountPage.accountDetails')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('accountPage.name')}</span>
                    <span className="font-medium">{user.displayName || t('accountPage.notSet')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('accountPage.email')}</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar size={14} /> {t('accountPage.memberSince')}
                    </span>
                    <span className="font-medium">
                      {formatMemberSince(user.metadata.creationTime, isUr) ?? t('accountPage.unknown')}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 mb-6" />

              <button
                onClick={async () => {
                  await logout();
                  router.push('/');
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              >
                <LogOut size={18} />
                {t('accountPage.signOut')}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-wine mb-4">{t('accountPage.recentOrders')}</h2>
              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-wine font-bold text-sm">
                          {order.id}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(order.date, isUr)}
                        </span>
                      </div>
                      <span className={statusBadge(order.status)}>{t(STATUS_KEY[order.status] ?? order.status)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t(order.itemsKey)}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-wine">
                        Rs. {order.total.toLocaleString()}
                      </span>
                      <button className="text-xs text-wine hover:underline font-medium">
                        {t('accountPage.trackOrder')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-wine mb-4">{t('accountPage.wishlist')}</h2>
              {wishlist.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                  <Heart size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 mb-3">{t('accountPage.wishlistEmpty')}</p>
                  <Link
                    href="/collections/all-products"
                    className="text-wine hover:underline font-semibold text-sm"
                  >
                    {t('accountPage.browseProducts')}
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  {t('accountPage.wishlistItemCount', { count: wishlist.length })}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-wine mb-4">{t('accountPage.quickActions')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/account/orders"
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <Package size={28} className="mx-auto text-wine mb-2" />
                  <span className="font-semibold text-sm text-gray-900">{t('accountPage.trackOrder')}</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <Heart size={28} className="mx-auto text-wine mb-2" />
                  <span className="font-semibold text-sm text-gray-900">{t('accountPage.wishlist')}</span>
                </Link>
                <Link
                  href="/collections/all-products"
                  className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <ShoppingBag size={28} className="mx-auto text-wine mb-2" />
                  <span className="font-semibold text-sm text-gray-900">{t('accountPage.shopNow')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export default function OrdersPage() {
  const { t, isUr } = useLanguage();
  const sampleOrders = [
    {
      id: 'RDF-000001',
      date: '2026-08-10',
      status: 'In Transit',
      itemsKey: 'accountPage.orderItemsA',
      total: 1639
    },
    {
      id: 'RDF-000002',
      date: '2026-07-24',
      status: 'Delivered',
      itemsKey: 'accountPage.orderItemsB',
      total: 799
    }
  ];

  const statusText = (status: string) =>
    status === 'Delivered'
      ? t('accountPage.statusDelivered')
      : status === 'Shipped'
      ? t('accountPage.statusShipped')
      : status === 'Processing'
      ? t('accountPage.statusProcessing')
      : t('accountPage.statusInTransit');

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString(isUr ? 'ur-PK' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <TopBar />
      <Header />

      <section className="bg-sand py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-wine uppercase tracking-wide">
            {t('accountPage.orders')}
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 min-h-[50vh]">
        <div className="space-y-6">
          {sampleOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-2">
                <div>
                  <span className="font-bold text-sm text-wine">{t('accountPage.orderAt', { id: order.id })}</span>
                  <span className="text-xs text-gray-500 ml-3">{t('accountPage.placedOn', { date: formatDate(order.date) })}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {statusText(order.status)}
                </span>
              </div>

              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold">{t(order.itemsKey)}</p>
                <p className="text-gray-500">{t('accountPage.payment', { method: t('accountPage.paymentCod') })}</p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t text-xs">
                <span className="font-bold text-gray-900">{t('accountPage.total', { total: order.total })}</span>
                <a
                  href={`https://wa.me/923473811510?text=Hi%20Royal%20Dry%20Fruits,%20please%20update%20status%20for%20order%20${order.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-700 font-bold hover:underline"
                >
                  {t('accountPage.trackOnWhatsApp')} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

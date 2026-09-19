'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Phone, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <>
      <TopBar />
      <Header />

      <section className="bg-sand py-10 border-b border-red-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-wine uppercase tracking-wide">
            {t('registerPage.title')}
          </h1>
          <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            {t('registerPage.subtitle')}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-md py-12 min-h-[50vh]">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
          {isRegistered ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <h2 className="text-xl font-bold text-gray-900">{t('registerPage.successTitle')}</h2>
              <p className="text-xs text-gray-600">{t('registerPage.successSub')}</p>
              <Link
                href="/collections/all-products"
                className="inline-block bg-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md"
              >
                {t('registerPage.startShopping')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t('registerPage.firstName')}</label>
                  <input
                    type="text"
                    required
                    placeholder="Ali"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t('registerPage.lastName')}</label>
                  <input
                    type="text"
                    required
                    placeholder="Khan"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('registerPage.mobile')}</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('registerPage.email')}</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">{t('registerPage.password')}</label>
                <input
                  type="password"
                  required
                  placeholder={t('registerPage.passwordPlaceholder')}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-wine outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center space-x-2 shadow-md transition"
              >
                <span>{t('registerPage.createBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-4 border-t border-gray-100 text-gray-600 text-xs">
                {t('registerPage.alreadyHave')}{' '}
                <Link href="/account/login" className="font-bold text-wine hover:underline">
                  {t('registerPage.signInHere')}
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

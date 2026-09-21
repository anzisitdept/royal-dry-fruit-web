'use client';

import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';
import {
  Award, Leaf, Truck, Gift, HeartHandshake, MapPin, Clock, Wallet, Sparkles,
} from 'lucide-react';

const STATS = [
  { value: '20+', labelKey: 'aboutPage.statProducts' },
  { value: '15+', labelKey: 'aboutPage.statCities' },
  { value: '10k+', labelKey: 'aboutPage.statCustomers' },
  { value: '4.9★', labelKey: 'aboutPage.statRating' },
];

const JOURNEY = [
  { yearKey: 'aboutPage.j1Year', titleKey: 'aboutPage.j1Title', textKey: 'aboutPage.j1Text' },
  { yearKey: 'aboutPage.j2Year', titleKey: 'aboutPage.j2Title', textKey: 'aboutPage.j2Text' },
  { yearKey: 'aboutPage.j3Year', titleKey: 'aboutPage.j3Title', textKey: 'aboutPage.j3Text' },
  { yearKey: 'aboutPage.j4Year', titleKey: 'aboutPage.j4Title', textKey: 'aboutPage.j4Text' },
];

const VALUES = [
  { icon: Award, titleKey: 'aboutPage.v1Title', textKey: 'aboutPage.v1Text' },
  { icon: Leaf, titleKey: 'aboutPage.v2Title', textKey: 'aboutPage.v2Text' },
  { icon: Wallet, titleKey: 'aboutPage.v3Title', textKey: 'aboutPage.v3Text' },
  { icon: HeartHandshake, titleKey: 'aboutPage.v4Title', textKey: 'aboutPage.v4Text' },
];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <TopBar />
      <Header />

      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-wine-deep text-ivory relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-wine/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-sand/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center relative">
            <p className="text-sand text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {t('aboutPage.kicker')}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-tight">
              {t('pages.about.hero1')}
              <span className="block text-sand">{t('pages.about.hero2')}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-ivory/80 text-sm md:text-base leading-relaxed">
              {t('pages.about.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/collections/all-products"
                className="inline-block bg-sand text-dryfruit font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-white transition shadow-md"
              >
                {t('aboutPage.shopPremium')}
              </Link>
              <Link
                href="/pages/outlets"
                className="inline-block border-2 border-ivory/60 text-ivory font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-wine-deep transition"
              >
                {t('aboutPage.visitOutlets')}
              </Link>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-y border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <p className="font-serif text-3xl md:text-4xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story two-column */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-sand rounded-3xl rotate-2" />
              <img
                src="/about-us.webp"
                alt="About Royal Dry Fruits — premium dry fruits selection"
                className="relative rounded-3xl w-full h-[360px] md:h-[440px] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 left-6 bg-wine text-ivory rounded-2xl px-5 py-4 shadow-lg">
                <p className="font-serif text-2xl font-bold">{t('aboutPage.estSukkur')}</p>
                <p className="text-[11px] text-sand uppercase tracking-wider">{t('aboutPage.proudlyPakistani')}</p>
              </div>
            </div>

            <div>
              <p className="text-wine text-xs font-bold uppercase tracking-[0.25em] mb-3">{t('aboutPage.whoWeAre')}</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                {t('aboutPage.storyTitle')}
              </h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  {t('aboutPage.storyP1a')} <strong className="text-charcoal">سکھر، سندھ</strong>{' '}
                  {t('aboutPage.storyP1b')} <strong className="text-charcoal">کیلیفورنیا بادام</strong>,{' '}
                  <strong className="text-charcoal">ایرانی پستہ</strong>,{' '}
                  <strong className="text-charcoal">میڈجول کھجور</strong>, ہنزہ خوبانی، کاجو، اخروٹ{' '}
                  {t('aboutPage.storyP1c')}
                </p>
                <p>{t('aboutPage.storyP2')}</p>
                <p>{t('aboutPage.storyP3')}</p>
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <span className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-charcoal">
                  <Truck className="w-4 h-4 text-wine" /> {t('aboutPage.badgeNationwide')}
                </span>
                <span className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-charcoal">
                  <Gift className="w-4 h-4 text-wine" /> {t('aboutPage.badgeHampers')}
                </span>
                <span className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-charcoal">
                  <Clock className="w-4 h-4 text-wine" /> {t('aboutPage.badgeReturns')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey timeline */}
        <section className="bg-sand/50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <div className="text-center mb-12">
              <p className="text-wine text-xs font-bold uppercase tracking-[0.25em] mb-3">{t('aboutPage.journeyKicker')}</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">{t('aboutPage.journeyTitle')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {JOURNEY.map((step, i) => (
                <div key={step.titleKey} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-wine text-white flex items-center justify-center font-serif font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-wine text-xs font-bold uppercase tracking-widest">{t(step.yearKey)}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-2">{t(step.titleKey)}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t(step.textKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="text-center mb-12">
            <p className="text-wine text-xs font-bold uppercase tracking-[0.25em] mb-3">{t('aboutPage.valuesKicker')}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">{t('aboutPage.valuesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.titleKey} className="bg-white rounded-2xl border border-gray-200 p-7 text-center hover:border-wine/30 hover:shadow-xl transition-all duration-300">
                  <span className="w-14 h-14 mx-auto bg-sand rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-dryfruit" />
                  </span>
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-2">{t(value.titleKey)}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t(value.textKey)}</p>
                </div>
              )
            })}
          </div>
        </section>


        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <div className="bg-wine text-ivory rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-wine-deep/50 blur-2xl" />
            <Sparkles className="w-8 h-8 mx-auto text-sand mb-4 relative" />
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 relative">
              {t('aboutPage.ctaTitle')}
            </h2>
            <p className="text-ivory/80 text-sm max-w-xl mx-auto mb-7 relative">
              {t('aboutPage.ctaText')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link
                href="/collections/all-products"
                className="inline-block bg-white text-wine font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-sand transition shadow-md"
              >
                {t('aboutPage.ctaShopAll')}
              </Link>
              <Link
                href="/pages/outlets"
                className="inline-block border-2 border-white text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-wine-deep transition"
              >
                <MapPin className="inline w-3.5 h-3.5 mr-1" />
                {t('aboutPage.ctaFindOutlets')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
'use client';

import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import Marquee from '@/components/home/Marquee';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import ProductCarousel from '@/components/home/ProductCarousel';
import MidBanners from '@/components/home/MidBanners';
import VideoCarousel from '@/components/home/VideoCarousel';
import TrustBadges from '@/components/home/TrustBadges';
import ContactBlock from '@/components/home/ContactBlock';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        <HeroSlider />
        <Marquee />
        <CategoryCarousel title={t('home.shopByCategory')} />
        <ProductCarousel title={t('home.bestSellers')} categoryFilter="best-selling" />
        <MidBanners />
        <ProductCarousel title={t('home.newArrivals')} categoryFilter="new-arrivals" />
        <VideoCarousel />
        <ReviewCarousel />
        <TrustBadges />
        <ContactBlock />
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}
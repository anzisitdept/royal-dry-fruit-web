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

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        <HeroSlider />
        <Marquee />
        <CategoryCarousel title="Shop by Category" />
        <ProductCarousel title="Best Sellers" categoryFilter="best-selling" />
        <MidBanners />
        <ProductCarousel title="New Arrivals" categoryFilter="new-arrivals" />
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
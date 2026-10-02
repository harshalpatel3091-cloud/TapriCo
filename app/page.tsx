import TopTicker from '@/components/TopTicker';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import MidMarquee from '@/components/MidMarquee';
import MenuSection from '@/components/MenuSection';
import ChaiBuilder from '@/components/ChaiBuilder';
import BrewSection from '@/components/BrewSection';
import GallerySection from '@/components/GallerySection';
import ReviewsSection from '@/components/ReviewsSection';
import FindUsSection from '@/components/FindUsSection';
import SiteFooter from '@/components/SiteFooter';
import CartDrawer from '@/components/CartDrawer';
import Awning from '@/components/Awning';

export default function Home() {
  return (
    <>
      <TopTicker />
      <SiteHeader />
      <Awning id="top" />
      <HeroSection />
      <Awning flip />
      <MidMarquee />
      <MenuSection />
      <ChaiBuilder />
      <BrewSection />
      <GallerySection />
      <ReviewsSection />
      <FindUsSection />
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
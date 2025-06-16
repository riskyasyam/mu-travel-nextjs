import HeroSection from '@/components/landing/hero-section';
import FeatureSection from '@/components/landing/feature-section';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
}
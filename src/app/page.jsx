import PublicNavbar from "@/components/shared/public-navbar";
import HeroSection from '@/components/landing/hero-section';
import AboutSection from "@/components/landing/about-section";
import CtaTestimonialSection from "@/components/landing/cta-testimonial-section"; 
import AdvantageSection from "@/components/landing/advantage-section";
import FeatureSection from '@/components/landing/feature-section';
import PaketSection from '@/components/landing/paket-section';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';

export default function LandingPage() {
  return (
    <div>
      <PublicNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CtaTestimonialSection />
        <AdvantageSection />
        <PaketSection />
        {/* <FeatureSection /> */}
        {/* ... Letakkan seksi landing page lainnya di sini */}
      </main>
      {/* Mungkin Anda juga punya PublicFooter terpisah */}
    </div>
  );
}
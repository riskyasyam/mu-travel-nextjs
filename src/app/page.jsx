import PublicNavbar from "@/components/shared/public-navbar";
import HeroSection from '@/components/landing/hero-section';
import AboutSection from "@/components/landing/about-section";
import CtaTestimonialSection from "@/components/landing/cta-testimonial-section"; 
import AdvantageSection from "@/components/landing/advantage-section";
import PaketSection from '@/components/landing/paket-section';
import InclusionSection from '@/components/landing/inclusions-section';
import TestimonialSection from '@/components/landing/testimonial-section';
import ContactSection from '@/components/landing/contact-section';
import Footer from '@/components/shared/footer';
import DocumentationGallery from "@/components/landing/documentation-gallery";
import FounderSection from "@/components/landing/founder-section";
import { getPaketLandingPage } from "@/app/lib/actions";


export default async function LandingPage() {

  const paketData = await getPaketLandingPage();

  return (
    <div>
      <PublicNavbar variant="transparent" />
      <main>
        <HeroSection />
        <AboutSection />
        <CtaTestimonialSection />
        <AdvantageSection />
        <PaketSection paketUmroh={paketData} />
        <InclusionSection />
        <DocumentationGallery />
        <FounderSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
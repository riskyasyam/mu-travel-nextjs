import PublicNavbar from "@/components/shared/public-navbar";
import Footer from "@/components/shared/footer";
import HeroSection from '@/components/landing/hero-section';
import AboutSection from "@/components/landing/about-section";
import AdvantagesSection from "@/components/landing/advantages-section";
import PaketSection from '@/components/landing/paket-section';
import DocumentationGallery from "@/components/landing/documentation-gallery";
import TestimonialSection from '@/components/landing/testimonial-section';
import FounderSection from "@/components/landing/founder-section";
import ContactSection from '@/components/landing/contact-section';

// 1. Hapus 'async' karena halaman ini tidak lagi mengambil data di server
export default function LandingPage() {

  // 2. Hapus logika pengambilan data dari sini
  // const paketData = await getPaketLandingPage();

  return (
    <div>
      <PublicNavbar variant="transparent" />
      <main>
        <HeroSection />
        <AboutSection />
        <AdvantagesSection />
        {/* 3. Panggil semua komponen tanpa mengirim props data */}
        <PaketSection />
        <DocumentationGallery />
        <TestimonialSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

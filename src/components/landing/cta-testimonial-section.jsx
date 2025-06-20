'use client'; // <-- 1. Jadikan Client Component

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // <-- 2. Impor motion

const CtaTestimonialSection = () => {
  // Varian untuk container utama (grid)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Jeda antara animasi kolom kiri dan kanan
      },
    },
  };

  // Varian untuk item (kolom)
  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  // Varian untuk setiap teks di dalam kolom kanan
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative bg-white py-20 lg:h-[634px] lg:py-0 flex items-center">
      {/* Gambar Latar Belakang - sekaligus diperbaiki ke sintaks baru */}
      <Image
        src="/images/bg-cta-testi.png"
        alt="Latar Belakang Testimoni"
        fill
        className="object-cover z-0"
      />

      {/* Konten Utama */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Gambar Kartu Testimoni (diberi animasi) */}
          <motion.div variants={columnVariants}>
            <Image
              src="/images/img-cta.png"
              alt="Testimoni Jamaah MU Travel"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Kolom Kanan: Teks & Tombol (diberi animasi bertingkat) */}
          <motion.div variants={columnVariants} className="text-white">
            <motion.h2 variants={textItemVariants} className="text-4xl md:text-5xl font-bold leading-tight font-['var(--font-mermaid)']">
              Ribuan Jamaah Sudah Pernah Mencoba
            </motion.h2>
            <motion.p variants={textItemVariants} className="mt-6 text-base text-gray-200 leading-relaxed">
              Banyak jamaah MU Travel yang mengakui travel ini melayani jamaah dengan sangat baik, sabar. Banyak juga yang bilang fasilitas yang didapatkan sesuai dengan apa yang mereka inginkan. Maka tunggu apalagi? Buat perjalanan ibadah anda sempurna
            </motion.p>
            <motion.div variants={textItemVariants} className="mt-8">
              <Link
                href="/kontak"
                className="inline-block px-8 py-3 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-[#EAC84C] to-[#D4802A] hover:opacity-90 transition-opacity"
              >
                Hubungi Kami
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaTestimonialSection;
'use client';

import Image from 'next/image';
import GradientOutlineButton from '@/components/ui/gradient-outline-button';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const AdvantagesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="tentang" className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Kolom Kiri: Teks & Tombol */}
          {/* Di mobile urutan ke-2, di desktop urutan ke-1 */}
          <motion.div variants={itemVariants} className="text-gray-800 text-center md:text-left order-2 md:order-1">
            <h2 className="font-['var(--font-mermaid)'] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight antialiased">
              “Berangkat umroh dulu, <br />
              Bayar saat pulang”
            </h2>
            <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
              MU Travel adalah nama singkatan dari PT. Mukhtara Indonesia Utama yang fokus pada perjalanan ibadah umroh dan halal tour. MU Travel adalah sebuah perusahaan travel umroh yang berpusat di Kota Jember. MU Travel kini hadir di Balikpapan untuk menjadi jembatan ibadah Anda. Kami memahami kebutuhan masyarakat Kalimantan, memberikan kemudahan konsultasi, kepastian keberangkatan, dan layanan terpercaya langsung dari kota Anda.
            </p>
            <motion.div
              className="mt-8 flex justify-center md:justify-start"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientOutlineButton 
                href="https://wa.me/6281251112909"
                text="Hubungi Kami"
                className="font-bold bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Kolom Kanan: Gambar */}
          {/* Di mobile urutan ke-1, di desktop urutan ke-2 */}
          <motion.div variants={imageVariants} className="relative flex items-center justify-center order-1 md:order-2">
             <Image 
                src="/images/about-img.png"
                alt="Tentang MU Travel"
                width={550}
                height={550}
                className="w-full h-auto"
             />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
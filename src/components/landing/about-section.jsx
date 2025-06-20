'use client';

import Image from 'next/image';
import GradientOutlineButton from '@/components/ui/gradient-outline-button';
import { motion } from 'framer-motion';

const AdvantagesSection = () => { // Ganti nama ini jika perlu
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
        ease: "easeOut", // <-- Perbaikan di sini
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
        ease: "easeOut", // <-- Perbaikan di sini
      },
    },
  };

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Kolom Kiri: Teks & Tombol */}
          <motion.div variants={itemVariants} className="text-gray-800">
            {/* ... (kode h2, p, dan button Anda tetap sama) ... */}
            <h2 className="font-['var(--font-mermaid)'] text-4xl md:text-5xl font-bold leading-tight">
              “Berangkat umroh dulu, <br />
              Bayar saat pulang”
            </h2>
            <p className="mt-6 text-lg text-black font-poppins leading-relaxed">
              MU Travel adalah nama singkatan dari PT. Mukhtara Indonesia Utama yang fokus pada perjalanan ibadah umroh dan halal tour. MU Travel adalah sebuah perusahaan travel umroh yang berpusat di Kota Jember. MU Travel kini hadir di Balikpapan untuk menjadi jembatan ibadah Anda. Kami memahami kebutuhan masyarakat Kalimantan, memberikan kemudahan konsultasi, kepastian keberangkatan, dan layanan terpercaya langsung dari kota Anda
            </p>
            <div className="">
              <GradientOutlineButton 
                href="https://wa.me/6281234567890"
                text="Hubungi Kami"
                className="font-bold bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent"
              />
            </div>
          </motion.div>

          {/* Kolom Kanan: Gambar */}
          <motion.div variants={imageVariants} className="relative flex items-center justify-center">
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
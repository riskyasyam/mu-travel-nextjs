'use client'; // <-- 1. Jadikan Client Component

import Image from 'next/image';
import GradientOutlineButton from '@/components/ui/gradient-outline-button';
import { motion } from 'framer-motion'; // <-- 2. Impor motion

const HeroSection = () => {

  // 3. Definisikan varian animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // <-- Memberi jeda antar animasi anak-anaknya
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // <-- Posisi awal: 20px di bawah & transparan
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7, // Durasi animasi
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src="/images/background-hero.png"
        alt="Latar Belakang Ka'bah di Malam Hari"
        fill
        className="object-cover z-0"
        quality={85}
        priority
      />
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Konten Teks dengan Animasi */}
      {/* 4. Ganti 'div' menjadi 'motion.div' dan terapkan animasi */}
      <motion.div
        className="relative z-20 text-center flex flex-col items-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="font-poppins text-xl font-bold tracking-wider bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
          PELAYANAN NYAMAN IBADAH TENANG
        </motion.p>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold my-4 uppercase flex flex-col items-center gap-4">
          <span>
            Bersama{' '}
            <span className="bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
              MU Travel
            </span>
          </span>
          <span>
            Wujudkan Mimpi Anda!
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className=" text-xl bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent font-bold font-poppins">
          MU TRAVEL CABANG BALIKPAPAN
        </motion.p>

        <motion.div variants={itemVariants}>
          <GradientOutlineButton
            href="https://wa.me/6281234567890" // Ganti dengan nomor Anda
            text="Hubungi WhatsApp"
            className="text-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
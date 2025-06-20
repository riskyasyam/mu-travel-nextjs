'use client'; // <-- 1. Jadikan Client Component

import AdvantageCard from "./advantage-card";
import { motion } from 'framer-motion'; // <-- 2. Impor motion

const AdvantagesSection = () => {
  const advantages = [
    { icon: "/images/trusted.svg", title: "Terpercaya", description: "Sudah ribuan jamaah yang mempercayai dan menggunakan MU Travel sebagai langkah untuk menuju Rumah Allah." },
    { icon: "/images/money.svg", title: "Angsuran Ringan", description: "DP dan Angsuran dalam pembayaran paket umroh dapat dilakukan dengan mudah." },
    { icon: "/images/kaaba.svg", title: "Bayar Nanti", description: "Umroh dulu, Bayar belakangan. Sehingga tidak perlu khawatir lagi dan anda dapat dengan nyaman beribadah." },
    { icon: "/images/ramah.svg", title: "Ramah", description: "Sudah ribuan jamaah yang mempercayai dan menggunakan MU Travel sebagai langkah untuk menuju Rumah Allah." },
  ];

  // 3. Definisikan varian animasi
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Jeda antar animasi kartu
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-serif text-lg font-medium bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
            Kenapa sih harus dengan kami?
          </p>
          <h2 className="font-['var(--font-mermaid)'] antialiased mt-2 text-4xl md:text-5xl font-extrabold text-gray-900">
            Keuntungan Travel Kami
          </h2>
        </motion.div>

        {/* 4. Terapkan motion pada grid container */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {advantages.map((item) => (
            // 5. Bungkus setiap kartu dengan motion.div
            <motion.div key={item.title} variants={itemVariants}>
              <AdvantageCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
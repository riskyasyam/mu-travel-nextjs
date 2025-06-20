'use client'; // <-- 1. Jadikan Client Component

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPaketLandingPage } from '@/app/lib/actions'; // <-- 2. Impor Server Action
import PaketCard from './paket-card';

const PaketSection = () => {
  // 3. Buat state untuk menampung data paket
  const [paketUmroh, setPaketUmroh] = useState([]);

  // 4. Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    async function loadPaket() {
      const data = await getPaketLandingPage();
      setPaketUmroh(data);
    }
    loadPaket();
  }, []);

  // 5. Definisikan varian animasi
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-serif text-lg font-medium bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent">
            Lihat - Pilih - Hubungi Kontak - Pesan
          </p>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 font-['var(--font-mermaid)']">
            Paket Umroh Pilihan Terbaik
          </h2>
        </motion.div>

        {/* 6. Terapkan motion pada grid container */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {paketUmroh.map((paket) => (
            <motion.div key={paket.id} variants={itemVariants}>
              <PaketCard paket={paket} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PaketSection;
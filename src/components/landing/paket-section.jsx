'use client'; 

import { useEffect, useState } from 'react'; // <-- 1. Impor hook
import { motion } from 'framer-motion';
import api from '@/lib/api'; // <-- 2. Impor API client kita
import PaketCard from './paket-card';

const PaketSection = () => {
  // 3. Buat state untuk menampung data paket dan status loading
  const [paketUmroh, setPaketUmroh] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Ambil data dari API Laravel saat komponen pertama kali dimuat
  useEffect(() => {
    async function loadPaket() {
      try {
        const response = await api.get('/pakets/landing');
        setPaketUmroh(response.data);
      } catch (error) {
        console.error("Gagal mengambil data paket dari API:", error);
        // Anda bisa menambahkan state untuk error di sini jika perlu
      } finally {
        setIsLoading(false);
      }
    }
    loadPaket();
  }, []); // Array dependensi kosong agar hanya berjalan sekali

  // Varian animasi (tetap sama)
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
  
  // Tampilkan pesan loading jika data sedang diambil
  if (isLoading) {
    return (
        <section id="paket" className="bg-slate-50 py-20 md:py-28 text-center">
            <p className="text-gray-500">Memuat paket umroh...</p>
        </section>
    );
  }

  return (
    <section id="paket" className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-serif text-lg font-medium bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent">
            Lihat - Pilih - Hubungi Kontak - Pesan
          </p>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 font-poppins">
            Paket Umroh Pilihan Terbaik
          </h2>
        </motion.div>

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
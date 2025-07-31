'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import GradientOutlineButton from '@/components/ui/gradient-outline-button'; // <-- 1. Impor tombol
import { MessageCircle } from 'lucide-react'; // <-- 2. Impor ikon

const FounderSection = () => {
  return (
    <section 
      style={{ backgroundImage: `url(/images/bg-founder.png)` }}
      className="bg-cover bg-center bg-no-repeat py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">

          {/* Kolom Kiri: Foto kedua */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-56 h-72 md:w-64 md:h-80 relative self-center shadow-2xl rounded-2xl mx-auto"
          >
            <Image
              src="/images/kacab2.jpg"
              alt="Wakil Kepala Cabang"
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>
          
          {/* Kolom Tengah: Foto utama */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative w-80 h-[450px] md:w-96 md:h-[540px] shadow-2xl rounded-2xl -mx-8 z-10 mx-auto"
          >
            <Image
              src="/images/bu_irma.jpg"
              alt="Kepala Cabang"
              fill
              className="object-cover rounded-2xl"
            />
          </motion.div>

          {/* Kolom Kanan: Kartu teks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="bg-white p-8 md:p-10 lg:pl-20 rounded-2xl shadow-2xl max-w-lg text-left mx-auto lg:mx-0"
          >
            <div className='mx-0 lg:mx-5'>
              <p className="font-serif text-orange-500">Hj.IRMAYANA.SH.CTMR</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                KEPALA CABANG
              </h2>
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                Kami adalah tim yang berdedikasi untuk memberikan pengalaman ibadah umroh terbaik dari Balikpapan. Dengan sepenuh hati, kami memastikan setiap detail perjalanan Anda aman, nyaman, dan penuh makna.
              </p>
              {/* --- INI BAGIAN YANG DIUBAH --- */}
              <div className="">
                <GradientOutlineButton 
                  href="https://wa.me/6281251112909" // Ganti dengan nomor Anda
                  text="Pesan Sekarang"
                  className="font-bold bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
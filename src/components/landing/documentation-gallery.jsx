// File: src/components/landing/documentation-gallery.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import api from '@/lib/api'; // <-- 1. Impor API client kita

const DocumentationGallery = () => {
  // 2. Buat state untuk menampung data dari database dan status loading
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Ambil data dari API Laravel saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchDokumentasi = async () => {
      try {
        const response = await api.get('/dokumentasi/landing');
        setImages(response.data);
      } catch (error) {
        console.error("Gagal mengambil data dokumentasi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDokumentasi();
  }, []);

  const fadeUpVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  // Tampilkan pesan loading atau jangan render apa-apa jika data belum ada
  if (isLoading) {
    return (
        <section className="bg-slate-50 py-20 md:py-28 text-center">
            <p className="text-gray-500">Memuat galeri dokumentasi...</p>
        </section>
    );
  }

  // Jangan render section jika tidak ada gambar sama sekali
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
        >
          <p className="font-serif text-base font-medium bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent tracking-widest uppercase">
            Galeri Perjalanan
          </p>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900">
            Dokumentasi Jamaah
          </h2>
        </motion.div>

        <div className="w-full max-w-5xl mt-16">
          <motion.div 
            className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={images[activeIndex].foto_url}
              alt={images[activeIndex].deskripsi || 'Dokumentasi Jamaah'}
              className="w-full h-full object-cover transition-opacity duration-300 rounded-xl"
              key={activeIndex}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {images.map((image, index) => (
                  <CarouselItem key={image.id} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5">
                    <div
                      className="p-1 cursor-pointer group"
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className={`relative aspect-square rounded-md overflow-hidden transition-all duration-300 
                        ${index === activeIndex ? 'ring-4 ring-offset-2 ring-orange-400' : 'opacity-70 group-hover:opacity-100'}`
                      }>
                        <img
                          src={image.foto_url}
                          alt={image.deskripsi || 'Thumbnail Dokumentasi'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DocumentationGallery;
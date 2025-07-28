'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import api from '@/lib/api'; // <-- 1. Impor API client kita

const TestimonialSection = () => {
  // 2. Buat state untuk menampung data dan status loading
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Ambil data dari API Laravel saat komponen dimuat
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonis/landing');
        setTestimonials(response.data);
      } catch (error) {
        console.error("Gagal mengambil data testimoni:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const fadeUpVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  // Tampilkan pesan loading jika data masih diambil
  if (isLoading) {
    return (
        <section className="bg-white py-20 md:py-28 text-center">
            <p className="text-gray-500">Memuat testimoni...</p>
        </section>
    );
  }
  
  // Jangan render section jika tidak ada testimoni
  if (testimonials.length === 0) {
    return null; 
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Testimoni Jamaah.
          </h2>
          <p className="font-serif text-base font-medium bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent tracking-widest uppercase">
            Dapatkan promo potongan harga menarik untuk perjalanan ibadah umroh sahabat semua.
          </p>
        </motion.div>

        <motion.div
          className="w-full mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testi) => (
                <CarouselItem key={testi.id} className="pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div className="p-1">
                    <div className="relative aspect-[9/19] overflow-hidden rounded-2xl shadow-lg border">
                      <img
                        src={testi.foto_url}
                        alt={testi.deskripsiTestimoni || 'Testimoni MU Travel'}
                        className="w-full h-full object-contain bg-black"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import InclusionCard from "./inclusion-card"; // <-- 1. Impor komponen yang benar

const InclusionsSection = () => {
  const inclusions = [
    { icon: "/images/inclusions/plane.svg", title: "Tiket Pesawat PP", description: "Keberangkatan dari kota Anda dengan maskapai terbaik." },
    { icon: "/images/inclusions/passport.svg", title: "Visa Umroh Resmi", description: "Pengurusan visa umroh yang cepat dan terjamin." },
    { icon: "/images/inclusions/hotel.svg", title: "Hotel Berbintang", description: "Akomodasi nyaman dekat dengan Masjidil Haram & Nabawi." },
    { icon: "/images/inclusions/bus.svg", title: "Transportasi Bus AC", description: "Bus eksekutif untuk semua perjalanan antar kota suci." },
    { icon: "/images/inclusions/food.svg", title: "Makan 3x Sehari", description: "Menu makanan cita rasa Indonesia yang lezat dan halal." },
    { icon: "/images/inclusions/tour-leader.svg", title: "Muthawwif & Tour Leader", description: "Dibimbing oleh pembimbing ibadah yang berpengalaman." },
  ];

  const [api, setApi] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    updateActiveIndex();
    api.on("select", updateActiveIndex);
    api.on("reInit", updateActiveIndex);
    return () => {
      api.off("select", updateActiveIndex);
      api.off("reInit", updateActiveIndex);
    };
  }, [api, updateActiveIndex]);

  const fadeUpVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    // 2. Tambahkan 'relative' pada section
    <section className="relative py-20 md:py-28 overflow-x-hidden">
      {/* 3. Tambahkan Gambar Latar dan Overlay */}
      <Image
        src="/images/bg-inclusions-2.jpg"
        alt="Latar Belakang"
        fill
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <motion.div
          className="text-center"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="font-serif text-base font-medium bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent tracking-widest uppercase">
            Fasilitas Terbaik
          </p>
          {/* 4. Ubah warna teks judul menjadi putih */}
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-white">
            Apa Saja yang Anda Dapatkan?
          </h2>
        </motion.div>

        <motion.div
          className="w-full max-w-6xl mt-16"
          // ... (properti motion tetap sama)
        >
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }} className="w-full">
            <CarouselContent className="-ml-8">
              {inclusions.map((item, index) => (
                <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3">
                  <div className={`p-1 transition-all duration-500 ease-out 
                    ${index === activeIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}`
                  }>
                    {/* 5. Panggil komponen yang benar */}
                    <InclusionCard item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="bg-white/30 text-white hover:bg-white/50 border-none" />
                <CarouselNext className="bg-white/30 text-white hover:bg-white/50 border-none" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default InclusionsSection;

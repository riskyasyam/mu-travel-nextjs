'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api'; // Menggunakan axios client
import PublicNavbar from '@/components/shared/public-navbar';
import Footer from '@/components/shared/footer';
import StarRating from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckCircle2, Plane, Hotel, BookOpen, Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PaketDetailPage({ params }) {
  const { id } = params;
  const [paket, setPaket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data dari API Laravel saat komponen dimuat
  useEffect(() => {
    if (id) {
      const fetchPaket = async () => {
        try {
          const response = await api.get(`/pakets/${id}`);
          setPaket(response.data);
        } catch (error) {
          console.error("Gagal mengambil detail paket:", error);
          // Handle not found error from API if needed
        } finally {
          setIsLoading(false);
        }
      };
      fetchPaket();
    }
  }, [id]);

  // Tampilkan pesan loading
  if (isLoading) {
    return (
        <div className="bg-white min-h-screen">
            <PublicNavbar variant="solid" />
            <div className="text-center py-40">Memuat detail paket...</div>
            <Footer />
        </div>
    );
  }

  // Tampilkan pesan jika paket tidak ditemukan
  if (!paket) {
    return (
        <div className="bg-white min-h-screen">
            <PublicNavbar variant="solid" />
            <div className="text-center py-40">
                <h1 className="text-2xl font-bold">Paket Tidak Ditemukan</h1>
                <p className="text-muted-foreground">Paket yang Anda cari mungkin sudah tidak tersedia.</p>
                <Button asChild className="mt-4">
                    <Link href="/">Kembali ke Home</Link>
                </Button>
            </div>
            <Footer />
        </div>
    );
  }

  // Setelah data siap, siapkan variabel lain
  const whatsAppNumber = "6281251112909";
  const message = `Assalamualaikum, saya ingin bertanya tentang Paket Umroh "${paket.namaPaket}" keberangkatan tanggal ${new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`;
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
  const fasilitas = [ "Tiket Pesawat PP", "Visa Umroh Resmi", "Hotel Bintang 5", "Handling Service", "Perlengkapan Umroh", "Ziarah", "Makan 3x Sehari", "Muthawwif", "Tour Leader", "Snack & Welcome Food", "Manasik Umroh", "Air Zamzam 5 ltr"];

  return (
    <div className="bg-white">
      <PublicNavbar variant="solid" />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* KOLOM KIRI: GAMBAR */}
            <div className="sticky top-28">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
                <img
                  src={paket.foto_url}
                  alt={`Foto utama ${paket.namaPaket}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* KOLOM KANAN: DETAIL & AKSI */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-orange-600">MU Travel Balikpapan</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">{paket.namaPaket}</h1>
                <div className="mt-2 flex items-center gap-4">
                  <StarRating rating={paket.ratingHotelMakkah} />
                  <span className="text-sm text-gray-500">({paket.sisaKursi} sisa kuota)</span>
                </div>
              </div>

              <p className="text-4xl font-bold text-gray-800">
                Rp {Number(paket.harga).toLocaleString('id-ID')}
              </p>

              <div className="text-sm text-gray-600 space-y-2 border-t pt-6">
                 <div className="flex items-center gap-3"><Calendar size={16} /><span>Keberangkatan: {new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                 <div className="flex items-center gap-3"><Clock size={16} /><span>Durasi: {paket.durasi} Hari</span></div>
                 <div className="flex items-center gap-3"><Plane size={16} /><span>Maskapai: {paket.pesawat}</span></div>
              </div>

              <Button asChild size="lg" className="w-full text-base bg-orange-500 hover:bg-orange-600">
                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">Booking via WhatsApp</a>
              </Button>
              
              <div className="border-t pt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold text-base">Deskripsi Paket</AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm max-w-none text-gray-600">
                        {paket.deskripsi}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold text-base">Fasilitas Termasuk</AccordionTrigger>
                    <AccordionContent>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-600 pt-2 text-sm">
                          {fasilitas.map(item => (
                              <li key={item} className="flex items-center gap-2">
                                  <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold text-base">Detail Akomodasi</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-gray-600 text-sm">
                          <div className="flex justify-between"><span>Hotel Makkah:</span><span className="font-semibold text-right">{paket.hotelMakkah}</span></div>
                          <div className="flex justify-between"><span>Hotel Madinah:</span><span className="font-semibold text-right">{paket.hotelMadinah}</span></div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

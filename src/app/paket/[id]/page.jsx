import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import PublicNavbar from '@/components/shared/public-navbar';
import Footer from '@/components/shared/footer';
import StarRating from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckCircle2, Plane, Hotel, BookOpen } from 'lucide-react';


const prisma = new PrismaClient();

async function getPaket(id) {
  const paket = await prisma.paket.findUnique({
    where: { id: parseInt(id) },
  });
  if (!paket) {
    notFound();
  }
  return paket;
}

export default async function PaketDetailPage({ params }) {
  const paket = await getPaket(params.id);

  const airlineName = paket.pesawat.toLowerCase();
  const airlineLogos = {
    'lion air': '/images/airlines/lion-air.png',
    'garuda indonesia': '/images/airlines/garuda-indonesia.png',
    'citilink': '/images/airlines/citilink.png',
    'batik air': '/images/airlines/batik-air.png',
    'saudia': '/images/airlines/saudia.png',
  };
  const logoPath = airlineLogos[airlineName] || '/images/airlines/default-airline.png';
  
  const whatsAppNumber = "6281251112909";
  const message = `Assalamualaikum, saya ingin bertanya tentang Paket Umroh "${paket.namaPaket}" keberangkatan tanggal ${new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`;
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;

  const fasilitas = [
    "Tiket Pesawat PP", "Visa Umroh Resmi", "Hotel Berbintang", "Full Handling Service",
    "Koper dan Perlengkapan Umroh", "Ziarah Makkah & Madinah", "Makan 3x Sehari",
    "Muthawwif / Muthawwifah", "Tour Leader", "Welcome Food & Snack",
    "Manasik Umroh", "Air Zamzam 5 ltr"
  ];

  return (
    <div className="bg-slate-50">
      <PublicNavbar variant="solid" /> 
      <main className="pt-24">

        {/* --- BAGIAN UTAMA DENGAN LAYOUT BARU --- */}
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
                {/* Kolom Kiri (lebih besar) untuk Konten */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Judul dan Info Singkat */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{paket.namaPaket}</h1>
                        <p className="text-gray-500 mt-2">Keberangkatan: {new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm"><Clock size={16} className="text-orange-500"/> Durasi: <span className="font-semibold">{paket.durasi} Hari</span></div>
                            <div className="flex items-center gap-2 text-sm"><Users size={16} className="text-orange-500"/> Kuota: <span className="font-semibold">{paket.sisaKursi} Kursi</span></div>
                            <div className="flex items-center gap-2 text-sm"><Plane size={16} className="text-orange-500"/> Maskapai: <span className="font-semibold capitalize">{paket.pesawat}</span></div>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={20}/> Deskripsi Paket</h3>
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            {paket.deskripsi}
                        </div>
                    </div>

                    {/* Harga Termasuk */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Harga Sudah Termasuk</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-600">
                            {fasilitas.map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Kolom Kanan (lebih kecil) untuk Gambar Brosur & Booking */}
                <div className="lg:col-span-2">
                    <div className="sticky top-28 space-y-6">
                        {/* Gambar Brosur */}
                        <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg border">
                        {/* ^--- Kita kembalikan aspect ratio untuk wadah */}
                            <Image
                                src={paket.fotoUrl}
                                alt={`Brosur ${paket.namaPaket}`}
                                fill
                                className="object-contain bg-white" // <-- Pastikan menggunakan object-contain
                            />
                        </div>
                        {/* Kartu Booking */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border">
                            <p className="text-sm text-gray-500">Harga Mulai</p>
                            <p className="text-4xl font-bold text-orange-500 mb-4">Rp {paket.harga.toLocaleString('id-ID')}</p>
                            <Button asChild size="lg" className="w-full text-base bg-orange-500 hover:bg-orange-600">
                                <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">Konsultasi via WhatsApp</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/ui/star-rating';
import { Clock, Users } from 'lucide-react';

const airlineLogos = {
  'lion air': '/images/airlines/lion-air.png',
  'garuda indonesia': '/images/airlines/garuda-indonesia.png',
  'citilink': '/images/airlines/citilink.png',
  'batik air': '/images/airlines/batik-air.png',
  'saudia': '/images/airlines/saudia.png',
};

const PaketCard = ({ paket }) => {
  const airlineName = paket.pesawat.toLowerCase();
const logoPath = airlineLogos[airlineName] || '/images/airlines/default-airline.png';

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
        <img
          src={paket.foto_url}
          alt={`Foto ${paket.namaPaket}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-800">{paket.namaPaket}</h3>
        <p className="text-sm text-slate-500 mb-4">{new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        
        <div className="flex items-center gap-3 text-xs mb-4">
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4802A] to-[#EAC84C] text-white font-semibold px-3 py-1 rounded-md">
            <Clock size={14} /> {paket.durasi} Hari
          </span>
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4802A] to-[#EAC84C] text-white font-semibold px-3 py-1 rounded-md">
            <Users size={14} /> {paket.sisaKursi} Kursi
          </span>
        </div>

        <div className="text-sm space-y-2 text-slate-700 border-t pt-4 mb-4">
          <div className="flex justify-between"><span>Hotel Madinah: {paket.hotelMadinah}</span> <StarRating rating={paket.ratingHotelMadinah} /></div>
          <div className="flex justify-between"><span>Hotel Makkah: {paket.hotelMakkah}</span> <StarRating rating={paket.ratingHotelMakkah} /></div>
        </div>
        
        <div className="mt-auto border-t pt-4 flex justify-between items-end">
          <div className="relative w-24 h-10">
            <Image
              src={logoPath}
              alt={paket.pesawat}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Harga mulai</p>
            <p className="text-lg font-bold text-orange-500">Rp {Number(paket.harga).toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* --- TOMBOL KEMBALI MENGARAH KE HALAMAN DETAIL --- */}
        <Link 
          href={`/paket/${paket.id}`}
          className="mt-4 block w-full text-center px-4 py-2 rounded-lg font-semibold text-orange-500 border-2 border-orange-400 hover:bg-orange-400 hover:text-white transition-colors"
        >
          Lihat Detail Paket
        </Link>
      </div>
    </div>
  );
};

export default PaketCard;
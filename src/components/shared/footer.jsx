import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Kolom 1: Logo dan Deskripsi */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="MU Travel Logo" width={40} height={40} />
              <span className="font-bold text-lg text-white">MU Travel</span>
            </Link>
            <p className="text-sm">
              Sahabat perjalanan ibadah Anda yang amanah, melayani dengan sepenuh hati dari Balikpapan untuk seluruh Kalimantan.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="space-y-4">
            <h3 className="font-bold text-base bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#paket" className="hover:text-white transition-colors">Paket Umroh</Link></li>
              <li><Link href="/#tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/#testimoni" className="hover:text-white transition-colors">Testimoni</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="space-y-4">
            <h3 className="font-bold text-base bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
              Hubungi Kami
            </h3>
            <address className="space-y-3 text-sm not-italic">
              <p className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Perumahan BDS 2, Blok B/36, Rt. 43, Kel. Sungai Nangka, Balikpapan Selatan, Kalimantan Timur</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} />
                <a href="mailto:info@mutravel.com" className="hover:text-white transition-colors">info@mutravel.com</a>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} />
                <a href="tel:+6281234567890" className="hover:text-white transition-colors">+62 812-5111-2909</a>
              </p>
            </address>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div className="space-y-4">
            <h3 className="font-bold text-base bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
              Ikuti Kami
            </h3>
            <p className="text-sm">Dapatkan info terbaru dan promo menarik melalui media sosial kami.</p>
            <div className="flex items-center gap-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube /></Link>
            </div>
          </div>

        </div>

        {/* Garis Pemisah dan Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MU Travel Balikpapan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
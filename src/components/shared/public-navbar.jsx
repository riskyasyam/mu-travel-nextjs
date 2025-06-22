'use client';
import Link from 'next/link';
import Image from 'next/image';
// Kita tidak lagi memakai <Button> dari shadcn untuk tombol ini
import { usePathname } from 'next/navigation';

const PublicNavbar = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Tentang MU Travel', href: '/#tentang' },
    { name: 'Paket Umroh', href: '/#paket' },
    { name: 'Alamat', href: '/#alamat' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="MU Travel Logo" width={50} height={50} />
           <div>
             <p className=" text-xl font-bold font-jakarta bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
                MU Travel Balikpapan
             </p>
             <p className="text-xs font-serif bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">PT MUKHTARA INDONESIA UTAMA</p>
             <p className="text-xs text-white font-serif">PPIU No. 91201044207990001 / 2024</p>
           </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}
              className={`text-base font-medium transition-colors
                ${pathname === link.href ? 'text-white' : 'text-gray-300 hover:text-white'}`
              }
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login Button dengan Outline Gradasi (Versi Perbaikan) */}
        <div>
          <Link
            href="/login"
            className="group relative inline-block rounded-full bg-gradient-to-r from-[#D4802A] to-[#EAC84C] p-[2px] text-base font-medium text-white transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30"
          >
            <span className="block rounded-full bg-slate-900 px-6 py-2 transition-colors duration-300 group-hover:bg-transparent">
              Login
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default PublicNavbar;
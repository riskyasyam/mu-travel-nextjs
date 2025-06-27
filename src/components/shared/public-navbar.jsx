'use client';
import { useState } from 'react'; // <-- Impor useState
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // <-- Impor Sheet
import { Menu } from 'lucide-react'; // <-- Impor ikon Menu

const PublicNavbar = ({ variant = 'transparent' }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu mobile

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Tentang MU Travel', href: '/#tentang' },
    { name: 'Paket Umroh', href: '/#paket' },
    { name: 'Alamat', href: '/#alamat' },
  ];

  // --- Logika warna dinamis (tetap sama) ---
  const isTransparent = variant === 'transparent';
  const navTextColor = isTransparent ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900';
  const activeNavTextColor = isTransparent ? 'text-white' : 'text-orange-500 font-semibold';
  const logoTextColor = isTransparent ? 'text-white' : 'text-gray-500';
  const navBg = isTransparent ? 'absolute' : 'sticky bg-white/80 backdrop-blur-md shadow-md';

  return (
    <nav className={`${navBg} top-0 left-0 right-0 z-30 py-4 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="MU Travel Logo" width={50} height={50} />
           <div>
             <p className="text-xl font-bold font-jakarta bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent">
                MU Travel Balikpapan
             </p>
             <p className={cn("text-xs font-serif", logoTextColor)}>PT MUKHTARA INDONESIA UTAMA</p>
             <p className={cn("text-xs font-serif", logoTextColor)}>PPIU No. 91201044207990001 / 2024</p>
           </div>
        </div>

        {/* Navigation Links (Untuk Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}
              className={`text-base font-medium transition-colors ${pathname === link.href ? activeNavTextColor : navTextColor}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login Button (Untuk Desktop) */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="group relative inline-block rounded-full bg-gradient-to-r from-[#D4802A] to-[#EAC84C] p-[2px] text-base font-medium"
          >
            <span className={cn("block rounded-full px-6 py-2 transition-colors duration-300", isTransparent ? "bg-slate-900 group-hover:bg-transparent" : "bg-white group-hover:bg-transparent")}>
              <span className={cn("transition-colors duration-300", isTransparent ? "text-white group-hover:text-white" : "bg-gradient-to-r from-[#D4802A] to-[#EAC84C] bg-clip-text text-transparent group-hover:text-white")}>
                Login
              </span>
            </span>
          </Link>
        </div>

        {/* --- MENU MOBILE --- */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isTransparent ? 'text-white' : 'text-gray-800'}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="bg-white p-6">
              <nav className="flex flex-col gap-6 text-lg mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-800 hover:text-orange-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)} // Tutup menu saat link diklik
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t pt-6">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                     <Button className="w-full bg-orange-500 hover:bg-orange-600">Login</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
};

export default PublicNavbar;

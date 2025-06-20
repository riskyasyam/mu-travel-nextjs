'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard, // Mengganti Home untuk lebih deskriptif
  MessageSquare, // Mengganti Bot
  PencilRuler, // Mengganti Code
  FileText,
  GalleryVertical,
  Star,
  User,
  Settings,
  LogOut,
  Sparkles, // Ikon untuk Horizon AI
} from 'lucide-react';
import { logout } from '@/app/lib/actions';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  // Menyesuaikan menu dengan contoh di gambar
  const menus = [
    { name: 'Main Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Paket Umroh', href: '/dashboard/paket', icon: MessageSquare },
    { name: 'Dokumentasi ', href: '/dashboard/dokumentasi', icon: PencilRuler },
    { name: 'Testimoni', href: '/dashboard/testimoni', icon: FileText },
  ];

  return (
    <aside className="w-72 bg-white text-black h-screen flex flex-col justify-between sticky top-0 p-4 border-r border-gray-200">
      <div>
        {/* Bagian Logo */}
        <div className="p-4 mb-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gray-900 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MU Travel</span>
          </Link>
        </div>

        {/* Bagian Menu Utama */}
        <nav className="flex flex-col gap-1">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${pathname === menu.href
                  ? 'bg-gray-900 text-white' // Style untuk link aktif (background gelap, teks putih)
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900' // Style untuk link tidak aktif
                }`
              }
            >
              <menu.icon className="h-5 w-5" />
              <span>{menu.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bagian Profil & Logout di Bawah */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between p-2 rounded-lg">
          <div className='flex items-center gap-3'>
            <Image
              src="/logo.svg"       // <-- Path ke logo Anda di folder public
              alt="Logo MU Travel"
              width={30}            // <-- Sesuaikan dengan ukuran yang diinginkan (h-9 w-9 = 36px)
              height={30}           // <-- Sesuaikan dengan ukuran yang diinginkan
              className="rounded-full" // <-- Opsional: jika ingin logo tetap bulat seperti avatar
            />
            <span className="text-sm font-semibold text-gray-900">Admin</span>
          </div>
          <form action={logout}>
             <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                <LogOut className="h-5 w-5" />
             </Button>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

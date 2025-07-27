// File: src/components/dashboard/sidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // <-- 1. Impor useRouter
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  PiggyBank,
  Package,
  Camera,
  Star,
  BarChart3,
  LogOut,
} from 'lucide-react';
import api from '@/lib/api'; // <-- 2. Impor API client kita

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter(); // <-- 3. Inisialisasi router

  const menus = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Data Jamaah', href: '/dashboard/jamaah', icon: Users },
    { name: 'Pemesanan Paket', href: '/dashboard/pemesanan', icon: ShoppingCart },
    { name: 'Tabungan Jamaah', href: '/dashboard/tabungan', icon: PiggyBank },
    { name: 'Manajemen Paket', href: '/dashboard/paket', icon: Package },
    { name: 'Dokumentasi', href: '/dashboard/dokumentasi', icon: Camera },
    { name: 'Testimoni', href: '/dashboard/testimoni', icon: Star },
    { name: 'Laporan', href: '/dashboard/laporan', icon: BarChart3 },
  ];

  // 4. Buat fungsi untuk menangani logout
  const handleLogout = async () => {
    try {
      await api.post('/logout');
      // Jika berhasil, redirect ke halaman utama
      router.push('/');
    } catch (error) {
      console.error("Gagal logout:", error);
      // Jika gagal, tetap redirect (karena token mungkin sudah tidak valid)
      router.push('/');
    }
  };

  return (
    <aside className="w-72 bg-white text-black h-screen flex flex-col justify-between sticky top-0 p-4 border-r border-gray-200">
      <div>
        {/* ... (Bagian Logo dan Menu Utama tidak berubah) ... */}
        <div className="p-4 mb-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="MU Travel Logo" width={40} height={40} />
            <span className="text-xl font-bold text-gray-900">MU Travel</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1">
          {menus.map((menu) => {
            const isActive =
              (pathname.startsWith(menu.href) && menu.href !== '/dashboard') ||
              pathname === menu.href;
            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                <menu.icon className="h-5 w-5" />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bagian Profil & Logout di Bawah */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between p-2 rounded-lg">
          <div className='flex items-center gap-3'>
            <Image src="/logo.svg" alt="Logo MU Travel" width={36} height={36} className="rounded-full" />
            <span className="text-sm font-semibold text-gray-900">Admin</span>
          </div>
          {/* 5. Ganti <form> dengan <Button> yang memanggil handleLogout */}
          <Button onClick={handleLogout} variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
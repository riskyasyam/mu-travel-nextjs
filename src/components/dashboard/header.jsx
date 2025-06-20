'use client';

import { usePathname } from 'next/navigation'; // <-- 1. Impor hook usePathname
import { Bell, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
    const pathname = usePathname(); // <-- 2. Dapatkan path URL saat ini

    // 3. Buat pemetaan dari path ke judul halaman
    const pageTitles = {
        '/dashboard': { title: 'Main Dashboard', breadcrumb: 'Main Dashboard' },
        '/dashboard/paket': { title: 'Manajemen Paket', breadcrumb: 'Paket Umroh' },
        '/dashboard/dokumentasi': { title: 'Galeri Dokumentasi', breadcrumb: 'Dokumentasi' },
        '/dashboard/testimoni': { title: 'Manajemen Testimoni', breadcrumb: 'Testimoni' },
        '/dashboard/settings': { title: 'Pengaturan Profil', breadcrumb: 'Pengaturan' },
        // Tambahkan path dan judul lain di sini jika perlu
    };

    // 4. Logika untuk menentukan judul yang akan ditampilkan
    let currentPage = { title: 'Dashboard', breadcrumb: 'Page' }; // Judul default

    if (pageTitles[pathname]) {
        currentPage = pageTitles[pathname];
    } else if (pathname.startsWith('/dashboard/paket/tambah')) {
        currentPage = { title: 'Tambah Paket Baru', breadcrumb: 'Tambah Paket' };
    } else if (pathname.startsWith('/dashboard/paket/edit')) {
        currentPage = { title: 'Edit Paket', breadcrumb: 'Edit Paket' };
    } else if (pathname.startsWith('/dashboard/dokumentasi/tambah')) {
        currentPage = { title: 'Tambah Dokumentasi', breadcrumb: 'Tambah Dokumentasi' };
    } // Tambahkan logika `else if` lain untuk halaman tambah/edit lainnya

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Breadcrumbs dan Judul Dinamis */}
                <div>
                    <span className="text-sm text-gray-500 font-medium">Pages / {currentPage.breadcrumb}</span>
                    <h1 className="text-2xl font-bold text-gray-800">{currentPage.title}</h1>
                </div>

                {/* Ikon Aksi di Kanan (tetap sama) */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-gray-600">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-600">
                        <Sun className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="AP" />
                        <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}

export default Header;
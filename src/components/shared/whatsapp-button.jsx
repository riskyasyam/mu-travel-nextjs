'use client';

import { usePathname } from 'next/navigation'; // <-- 1. Impor hook usePathname
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const pathname = usePathname(); // <-- 2. Dapatkan path URL saat ini

  // 3. Logika untuk menyembunyikan tombol
  // Jika path saat ini diawali dengan '/dashboard', jangan render apa-apa (kembalikan null).
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  // --- Konfigurasi WhatsApp (tetap sama) ---
  const whatsAppNumber = "6281251112909";
  const message = "Assalamualaikum, saya tertarik dengan paket umroh dari MU Travel. Mohon informasinya.";
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;

  // 4. Jika bukan di dashboard, render tombolnya seperti biasa
  return (
    <a
      href={whatsAppLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white font-bold px-5 py-3 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 ease-in-out"
    >
      <MessageCircle size={24} />
      <span className="hidden sm:block">Konsultasi Sekarang</span>
    </a>
  );
};

export default WhatsAppButton;
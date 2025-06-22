import { Poppins, Lora, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import WhatsAppButton from '@/components/shared/whatsapp-button'; 
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'], // Subsets yang dibutuhkan
  weight: ['400', '500', '600', '700', '800'], // Ketebalan font yang ingin Anda gunakan
  variable: '--font-poppins', // Membuat CSS variable (cara terbaik untuk Tailwind)
});

// Konfigurasi Lora (tetap sama)
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
});

// 2. Konfigurasi untuk font Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-jakarta', // <-- Variabel baru
});

const mermaid = localFont({
  src: '../fonts/Mermaid.ttf',
  variable: '--font-mermaid', // <-- Variabel baru
});


export const metadata = {
  title: 'MU Travel - Perjalanan Umroh Terpercaya',
  description: 'Wujudkan niat suci Anda ke Tanah Suci bersama kami.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${lora.variable} ${jakarta.variable} ${mermaid.variable}`}>
      <body className="bg-white subpixel-antialiased">
        <main>
          {children}
        </main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
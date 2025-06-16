import './globals.css';

export const metadata = {
  title: 'MU Travel - Perjalanan Umroh Terpercaya',
  description: 'Wujudkan niat suci Anda ke Tanah Suci bersama kami.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white">
        <main>{children}</main> {/* Di sini konten halaman (page.jsx) akan dimuat */}
      </body>
    </html>
  );
}
/** @type {import('next').NextConfig} */
const config = {
  // Konfigurasi lain yang mungkin sudah ada
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // ---> TAMBAHKAN BLOK INI <---
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**', // Izinkan semua path di dalam /storage
      },
    ],
  },
};

export default config;
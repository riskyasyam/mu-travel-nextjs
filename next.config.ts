/** @type {import('next').NextConfig} */
const config = {
  // Konfigurasi yang sudah ada
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default config;

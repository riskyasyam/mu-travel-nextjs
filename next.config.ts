/** @type {import('next').NextConfig} */
const config = {
  // Tempatkan serverActions di dalam blok experimental
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default config;
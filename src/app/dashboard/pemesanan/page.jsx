import { Suspense } from 'react';
import PemesananClient from './PemesananClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat halaman pemesanan...</div>}>
      <PemesananClient />
    </Suspense>
  );
}
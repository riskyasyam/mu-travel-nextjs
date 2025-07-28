import { Suspense } from 'react';
import TabunganClient from './TabunganClient';

export default function TabunganPage() {
  return (
    <Suspense fallback={<div className="p-8">Memuat halaman tabungan...</div>}>
      <TabunganClient />
    </Suspense>
  );
}
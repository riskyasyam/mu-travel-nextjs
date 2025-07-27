// File: src/app/dashboard/jamaah/edit/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import JamaahForm from '@/components/dashboard/jamaah-form';

// 1. Destrukturisasi 'id' langsung di dalam argumen fungsi
export default function EditJamaahPage({ params: { id } }) {

  const [jamaah, setJamaah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2. Gunakan 'id' yang sudah tersedia
    if (id) {
      const fetchJamaahDetail = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(`/jamaahs/${id}`);
          setJamaah(response.data);
        } catch (error) {
          console.error("Gagal mengambil detail jamaah:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchJamaahDetail();
    }
  }, [id]); // 3. Dependensi tetap 'id'

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data jamaah...</div>;
  }

  if (!jamaah) {
    return <div className="p-8 text-center">Data jamaah tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Data Jamaah</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <JamaahForm jamaah={jamaah} />
      </div>
    </div>
  );
}

'use client'; // <-- 1. Jadikan Client Component

import { useState, useEffect } from 'react';
import api from '@/lib/api'; // <-- 2. Impor API client
import TestimoniForm from '@/components/dashboard/testimoni-form';

export default function EditTestimoniPage({ params }) {
  const { id } = params; // Ambil ID dari URL
  
  // 3. Buat state untuk menyimpan data testimoni dan status loading
  const [testimoni, setTestimoni] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Ambil data dari API saat komponen dimuat
  useEffect(() => {
    if (id) {
      const fetchTestimoni = async () => {
        try {
          // Panggil endpoint 'show' di TestimoniController Laravel Anda
          const response = await api.get(`/testimonis/${id}`);
          setTestimoni(response.data);
        } catch (error) {
          console.error("Gagal mengambil detail testimoni:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTestimoni();
    }
  }, [id]);

  // Tampilkan pesan loading saat data sedang diambil
  if (isLoading) {
    return <div className="p-8 text-center">Memuat data testimoni...</div>;
  }

  // Tampilkan pesan jika data tidak ditemukan
  if (!testimoni) {
    return <div className="p-8 text-center">Testimoni tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Testimoni</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* 5. Kirim data yang sudah diambil sebagai props ke form */}
        <TestimoniForm testimoni={testimoni} />
      </div>
    </div>
  );
}
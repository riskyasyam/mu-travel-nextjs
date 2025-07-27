'use client'; // <-- 1. Jadikan Client Component

import { useState, useEffect } from 'react';
import api from '@/lib/api'; // <-- 2. Impor API client
import DokumentasiForm from '@/components/dashboard/dokumentasi-form';

export default function EditDokumentasiPage({ params }) {
  const { id } = params; // Ambil ID dari URL
  
  // 3. Buat state untuk menyimpan data dokumentasi dan status loading
  const [dokumentasi, setDokumentasi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Ambil data dari API saat komponen dimuat
  useEffect(() => {
    if (id) {
      const fetchDokumentasiDetail = async () => {
        try {
          // Panggil endpoint 'show' di DokumentasiController Laravel Anda
          const response = await api.get(`/dokumentasi/${id}`);
          setDokumentasi(response.data);
        } catch (error) {
          console.error("Gagal mengambil detail dokumentasi:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDokumentasiDetail();
    }
  }, [id]);

  // Tampilkan pesan loading saat data sedang diambil
  if (isLoading) {
    return <div className="p-8 text-center">Memuat data dokumentasi...</div>;
  }

  // Tampilkan pesan jika data tidak ditemukan
  if (!dokumentasi) {
    return <div className="p-8 text-center">Dokumentasi tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Dokumentasi</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* 5. Kirim data yang sudah diambil sebagai props ke form */}
        <DokumentasiForm dokumentasi={dokumentasi} />
      </div>
    </div>
  );
}
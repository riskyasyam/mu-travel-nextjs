'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import PaketForm from '@/components/dashboard/paket-form';

export default function EditPaketPage({ params }) {
  const { id } = params;
  const [paket, setPaket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPaketDetail = async () => {
        try {
          // Panggil endpoint 'show' di PaketController Laravel Anda
          const response = await api.get(`/pakets/${id}`);
          setPaket(response.data);
        } catch (error) {
          console.error("Gagal mengambil detail paket:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPaketDetail();
    }
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data paket...</div>;
  }

  if (!paket) {
    return <div className="p-8 text-center">Paket tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Paket Umroh</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        {/* Kirim data yang sudah diambil sebagai props ke form */}
        <PaketForm paket={paket} />
      </div>
    </div>
  );
}

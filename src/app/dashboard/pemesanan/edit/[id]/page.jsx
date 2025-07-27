'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import PemesananForm from '@/components/dashboard/pemesanan-form';

export default function EditPemesananPage({ params }) {
  const { id } = params;
  
  // State untuk menyimpan semua data yang dibutuhkan form
  const [pemesanan, setPemesanan] = useState(null);
  const [jamaahList, setJamaahList] = useState([]);
  const [paketList, setPaketList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil semua data yang dibutuhkan dari API secara paralel
  useEffect(() => {
    if (id) {
      const fetchInitialData = async () => {
        try {
          const [pemesananRes, jamaahRes, paketRes] = await Promise.all([
            api.get(`/pemesanans/${id}`),
            api.get('/jamaahs'),
            api.get('/dashboard/pakets')
          ]);

          setPemesanan(pemesananRes.data);
          setJamaahList(jamaahRes.data);
          setPaketList(paketRes.data);

        } catch (error) {
          console.error("Gagal mengambil data untuk form edit pemesanan:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialData();
    }
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data pemesanan...</div>;
  }

  if (!pemesanan) {
    return <div className="p-8 text-center">Pemesanan tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Pemesanan</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* Kirim semua data yang sudah diambil sebagai props ke form */}
        <PemesananForm 
          jamaahList={jamaahList} 
          paketList={paketList} 
          pemesanan={pemesanan} 
        />
      </div>
    </div>
  );
}

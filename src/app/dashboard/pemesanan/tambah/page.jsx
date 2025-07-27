'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import PemesananForm from '@/components/dashboard/pemesanan-form';

export default function TambahPemesananPage() {
  // State untuk menyimpan semua data yang dibutuhkan form
  const [jamaahList, setJamaahList] = useState([]);
  const [paketList, setPaketList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil semua data yang dibutuhkan dari API secara paralel
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [jamaahRes, paketRes] = await Promise.all([
          api.get('/jamaahs'),           // Mengambil semua jamaah
          api.get('/dashboard/pakets') // Mengambil semua paket
        ]);

        setJamaahList(jamaahRes.data);
        setPaketList(paketRes.data);

      } catch (error) {
        console.error("Gagal mengambil data untuk form pemesanan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []); // Array dependensi kosong agar hanya berjalan sekali

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data form...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Buat Pemesanan Baru</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* Kirim semua data yang sudah diambil sebagai props ke form */}
        <PemesananForm 
          jamaahList={jamaahList} 
          paketList={paketList} 
        />
      </div>
    </div>
  );
}
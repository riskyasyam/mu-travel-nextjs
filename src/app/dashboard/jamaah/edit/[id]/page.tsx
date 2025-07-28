'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import JamaahForm from '@/components/dashboard/jamaah-form';

interface Jamaah {
  id: number;
  namaLengkap: string;
  nomorKtp: string;
  nomorPaspor?: string | null;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat: string;
  nomorTelepon: string;
  email?: string | null;
  pekerjaan?: string | null;
  scanKtpUrl?: string | null;
  scanPasporUrl?: string | null;
  created_at?: string;
  updated_at?: string;
}

export default function EditJamaahPage() {
  const params = useParams();
  const id = params?.id as string;

  const [jamaah, setJamaah] = useState<Jamaah | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (isLoading) return <div className="p-8 text-center">Memuat data jamaah...</div>;
  if (!jamaah) return <div className="p-8 text-center">Data jamaah tidak ditemukan.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Data Jamaah</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <JamaahForm jamaah={jamaah} />
      </div>
    </div>
  );
}
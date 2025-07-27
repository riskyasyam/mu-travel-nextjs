'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api'; // Menggunakan axios client
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DeleteConfirmation } from '@/components/dashboard/delete-confirmation';

export default function TestimoniPage() {
  const [allTestimoni, setAllTestimoni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data dari API Laravel
  const fetchTestimoni = async () => {
    try {
      const response = await api.get('/testimonis');
      setAllTestimoni(response.data);
    } catch (error) {
      console.error("Gagal mengambil data testimoni:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchTestimoni();
  }, []);

  // Fungsi untuk menangani penghapusan data
  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonis/${id}`);
      // Perbarui state untuk menghapus item dari UI secara instan
      setAllTestimoni(allTestimoni.filter(testi => testi.id !== id));
    } catch (error) {
      console.error("Gagal menghapus testimoni:", error);
      // Di sini Anda bisa menambahkan notifikasi error untuk admin
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data testimoni...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Testimoni</h1>
        <Button asChild>
          <Link href="/dashboard/testimoni/tambah">+ Tambah Testimoni</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allTestimoni.map((testi) => (
          <Card key={testi.id} className="group overflow-hidden flex flex-col">
            <CardContent className="p-0">
              <div className="relative w-full aspect-square">
                <img
                  src={testi.foto_url}
                alt={testi.namaJamaah}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 flex flex-col items-start flex-grow">
              <h3 className='font-bold text-slate-800'>{testi.namaJamaah}</h3>
              <p className='text-sm text-slate-600 mt-2 flex-grow'>"{testi.deskripsiTestimoni}"</p>
              <div className="w-full mt-4 flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/testimoni/edit/${testi.id}`}>Edit</Link>
                </Button>
                {/* Gunakan DeleteConfirmation dengan fungsi onConfirm */}
                <DeleteConfirmation onConfirm={() => handleDelete(testi.id)}>
                  Hapus
                </DeleteConfirmation>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

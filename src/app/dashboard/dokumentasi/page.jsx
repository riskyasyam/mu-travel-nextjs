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

export default function DokumentasiPage() {
  const [allDocs, setAllDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data dari API Laravel
  const fetchDokumentasi = async () => {
    try {
      const response = await api.get('/dokumentasi');
      setAllDocs(response.data);
    } catch (error) {
      console.error("Gagal mengambil data dokumentasi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchDokumentasi();
  }, []);

  // Fungsi untuk menangani penghapusan data
  const handleDelete = async (id) => {
    try {
      await api.delete(`/dokumentasi/${id}`);
      // Perbarui state untuk menghapus item dari UI secara instan
      setAllDocs(allDocs.filter(doc => doc.id !== id));
    } catch (error) {
      console.error("Gagal menghapus dokumentasi:", error);
      // Di sini Anda bisa menambahkan notifikasi error untuk admin
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Memuat galeri dokumentasi...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Galeri Dokumentasi</h1>
        <Button asChild>
          <Link href="/dashboard/dokumentasi/tambah">+ Tambah Foto</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allDocs.map((doc) => (
          <Card key={doc.id} className="group overflow-hidden flex flex-col">
            <CardContent className="p-0">
              <div className="relative w-full aspect-square">
                <img
                  src={doc.foto_url}
                  alt={doc.deskripsi || 'Foto Dokumentasi'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 flex flex-col items-start flex-grow">
              <p className="text-sm text-slate-600 flex-grow">
                {doc.deskripsi || 'Tanpa deskripsi'}
              </p>
              <div className="w-full mt-4 flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/dokumentasi/edit/${doc.id}`}>Edit</Link>
                </Button>
                {/* Gunakan DeleteConfirmation dengan fungsi onConfirm */}
                <DeleteConfirmation onConfirm={() => handleDelete(doc.id)}>
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
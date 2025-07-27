'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api'; // Menggunakan axios client
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteConfirmation } from '@/components/dashboard/delete-confirmation';

export default function PaketPage() {
  const [allPaket, setAllPaket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data dari API Laravel
  const fetchPakets = async () => {
    try {
      // Panggil endpoint yang kita buat di Laravel untuk dashboard
      const response = await api.get('/dashboard/pakets'); 
      setAllPaket(response.data);
    } catch (error) {
      console.error("Gagal mengambil data paket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPakets();
  }, []);

  // Fungsi untuk menangani penghapusan data
  const handleDelete = async (id) => {
    try {
      await api.delete(`/pakets/${id}`);
      // Perbarui state untuk menghapus item dari UI secara instan
      setAllPaket(allPaket.filter(paket => paket.id !== id));
    } catch (error) {
      console.error("Gagal menghapus paket:", error);
      // Di sini Anda bisa menambahkan notifikasi error untuk admin
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data paket...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Paket Umroh</h1>
        <Button asChild>
          <Link href="/dashboard/paket/tambah">+ Tambah Paket</Link>
        </Button>
      </div>

      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Nama Paket</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Tanggal Berangkat</TableHead>
              <TableHead>Sisa Kursi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPaket.map((paket, index) => (
              <TableRow key={paket.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {paket.fotoUrl ? (
                    <img
                      src={paket.foto_url}
                      alt={`Foto ${paket.namaPaket}`}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">No Image</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{paket.namaPaket}</TableCell>
                <TableCell>Rp {new Intl.NumberFormat('id-ID').format(paket.harga)}</TableCell>
                <TableCell>{new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                <TableCell>{paket.sisaKursi}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/paket/edit/${paket.id}`}>Edit</Link>
                    </Button>
                    {/* Panggil DeleteConfirmation dengan fungsi handleDelete */}
                    <DeleteConfirmation onConfirm={() => handleDelete(paket.id)}>
                      Hapus
                    </DeleteConfirmation>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

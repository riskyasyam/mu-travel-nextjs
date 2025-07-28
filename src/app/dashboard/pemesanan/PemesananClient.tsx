'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
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
import Search from '@/components/dashboard/search';

type Pemesanan = {
  id: number;
  jamaah: {
    namaLengkap: string;
  };
  paket: {
    namaPaket: string;
  };
  tanggalPemesanan: string;
  statusPembayaran: string;
};

export default function PemesananClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [allPemesanan, setAllPemesanan] = useState<Pemesanan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPemesanan = async (currentQuery: string) => {
      setIsLoading(true);
      try {
        const response = await api.get('/pemesanans', {
          params: { query: currentQuery }
        });
        setAllPemesanan(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pemesanan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPemesanan(query);
  }, [query]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/pemesanans/${id}`);
      setAllPemesanan(allPemesanan.filter(p => p.id !== id));
    } catch (error) {
      console.error("Gagal menghapus pemesanan:", error);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data pemesanan...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Pemesanan Paket</h1>
        <Button asChild>
          <Link href="/dashboard/pemesanan/tambah">+ Buat Pemesanan</Link>
        </Button>
      </div>
      <div className="mb-4">
        <Search placeholder="Cari nama jamaah atau paket..." />
      </div>
      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Jamaah</TableHead>
              <TableHead>Paket yang Diambil</TableHead>
              <TableHead>Tgl. Pesan</TableHead>
              <TableHead>Status Bayar</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPemesanan.map((pesanan) => (
              <TableRow key={pesanan.id}>
                <TableCell className="font-medium">{pesanan.jamaah.namaLengkap}</TableCell>
                <TableCell>{pesanan.paket.namaPaket}</TableCell>
                <TableCell>{new Date(pesanan.tanggalPemesanan).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {pesanan.statusPembayaran.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/pemesanan/edit/${pesanan.id}`}>Edit</Link>
                    </Button>
                    <DeleteConfirmation onConfirm={() => handleDelete(pesanan.id)}>Hapus</DeleteConfirmation>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {allPemesanan.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Data pemesanan tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
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
import { Eye } from 'lucide-react';

export default function JamaahPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [allJamaah, setAllJamaah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJamaah = async (currentQuery) => {
    setIsLoading(true);
    try {
      const response = await api.get('/jamaahs', {
        params: { query: currentQuery }
      });
      setAllJamaah(response.data);
    } catch (error) {
      console.error("Gagal mengambil data jamaah:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJamaah(query);
  }, [query]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jamaahs/${id}`);
      setAllJamaah(allJamaah.filter(jamaah => jamaah.id !== id));
    } catch (error) {
      console.error("Gagal menghapus jamaah:", error);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Memuat data jamaah...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Data Jamaah</h1>
        <Button asChild>
          <Link href="/dashboard/jamaah/tambah">+ Tambah Jamaah</Link>
        </Button>
      </div>

      <div className="mb-4">
        <Search placeholder="Cari nama, KTP, atau No. HP..." />
      </div>

      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>No. KTP</TableHead>
              <TableHead>No. Telepon</TableHead>
              <TableHead>Dokumen</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allJamaah.map((jamaah) => (
              <TableRow key={jamaah.id}>
                <TableCell className="font-medium">{jamaah.namaLengkap}</TableCell>
                <TableCell>{jamaah.nomorKtp}</TableCell>
                <TableCell>{jamaah.nomorTelepon}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {jamaah.scanKtpUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={jamaah.scanKtpUrl} download>KTP</a>
                      </Button>
                    ) : null}
                    {jamaah.scanPasporUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={jamaah.scanPasporUrl} download>Paspor</a>
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button asChild variant="ghost" size="icon" title="Lihat Detail">
                        <Link href={`/dashboard/jamaah/detail/${jamaah.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/jamaah/edit/${jamaah.id}`}>Edit</Link>
                    </Button>
                    <DeleteConfirmation onConfirm={() => handleDelete(jamaah.id)}>
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
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CurrencyInput from '@/components/ui/currency-input';
import { ArrowLeft } from 'lucide-react';

// Komponen Form Tambah Setoran (versi API)
function AddDepositForm({ jamaahId, onDepositSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const jumlahSetoran = formData.get('jumlahSetoran');
    const keterangan = formData.get('keterangan');

    try {
      await api.post('/tabungans', {
        jamaahId: jamaahId,
        jumlahSetoran: jumlahSetoran,
        keterangan: keterangan,
      });
      onDepositSuccess(); // Panggil fungsi refresh dari parent
      setIsOpen(false); // Tutup dialog
    } catch (error) {
      console.error("Gagal menambah setoran:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>+ Tambah Setoran</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Setoran Baru</DialogTitle>
          <DialogDescription>
            Masukkan jumlah setoran baru untuk jamaah ini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jumlahSetoran" className="text-right">Jumlah</Label>
              <div className="col-span-3">
                <CurrencyInput
                  name="jumlahSetoran"
                  placeholder="Contoh: 2.000.000"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="keterangan" className="text-right">Keterangan</Label>
              <Input id="keterangan" name="keterangan" className="col-span-3" placeholder="Opsional"/>
            </div>
          </div>
          <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : 'Simpan Setoran'}
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


// --- PERUBAHAN ADA DI SINI ---
// Destrukturisasi 'jamaahId' langsung di dalam argumen fungsi
export default function DetailTabunganPage({ params: { jamaahId } }) {
  const [jamaah, setJamaah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    try {
      // Endpoint 'show' di JamaahController akan me-load relasi tabungan
      const response = await api.get(`/jamaahs/${jamaahId}`);
      setJamaah(response.data);
    } catch (error) {
      console.error("Gagal mengambil detail tabungan:", error);
    } finally {
      setIsLoading(false);
    }
  }, [jamaahId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (isLoading) {
    return <div className="p-8 text-center">Memuat riwayat tabungan...</div>;
  }

  if (!jamaah) {
    return <div className="p-8 text-center">Data jamaah tidak ditemukan.</div>;
  }

  const totalTabungan = jamaah.tabungan.reduce((sum, t) => sum + t.jumlahSetoran, 0);

  return (
    <div className="p-8">
      <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/dashboard/tabungan" className='flex items-center gap-2'>
                <ArrowLeft size={14}/> Kembali ke Rekapitulasi
            </Link>
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{jamaah.namaLengkap}</h1>
              <p className="text-muted-foreground">Riwayat dan Saldo Tabungan</p>
            </div>
            <AddDepositForm jamaahId={jamaah.id} onDepositSuccess={fetchDetails} />
          </div>
      </div>
      
      <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-md">
        <p className="font-bold">Total Saldo Saat Ini: Rp {totalTabungan.toLocaleString('id-ID')}</p>
      </div>

      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal Setoran</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Keterangan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jamaah.tabungan.length > 0 ? (
                jamaah.tabungan.map((setoran) => (
                <TableRow key={setoran.id}>
                    <TableCell>{new Date(setoran.tanggalSetoran).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</TableCell>
                    <TableCell className="font-medium">Rp {setoran.jumlahSetoran.toLocaleString('id-ID')}</TableCell>
                    <TableCell>{setoran.keterangan || '-'}</TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground h-24">Belum ada riwayat setoran.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
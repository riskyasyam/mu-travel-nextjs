'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/lib/api';
import CurrencyInput from '@/components/ui/currency-input';
import Search from '@/components/dashboard/search';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from 'lucide-react';

type Jamaah = {
  id: number;
  namaLengkap: string;
  jumlahSetoran: number;
  totalTabungan: number;
};

type Setoran = {
  id: number;
  jumlahSetoran: number;
  created_at: string;
};

function DetailTabunganDialog({ jamaah, onActionSuccess }: { jamaah: Jamaah; onActionSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Setoran[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!isOpen) return;
    setIsLoadingHistory(true);
    try {
      const response = await api.get(`/jamaahs/${jamaah.id}/tabungans`);
      setHistory(response.data);
    } catch (error) {
      console.error("Gagal mengambil riwayat setoran:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [isOpen, jamaah.id]);

  useEffect(() => {
    fetchHistory();
  }, [isOpen, fetchHistory]);

  const handleAddDeposit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await api.post('/tabungans', {
        jamaah_id: jamaah.id,
        jumlahSetoran: formData.get('jumlahSetoran'),
        keterangan: formData.get('keterangan'),
      });
      onActionSuccess();
      fetchHistory();
      event.currentTarget.reset();
    } catch (error) {
      console.error("Gagal menambah setoran:", error);
    }
  };

  const totalTabungan = history.reduce((sum, t) => sum + t.jumlahSetoran, 0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye size={14}/> Lihat Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detail Tabungan: {jamaah.namaLengkap}</DialogTitle>
          <DialogDescription>
            Total Saldo Saat Ini: <span className="font-bold text-green-600">Rp {totalTabungan.toLocaleString('id-ID')}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="max-h-96 overflow-y-auto pr-4">
            <h4 className="font-semibold mb-2">Riwayat Setoran</h4>
            <Table>
              <TableHeader><TableRow><TableHead>Tanggal</TableHead><TableHead>Jumlah</TableHead></TableRow></TableHeader>
              <TableBody>
                {isLoadingHistory ? (
                  <TableRow><TableCell colSpan={2} className="text-center">Memuat riwayat...</TableCell></TableRow>
                ) : history.length > 0 ? (
                  history.map(setoran => (
                    <TableRow key={setoran.id}>
                      <TableCell className="text-xs">{new Date(setoran.created_at).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell className="font-medium">Rp {setoran.jumlahSetoran.toLocaleString('id-ID')}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={2} className="text-center">Belum ada setoran.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tambah Setoran Baru</h4>
            <form onSubmit={handleAddDeposit} className="space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Jumlah Setoran</Label>
                <CurrencyInput name="jumlahSetoran" placeholder="Contoh: 2.000.000" required />
              </div>
              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Input name="keterangan" placeholder="Opsional (misal: Setoran Awal)" />
              </div>
              <Button type="submit" className="w-full">Simpan Setoran</Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TabunganClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [jamaahWithSaldo, setJamaahWithSaldo] = useState<Jamaah[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPageData = useCallback(async (currentQuery: string) => {
    setIsLoading(true);
    try {
      const summaryRes = await api.get('/tabungan/summary', { params: { query: currentQuery } });
      setJamaahWithSaldo(summaryRes.data);
    } catch (error) {
      console.error("Gagal mengambil data halaman tabungan:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPageData(query);
  }, [query, fetchPageData]);

  if (isLoading) {
    return <div className="p-8 text-center">Memuat rekapitulasi tabungan...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Rekapitulasi Tabungan Jamaah</h1>
      </div>
      <div className="mb-4">
        <Search placeholder="Cari nama jamaah..." />
      </div>
      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Jamaah</TableHead>
              <TableHead>Jumlah Setoran</TableHead>
              <TableHead>Total Saldo</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jamaahWithSaldo.map((jamaah) => (
              <TableRow key={jamaah.id}>
                <TableCell className="font-medium">{jamaah.namaLengkap}</TableCell>
                <TableCell>{jamaah.jumlahSetoran} kali</TableCell>
                <TableCell className="font-semibold text-green-600">
                  Rp {jamaah.totalTabungan.toLocaleString('id-ID')}
                </TableCell>
                <TableCell className="text-right">
                  <DetailTabunganDialog jamaah={jamaah} onActionSuccess={() => fetchPageData(query)} />
                </TableCell>
              </TableRow>
            ))}
            {jamaahWithSaldo.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
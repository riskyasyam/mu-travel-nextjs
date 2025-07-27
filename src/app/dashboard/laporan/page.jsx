'use client';

import { useState } from 'react';
import api from '@/lib/api'; // Menggunakan axios client
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";

export default function LaporanPage() {
  // State untuk filter tanggal
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Default: 1 bulan terakhir
    to: new Date(),
  });
  
  // State untuk menampung data dan status loading
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk mengambil data terfilter dari API Laravel
  const handleFilter = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/laporan/pemesanan', { // Panggil endpoint API
        params: {
          from: dateRange.from.toISOString(),
          to: dateRange.to.toISOString(),
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk export tetap sama, karena ia memanggil API route terpisah
  const handleExport = () => {
    if (!dateRange.from || !dateRange.to) {
        alert("Silakan pilih rentang tanggal terlebih dahulu.");
        return;
    }
    const fromISO = dateRange.from.toISOString();
    const toISO = dateRange.to.toISOString();
    // Endpoint ini perlu Anda buat di Laravel untuk generate file Excel
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/export/pemesanan?from=${fromISO}&to=${toISO}`, '_blank');
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Laporan Pemesanan</h1>
      
      {/* Bagian Filter */}
      <div className="p-6 bg-white rounded-lg shadow-md border flex flex-col md:flex-row gap-4 items-center">
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[280px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, "PPP") : <span>Pilih tanggal mulai</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateRange.from} onSelect={(date) => setDateRange({...dateRange, from: date})} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
        <span className="text-muted-foreground">sampai</span>
         <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[280px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "PPP") : <span>Pilih tanggal akhir</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateRange.to} onSelect={(date) => setDateRange({...dateRange, to: date})} initialFocus />
                </PopoverContent>
            </Popover>
        </div>
        <Button onClick={handleFilter} disabled={isLoading}>{isLoading ? 'Memuat...' : 'Terapkan Filter'}</Button>
        {data.length > 0 && (
            <Button onClick={handleExport} variant="secondary" className="flex items-center gap-2">
                <Download size={16}/> Export ke Excel
            </Button>
        )}
      </div>

      {/* Tabel Preview */}
      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Jamaah</TableHead>
              <TableHead>Paket</TableHead>
              <TableHead>Tanggal Pesan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.jamaah.namaLengkap}</TableCell>
                <TableCell>{p.paket.namaPaket}</TableCell>
                <TableCell>{new Date(p.tanggalPemesanan).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>{p.statusPembayaran}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                        {isLoading ? 'Sedang memuat data...' : 'Silakan terapkan filter untuk melihat data.'}
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

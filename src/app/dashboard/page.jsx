import Link from 'next/link';
import prisma from '@/lib/prisma'; // Gunakan prisma singleton
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, ShoppingCart, PiggyBank, PlusCircle } from 'lucide-react';
import { getRecentPemesanan } from '@/app/lib/actions'; // Impor action baru

export default async function DashboardPage() {
  // Ambil semua data statistik yang relevan
  const [jamaahCount, pemesananCount, tabunganData, recentPemesanan] = await Promise.all([
    prisma.jamaah.count(),
    prisma.pemesanan.count(),
    prisma.tabungan.aggregate({
      _sum: { jumlahSetoran: true },
    }),
    getRecentPemesanan(),
  ]);

  const totalTabungan = tabunganData._sum.jumlahSetoran || 0;

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      {/* Kartu Statistik Baru */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jamaah Terdaftar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jamaahCount}</div>
            <p className="text-xs text-muted-foreground">Jamaah di dalam sistem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemesanan Paket</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pemesananCount}</div>
            <p className="text-xs text-muted-foreground">Pemesanan tercatat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dana Tabungan</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalTabungan.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Akumulasi seluruh tabungan jamaah</p>
          </CardContent>
        </Card>
      </div>

      {/* Konten Utama: Tabel Pemesanan Terbaru dan Info Samping */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pemesanan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jamaah</TableHead>
                  <TableHead>Paket</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPemesanan.map((pesanan) => (
                  <TableRow key={pesanan.id}>
                    <TableCell className="font-medium">{pesanan.jamaah.namaLengkap}</TableCell>
                    <TableCell>{pesanan.paket.namaPaket}</TableCell>
                    <TableCell>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {pesanan.statusPembayaran.replace('_', ' ')}
                        </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <Button asChild variant="outline"><Link href="/dashboard/jamaah/tambah" className="flex items-center justify-start gap-2"><PlusCircle size={16}/> Tambah Jamaah</Link></Button>
                    <Button asChild variant="outline"><Link href="/dashboard/pemesanan/tambah" className="flex items-center justify-start gap-2"><PlusCircle size={16}/> Buat Pemesanan</Link></Button>
                    <Button asChild variant="outline"><Link href="/dashboard/tabungan" className="flex items-center justify-start gap-2"><PiggyBank size={16}/> Kelola Tabungan</Link></Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};
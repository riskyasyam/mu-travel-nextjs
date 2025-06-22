import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, Camera, Star, PlusCircle } from 'lucide-react';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Ambil semua data yang dibutuhkan secara paralel untuk performa lebih baik
  const [paketCount, dokumentasiCount, testimoniCount, recentPaket, recentTestimoni] = await Promise.all([
    prisma.paket.count(),
    prisma.dokumentasi.count(),
    prisma.testimoni.count(),
    prisma.paket.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.testimoni.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
  ]);

  return (
    <div className="space-y-6">
      {/* Kartu Statistik */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paket Umroh</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paketCount}</div>
            <p className="text-xs text-muted-foreground">Paket yang aktif di database</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Foto Dokumentasi</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dokumentasiCount}</div>
            <p className="text-xs text-muted-foreground">Foto di galeri dokumentasi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimoni</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimoniCount}</div>
            <p className="text-xs text-muted-foreground">Testimoni dari jamaah</p>
          </CardContent>
        </Card>
      </div>

      {/* Konten Utama: Tabel Paket dan Info Samping */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Paket Terbaru Ditambahkan</CardTitle>
            <CardDescription>Berikut 5 paket terakhir yang Anda buat.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Paket</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPaket.map((paket) => (
                  <TableRow key={paket.id}>
                    <TableCell className="font-medium">{paket.namaPaket}</TableCell>
                    <TableCell>Rp {paket.harga.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/paket/edit/${paket.id}`}>Lihat</Link>
                      </Button>
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
                    <CardTitle>Testimoni Terbaru</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentTestimoni.map(testi => (
                        <div key={testi.id} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={testi.fotoUrl} alt={testi.namaJamaah} className="object-cover" />
                                <AvatarFallback>{testi.namaJamaah.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold">{testi.namaJamaah}</p>
                                <p className="text-xs text-muted-foreground truncate">"{testi.deskripsiTestimoni}"</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <Button asChild variant="outline"><Link href="/dashboard/paket/tambah" className="flex items-center gap-2"><PlusCircle size={16}/> Tambah Paket Baru</Link></Button>
                    <Button asChild variant="outline"><Link href="/dashboard/dokumentasi/tambah" className="flex items-center gap-2"><PlusCircle size={16}/> Tambah Dokumentasi</Link></Button>
                    <Button asChild variant="outline"><Link href="/dashboard/testimoni/tambah" className="flex items-center gap-2"><PlusCircle size={16}/> Tambah Testimoni</Link></Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};
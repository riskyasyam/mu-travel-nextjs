import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getJamaahWithTotalTabungan } from '@/app/lib/actions';
import { Eye } from 'lucide-react';

export default async function TabunganPage() {
  const jamaahWithSaldo = await getJamaahWithTotalTabungan();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Rekapitulasi Tabungan Jamaah</h1>
        {/* Tombol tambah setoran akan ada di halaman detail */}
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
                <TableCell>{jamaah._count.tabungan} kali</TableCell>
                <TableCell className="font-semibold text-green-600">
                  Rp {jamaah.totalTabungan.toLocaleString('id-ID')}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/tabungan/detail/${jamaah.id}`} className="flex items-center gap-2">
                      <Eye size={14}/> Lihat Detail
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
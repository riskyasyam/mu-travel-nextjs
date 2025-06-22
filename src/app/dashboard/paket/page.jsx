import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { deletePaket } from '@/app/lib/actions';
import { Button } from '@/components/ui/button'; // <-- Impor Button
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // <-- Impor komponen Tabel
import { DeleteConfirmation } from '@/components/dashboard/delete-confirmation'; // <-- Impor komponen delete kita

const prisma = new PrismaClient();

export default async function PaketPage() {
  const allPaket = await prisma.paket.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Paket Umroh</h1>
        {/* Ganti Link biasa dengan Button asChild */}
        <Button asChild>
          <Link href="/dashboard/paket/tambah">+ Tambah Paket</Link>
        </Button>
      </div>

      {/* Ganti div dan table biasa dengan komponen Card dan Table ShadCN */}
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
                    <Image
                      src={paket.fotoUrl}
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
                <TableCell>Rp {paket.harga.toLocaleString('id-ID')}</TableCell>
                <TableCell>{new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                <TableCell>{paket.sisaKursi}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/paket/edit/${paket.id}`}>Edit</Link>
                    </Button>
                    <DeleteConfirmation id={paket.id} action={deletePaket}>
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
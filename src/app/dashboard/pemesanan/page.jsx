import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllPemesanan, deletePemesanan } from '@/app/lib/actions';
import { DeleteConfirmation } from '@/components/dashboard/delete-confirmation';
import Search from '@/components/dashboard/search';

export default async function PemesananPage({ searchParams }) {
  const query = searchParams?.query || '';
  const allPemesanan = await getAllPemesanan(query);

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
                <TableCell>{pesanan.statusPembayaran}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/pemesanan/edit/${pesanan.id}`}>Edit</Link>
                    </Button>
                    <DeleteConfirmation id={pesanan.id} action={deletePemesanan}>Hapus</DeleteConfirmation>
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
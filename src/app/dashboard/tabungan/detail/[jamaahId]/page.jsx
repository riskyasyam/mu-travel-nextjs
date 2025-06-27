import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSetoranByJamaahId, createSetoran } from '@/app/lib/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react'; // Pastikan ini diimpor

// Komponen Form Tambah Setoran untuk Diletakkan di dalam Dialog
function AddDepositForm({ jamaahId }) {
  // Bind ID jamaah ke server action
  const createSetoranWithId = createSetoran.bind(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Tambah Setoran</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Setoran Baru</DialogTitle>
          <DialogDescription>
            Masukkan jumlah setoran baru untuk jamaah ini. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <form action={createSetoranWithId}>
          <input type="hidden" name="jamaahId" value={jamaahId} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jumlahSetoran" className="text-right">Jumlah</Label>
              <Input id="jumlahSetoran" name="jumlahSetoran" type="number" className="col-span-3" placeholder="Contoh: 2000000" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="keterangan" className="text-right">Keterangan</Label>
              <Input id="keterangan" name="keterangan" className="col-span-3" placeholder="Opsional"/>
            </div>
          </div>
          <DialogFooter>
              <Button type="submit">Simpan Setoran</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export default async function DetailTabunganPage({ params: { jamaahId } }) {
  const jamaah = await getSetoranByJamaahId(jamaahId);
  const totalTabungan = jamaah.tabungan.reduce((sum, t) => sum + t.jumlahSetoran, 0);

  return (
    <div className="p-8">
      <div className="mb-6">
        {/* --- TOMBOL KEMBALI ADA DI SINI --- */}
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
          <AddDepositForm jamaahId={jamaah.id} />
        </div>
      </div>
      
      <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
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
            {jamaah.tabungan.map((setoran) => (
              <TableRow key={setoran.id}>
                <TableCell>{new Date(setoran.tanggalSetoran).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</TableCell>
                <TableCell className="font-medium">Rp {setoran.jumlahSetoran.toLocaleString('id-ID')}</TableCell>
                <TableCell>{setoran.keterangan || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
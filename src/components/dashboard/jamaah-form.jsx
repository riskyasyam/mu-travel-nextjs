'use client';
import { createJamaah, updateJamaah } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JamaahForm({ jamaah }) {
  const isEditMode = Boolean(jamaah);
  const action = isEditMode ? updateJamaah.bind(null, jamaah.id) : createJamaah;
  const tanggalLahirDefault = jamaah?.tanggalLahir
    ? new Date(jamaah.tanggalLahir).toISOString().split('T')[0]
    : '';

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="namaLengkap">Nama Lengkap (sesuai paspor)</Label>
          <Input id="namaLengkap" name="namaLengkap" defaultValue={jamaah?.namaLengkap} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomorKtp">Nomor KTP</Label>
          <Input id="nomorKtp" name="nomorKtp" defaultValue={jamaah?.nomorKtp} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomorPaspor">Nomor Paspor (Opsional)</Label>
          <Input id="nomorPaspor" name="nomorPaspor" defaultValue={jamaah?.nomorPaspor || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input id="tempatLahir" name="tempatLahir" defaultValue={jamaah?.tempatLahir} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input id="tanggalLahir" name="tanggalLahir" type="date" defaultValue={tanggalLahirDefault} required />
        </div>
        <div className="space-y-2">
          <Label>Jenis Kelamin</Label>
          <Select name="jenisKelamin" defaultValue={jamaah?.jenisKelamin} required>
            <SelectTrigger><SelectValue placeholder="Pilih Jenis Kelamin" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
              <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
            <Label htmlFor="nomorTelepon">Nomor Telepon/WhatsApp</Label>
            <Input id="nomorTelepon" name="nomorTelepon" defaultValue={jamaah?.nomorTelepon} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (Opsional)</Label>
            <Input id="email" name="email" type="email" defaultValue={jamaah?.email || ''} />
          </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pekerjaan">Pekerjaan (Opsional)</Label>
        <Input id="pekerjaan" name="pekerjaan" defaultValue={jamaah?.pekerjaan || ''} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="alamat">Alamat Lengkap</Label>
        <Textarea id="alamat" name="alamat" rows={4} defaultValue={jamaah?.alamat} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="scanKtp">Scan KTP</Label>
          <Input id="scanKtp" name="scanKtp" type="file" className="cursor-pointer" />
          {jamaah?.scanKtpUrl && (
            <a href={jamaah.scanKtpUrl} target="_blank" className="text-xs text-blue-600 hover:underline">Lihat KTP saat ini</a>
          )}
          <input type="hidden" name="ktpUrlLama" value={jamaah?.scanKtpUrl || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scanPaspor">Scan Paspor</Label>
          <Input id="scanPaspor" name="scanPaspor" type="file" className="cursor-pointer" />
          {jamaah?.scanPasporUrl && (
            <a href={jamaah.scanPasporUrl} target="_blank" className="text-xs text-blue-600 hover:underline">Lihat Paspor saat ini</a>
          )}
           <input type="hidden" name="pasporUrlLama" value={jamaah?.scanPasporUrl || ''} />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit">
          {isEditMode ? 'Update Data' : 'Simpan Jamaah'}
        </Button>
      </div>
    </form>
  );
}
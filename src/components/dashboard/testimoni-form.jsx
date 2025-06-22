'use client';

import { createTestimoni, updateTestimoni } from "@/app/lib/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Impor Button dari ShadCN
import { Input } from "@/components/ui/input";   // Impor Input dari ShadCN
import { Label } from "@/components/ui/label";   // Impor Label dari ShadCN
import { Textarea } from "@/components/ui/textarea"; // Impor Textarea dari ShadCN

export default function TestimoniForm({ testimoni }) {
  const isEditMode = Boolean(testimoni);
  const action = isEditMode ? updateTestimoni.bind(null, testimoni.id) : createTestimoni;

  return (
    // Gunakan space-y-6 untuk jarak vertikal yang konsisten
    <form action={action} encType="multipart/form-data" className="space-y-6">
      
      {/* Input untuk Nama Jamaah */}
      <div className="space-y-2">
        <Label htmlFor="namaJamaah">Nama Jamaah</Label>
        <Input
          type="text"
          name="namaJamaah"
          id="namaJamaah"
          defaultValue={testimoni?.namaJamaah || ''}
          placeholder="Contoh: Ibu Tuti"
          required
        />
      </div>

      {/* Input untuk Deskripsi Testimoni */}
      <div className="space-y-2">
        <Label htmlFor="deskripsiTestimoni">Isi Testimoni</Label>
        <Textarea
          id="deskripsiTestimoni"
          name="deskripsiTestimoni"
          rows={5}
          defaultValue={testimoni?.deskripsiTestimoni || ''}
          placeholder="Tuliskan testimoni dari jamaah di sini..."
          required
        />
      </div>

      {/* Input untuk Foto (Screenshot WA) */}
      <div className="space-y-2">
        <Label htmlFor="fotoUrl">
          {isEditMode ? 'Ganti Foto Testimoni' : 'Upload Foto Testimoni'}
        </Label>
        {/* Input file tetap menggunakan style kustom karena ShadCN tidak punya komponen file khusus */}
        <Input
          type="file"
          id="fotoUrl"
          name="fotoUrl"
          accept="image/*"
          className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required={!isEditMode}
        />
      </div>

      {/* Tampilkan preview foto jika mode Edit */}
      {isEditMode && testimoni?.fotoUrl && (
        <div>
          <Label>Foto Saat Ini:</Label>
          <div className="mt-2">
            <Image src={testimoni.fotoUrl} alt="Preview Foto" width={150} height={150} className="rounded-md object-contain border p-2" />
          </div>
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          {isEditMode ? 'Update Testimoni' : 'Simpan Testimoni'}
        </Button>
      </div>
    </form>
  );
}
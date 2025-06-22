'use client';

import { createDokumentasi, updateDokumentasi } from "@/app/lib/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Impor komponen ShadCN
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DokumentasiForm({ dokumentasi }) {
  const isEditMode = Boolean(dokumentasi);
  const action = isEditMode ? updateDokumentasi.bind(null, dokumentasi.id) : createDokumentasi;

  return (
    <form action={action} encType="multipart/form-data" className="space-y-6">
      
      {/* Input untuk Foto */}
      <div className="space-y-2">
        <Label htmlFor="foto">
          {isEditMode ? 'Ganti Foto' : 'Upload Foto'}
        </Label>
        <Input
          type="file"
          id="foto"
          name="foto"
          // ShadCN Input sudah memiliki style dasar untuk file, kita bisa tambahkan kustomisasi jika perlu
          className="cursor-pointer"
          required={!isEditMode}
        />
        {isEditMode && <input type="hidden" name="fotoUrlLama" value={dokumentasi.fotoUrl} />}
      </div>

      {/* Tampilkan preview foto jika mode Edit */}
      {isEditMode && dokumentasi.fotoUrl && (
        <div className="space-y-2">
          <Label>Foto Saat Ini:</Label>
          <div className="mt-2">
            <Image 
              src={dokumentasi.fotoUrl} 
              alt="Preview" 
              width={150} 
              height={100} 
              className="rounded-md object-cover border p-2" 
            />
          </div>
        </div>
      )}

      {/* Input untuk Deskripsi */}
      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          rows="4"
          defaultValue={dokumentasi?.deskripsi || ''}
          placeholder="Contoh: Suasana jamaah di Masjid Nabawi"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          {isEditMode ? 'Update' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
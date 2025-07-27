'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import api from '@/lib/api'; // Menggunakan axios client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TestimoniForm({ testimoni }) {
  const router = useRouter();
  const isEditMode = Boolean(testimoni);

  // State untuk data form
  const [namaJamaah, setNamaJamaah] = useState(testimoni?.namaJamaah || '');
  const [deskripsiTestimoni, setDeskripsiTestimoni] = useState(testimoni?.deskripsiTestimoni || '');
  const [fotoUrl, setFotoUrl] = useState(null); // State untuk file
  
  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('namaJamaah', namaJamaah);
    formData.append('deskripsiTestimoni', deskripsiTestimoni);
    
    if (fotoUrl) {
      formData.append('fotoUrl', fotoUrl);
    }
    
    try {
      if (isEditMode) {
        // Untuk update, kirim dengan metode POST dan _method: 'PUT'
        formData.append('_method', 'PUT');
        await api.post(`/testimonis/${testimoni.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Untuk create, gunakan POST biasa
        await api.post('/testimonis', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      // Jika berhasil, arahkan kembali ke halaman daftar
      router.push('/dashboard/testimoni');
      router.refresh(); // Meminta Next.js untuk mengambil data baru di halaman daftar

    } catch (error) {
      console.error("Gagal menyimpan data testimoni:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="space-y-2">
        <Label htmlFor="namaJamaah">Nama Jamaah</Label>
        <Input
          type="text"
          name="namaJamaah"
          id="namaJamaah"
          value={namaJamaah}
          onChange={(e) => setNamaJamaah(e.target.value)}
          placeholder="Contoh: Bapak Ahmad"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsiTestimoni">Isi Testimoni</Label>
        <Textarea
          id="deskripsiTestimoni"
          name="deskripsiTestimoni"
          rows={5}
          value={deskripsiTestimoni}
          onChange={(e) => setDeskripsiTestimoni(e.target.value)}
          placeholder="Tuliskan testimoni dari jamaah di sini..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fotoUrl">
          {isEditMode ? 'Ganti Foto Testimoni' : 'Upload Foto Testimoni'}
        </Label>
        <Input
          type="file"
          id="fotoUrl"
          name="fotoUrl"
          accept="image/*"
          className="cursor-pointer"
          onChange={(e) => setFotoUrl(e.target.files[0])}
          required={!isEditMode}
        />
      </div>

      {isEditMode && testimoni?.fotoUrl && (
        <div>
          <Label>Foto Saat Ini:</Label>
          <div className="mt-2">
            <Image src={testimoni.fotoUrl} alt="Preview Foto" width={150} height={150} className="rounded-md object-contain border p-2" />
          </div>
        </div>
      )}

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : (isEditMode ? 'Update Testimoni' : 'Simpan Testimoni')}
        </Button>
      </div>
    </form>
  );
}

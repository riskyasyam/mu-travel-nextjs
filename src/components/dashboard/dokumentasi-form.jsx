'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import api from '@/lib/api'; // Menggunakan axios client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DokumentasiForm({ dokumentasi }) {
  const router = useRouter();
  const isEditMode = Boolean(dokumentasi);

  // State untuk data form
  const [deskripsi, setDeskripsi] = useState(dokumentasi?.deskripsi || '');
  const [foto, setFoto] = useState(null);
  
  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Kita menggunakan FormData karena ada file upload
    const formData = new FormData();
    formData.append('deskripsi', deskripsi);
    
    if (foto) {
      formData.append('foto', foto);
    }
    
    try {
      if (isEditMode) {
        // Untuk update, kita harus mengirim dengan metode POST tapi menyertakan _method: 'PUT'
        formData.append('_method', 'PUT');
        await api.post(`/dokumentasi/${dokumentasi.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Untuk create, kita gunakan POST biasa
        await api.post('/dokumentasi', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      // Jika berhasil, arahkan kembali ke halaman daftar
      router.push('/dashboard/dokumentasi');
      router.refresh(); // Meminta Next.js untuk mengambil data baru di halaman daftar

    } catch (error) {
      console.error("Gagal menyimpan data dokumentasi:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="space-y-2">
        <Label htmlFor="foto">
          {isEditMode ? 'Ganti Foto' : 'Upload Foto'}
        </Label>
        <Input
          type="file"
          id="foto"
          name="foto"
          className="cursor-pointer"
          onChange={(e) => setFoto(e.target.files[0])} // Simpan file yang dipilih ke state
          required={!isEditMode}
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          rows="4"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Contoh: Suasana jamaah di Masjid Nabawi"
        />
      </div>

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : (isEditMode ? 'Update' : 'Simpan')}
        </Button>
      </div>
    </form>
  );
}

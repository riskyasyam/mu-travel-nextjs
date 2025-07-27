'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
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
  const router = useRouter();
  const isEditMode = Boolean(jamaah);

  // State untuk semua field form
  const [formData, setFormData] = useState({
    namaLengkap: jamaah?.namaLengkap || '',
    nomorKtp: jamaah?.nomorKtp || '',
    nomorPaspor: jamaah?.nomorPaspor || '',
    tempatLahir: jamaah?.tempatLahir || '',
    tanggalLahir: jamaah?.tanggalLahir ? new Date(jamaah.tanggalLahir).toISOString().split('T')[0] : '',
    jenisKelamin: jamaah?.jenisKelamin || '',
    alamat: jamaah?.alamat || '',
    nomorTelepon: jamaah?.nomorTelepon || '',
    email: jamaah?.email || '',
    pekerjaan: jamaah?.pekerjaan || '',
  });
  const [scanKtp, setScanKtp] = useState(null);
  const [scanPaspor, setScanPaspor] = useState(null);
  
  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const formPayload = new FormData();
    // Tambahkan semua data teks ke payload
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }
    // Tambahkan file jika ada
    if (scanKtp) formPayload.append('scanKtp', scanKtp);
    if (scanPaspor) formPayload.append('scanPaspor', scanPaspor);

    try {
      if (isEditMode) {
        formPayload.append('_method', 'PUT');
        await api.post(`/jamaahs/${jamaah.id}`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/jamaahs', formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      router.push('/dashboard/jamaah');
      router.refresh();
    } catch (error) {
      console.error("Gagal menyimpan data jamaah:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan. Pastikan No. KTP/Paspor unik.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="namaLengkap">Nama Lengkap (sesuai paspor)</Label>
          <Input id="namaLengkap" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomorKtp">Nomor KTP</Label>
          <Input id="nomorKtp" name="nomorKtp" value={formData.nomorKtp} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomorPaspor">Nomor Paspor (Opsional)</Label>
          <Input id="nomorPaspor" name="nomorPaspor" value={formData.nomorPaspor} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input id="tempatLahir" name="tempatLahir" value={formData.tempatLahir} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input id="tanggalLahir" name="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label>Jenis Kelamin</Label>
          <Select name="jenisKelamin" value={formData.jenisKelamin} onValueChange={(value) => handleSelectChange('jenisKelamin', value)} required>
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
            <Input id="nomorTelepon" name="nomorTelepon" value={formData.nomorTelepon} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (Opsional)</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
          </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pekerjaan">Pekerjaan (Opsional)</Label>
        <Input id="pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="alamat">Alamat Lengkap</Label>
        <Textarea id="alamat" name="alamat" rows={4} value={formData.alamat} onChange={handleInputChange} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="scanKtp">Scan KTP</Label>
          <Input id="scanKtp" name="scanKtp" type="file" className="cursor-pointer" onChange={(e) => setScanKtp(e.target.files[0])} />
          {jamaah?.scanKtpUrl && (
            <a href={jamaah.scanKtpUrl} target="_blank" className="text-xs text-blue-600 hover:underline">Lihat KTP saat ini</a>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="scanPaspor">Scan Paspor (Opsional)</Label>
          <Input id="scanPaspor" name="scanPaspor" type="file" className="cursor-pointer" onChange={(e) => setScanPaspor(e.target.files[0])} />
          {jamaah?.scanPasporUrl && (
            <a href={jamaah.scanPasporUrl} target="_blank" className="text-xs text-blue-600 hover:underline">Lihat Paspor saat ini</a>
          )}
        </div>
      </div>
      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : (isEditMode ? 'Update Data' : 'Simpan Jamaah')}
        </Button>
      </div>
    </form>
  );
}

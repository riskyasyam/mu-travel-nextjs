'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

export default function PaketForm({ paket }) {
  const router = useRouter();
  const isEditMode = Boolean(paket);

  // State untuk semua field form
  const [formData, setFormData] = useState({
    namaPaket: paket?.namaPaket || '',
    deskripsi: paket?.deskripsi || '',
    durasi: paket?.durasi || '',
    tanggalKeberangkatan: paket?.tanggalKeberangkatan ? new Date(paket.tanggalKeberangkatan).toISOString().split('T')[0] : '',
    hotelMadinah: paket?.hotelMadinah || '',
    hotelMakkah: paket?.hotelMakkah || '',
    pesawat: paket?.pesawat || '',
    ratingHotelMakkah: paket?.ratingHotelMakkah || 5,
    ratingHotelMadinah: paket?.ratingHotelMadinah || 5,
    sisaKursi: paket?.sisaKursi || '',
  });
  const [harga, setHarga] = useState(paket?.harga || '');
  const [fotoPaket, setFotoPaket] = useState(null);
  
  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handler untuk input biasa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk komponen Select
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handler untuk input harga dengan format
  const handleHargaChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setHarga(numericValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const formPayload = new FormData();
    // Append semua data dari state
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }
    formPayload.append('harga', harga);
    if (fotoPaket) {
      formPayload.append('fotoPaket', fotoPaket);
    }

    try {
      if (isEditMode) {
        formPayload.append('_method', 'PUT'); // Laravel method spoofing
        await api.post(`/pakets/${paket.id}`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/pakets', formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      router.push('/dashboard/paket');
      router.refresh(); // Trigger refetch data on the list page
    } catch (error) {
      console.error("Gagal menyimpan data paket:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const airlines = ["Lion Air", "Garuda Indonesia", "Citilink", "Batik Air", "Saudia"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="namaPaket">Nama Paket</Label>
            <Input id="namaPaket" name="namaPaket" value={formData.namaPaket} onChange={handleInputChange} placeholder="Contoh: Umroh Berkah Ramadhan" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fotoPaket">{isEditMode ? 'Ganti Foto Paket' : 'Upload Foto Paket'}</Label>
            <Input id="fotoPaket" name="fotoPaket" type="file" onChange={(e) => setFotoPaket(e.target.files[0])} required={!isEditMode} className="cursor-pointer"/>
          </div>

          {isEditMode && paket?.fotoUrl && (
            <div className="space-y-2">
              <Label>Foto Saat Ini:</Label>
              <Image src={paket.fotoUrl} alt={paket.namaPaket} width={200} height={150} className="rounded-md object-cover border p-1" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="harga">Harga Mulai Dari (Rp)</Label>
            <Input
              id="harga"
              type="text"
              value={new Intl.NumberFormat('id-ID').format(harga || 0)}
              onChange={handleHargaChange}
              placeholder="Contoh: 35.000.000"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durasi">Durasi (hari)</Label>
              <Input id="durasi" name="durasi" type="number" value={formData.durasi} onChange={handleInputChange} placeholder="9" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sisaKursi">Sisa Kursi</Label>
              <Input id="sisaKursi" name="sisaKursi" type="number" value={formData.sisaKursi} onChange={handleInputChange} placeholder="20" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tanggalKeberangkatan">Tanggal Keberangkatan</Label>
            <Input id="tanggalKeberangkatan" name="tanggalKeberangkatan" type="date" value={formData.tanggalKeberangkatan} onChange={handleInputChange} required />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pesawat">Maskapai Pesawat</Label>
            <Select name="pesawat" value={formData.pesawat} onValueChange={(value) => handleSelectChange('pesawat', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Maskapai" />
              </SelectTrigger>
              <SelectContent>
                {airlines.map((airline) => (
                  <SelectItem key={airline} value={airline}>{airline}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotelMadinah">Hotel Madinah</Label>
            <Input id="hotelMadinah" name="hotelMadinah" value={formData.hotelMadinah} onChange={handleInputChange} placeholder="Contoh: Hotel Hilton Madinah" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratingHotelMadinah">Rating Hotel Madinah (1-5)</Label>
            <Input id="ratingHotelMadinah" name="ratingHotelMadinah" type="number" min="1" max="5" value={formData.ratingHotelMadinah} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotelMakkah">Hotel Makkah</Label>
            <Input id="hotelMakkah" name="hotelMakkah" value={formData.hotelMakkah} onChange={handleInputChange} placeholder="Contoh: Hotel Fairmont Makkah" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratingHotelMakkah">Rating Hotel Makkah (1-5)</Label>
            <Input id="ratingHotelMakkah" name="ratingHotelMakkah" type="number" min="1" max="5" value={formData.ratingHotelMakkah} onChange={handleInputChange} required />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea id="deskripsi" name="deskripsi" rows="6" value={formData.deskripsi} onChange={handleInputChange} placeholder="Jelaskan detail fasilitas dan itinerary paket di sini..." required />
      </div>

      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : (isEditMode ? 'Update Paket' : 'Simpan Paket')}
        </Button>
      </div>
    </form>
  );
}

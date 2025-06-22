'use client';
import { createPaket, updatePaket } from "@/app/lib/actions";
import Image from 'next/image';
import { useState } from "react"; // <-- 1. Impor useState
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
  const isEditMode = Boolean(paket);
  const action = isEditMode ? updatePaket.bind(null, paket.id) : createPaket;
  const tanggalDefault = paket?.tanggalKeberangkatan
    ? new Date(paket.tanggalKeberangkatan).toISOString().split('T')[0]
    : '';
  
  const airlines = ["Lion Air", "Garuda Indonesia", "Citilink", "Batik Air", "Saudia"];

  // --- 2. LOGIKA UNTUK FORMAT HARGA ---
  // Fungsi untuk memformat angka dengan titik ribuan
  const formatRupiah = (angka) => {
    if (!angka) return '';
    return new Intl.NumberFormat('id-ID').format(angka);
  };

  // State untuk menyimpan nilai harga yang diformat (yang dilihat pengguna)
  const [hargaDisplay, setHargaDisplay] = useState(
    paket?.harga ? formatRupiah(paket.harga) : ''
  );

  // Fungsi yang berjalan setiap kali pengguna mengetik di input harga
  const handleHargaChange = (e) => {
    // Ambil nilai mentah dari input
    const rawValue = e.target.value;
    // Hapus semua karakter selain angka
    const numericValue = rawValue.replace(/[^0-9]/g, '');
    // Update tampilan dengan format ribuan
    setHargaDisplay(formatRupiah(numericValue));
  };
  // ------------------------------------


  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="namaPaket">Nama Paket</Label>
            <Input id="namaPaket" name="namaPaket" defaultValue={paket?.namaPaket} placeholder="Contoh: Umroh Berkah Ramadhan" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fotoPaket">{isEditMode ? 'Ganti Foto Paket' : 'Upload Foto Paket'}</Label>
            <Input id="fotoPaket" name="fotoPaket" type="file" required={!isEditMode} className="cursor-pointer"/>
            {isEditMode && <input type="hidden" name="fotoUrlLama" value={paket?.fotoUrl} />}
          </div>

          {isEditMode && paket?.fotoUrl && (
            <div className="space-y-2">
              <Label>Foto Saat Ini:</Label>
              <Image src={paket.fotoUrl} alt={paket.namaPaket} width={200} height={150} className="rounded-md object-cover border p-1" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="hargaDisplay">Harga (Rp)</Label>
            {/* Input yang dilihat pengguna, tipenya 'text' untuk menerima titik */}
            <Input
              id="hargaDisplay"
              type="text"
              value={hargaDisplay}
              onChange={handleHargaChange}
              placeholder="Contoh: 35.000.000"
              required
            />
            {/* Input tersembunyi untuk mengirim nilai angka murni ke server */}
            <input
              type="hidden"
              name="harga"
              value={hargaDisplay.replace(/\./g, '')} // Hapus titik sebelum mengirim
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durasi">Durasi (hari)</Label>
              <Input id="durasi" name="durasi" type="number" defaultValue={paket?.durasi} placeholder="9" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sisaKursi">Sisa Kursi</Label>
              <Input id="sisaKursi" name="sisaKursi" type="number" defaultValue={paket?.sisaKursi} placeholder="20" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tanggalKeberangkatan">Tanggal Keberangkatan</Label>
            <Input id="tanggalKeberangkatan" name="tanggalKeberangkatan" type="date" defaultValue={tanggalDefault} required />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pesawat">Maskapai Pesawat</Label>
            {/* Menggunakan Komponen Select dari ShadCN */}
            <Select name="pesawat" defaultValue={paket?.pesawat} required>
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
            <Input id="hotelMadinah" name="hotelMadinah" defaultValue={paket?.hotelMadinah} placeholder="Contoh: Hotel Hilton Madinah" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratingHotelMadinah">Rating Hotel Madinah (1-5)</Label>
            <Input id="ratingHotelMadinah" name="ratingHotelMadinah" type="number" min="1" max="5" defaultValue={paket?.ratingHotelMadinah} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotelMakkah">Hotel Makkah</Label>
            <Input id="hotelMakkah" name="hotelMakkah" defaultValue={paket?.hotelMakkah} placeholder="Contoh: Hotel Fairmont Makkah" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratingHotelMakkah">Rating Hotel Makkah (1-5)</Label>
            <Input id="ratingHotelMakkah" name="ratingHotelMakkah" type="number" min="1" max="5" defaultValue={paket?.ratingHotelMakkah} required />
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea id="deskripsi" name="deskripsi" rows="6" defaultValue={paket?.deskripsi} placeholder="Jelaskan detail fasilitas dan itinerary paket di sini..." required />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          {isEditMode ? 'Update Paket' : 'Simpan Paket'}
        </Button>
      </div>
    </form>
  );
}
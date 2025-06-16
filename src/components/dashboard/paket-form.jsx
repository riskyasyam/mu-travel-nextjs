'use client';
import { createPaket, updatePaket } from "@/app/lib/actions";
import Image from 'next/image'; // <-- TAMBAHKAN BARIS INI

// Komponen ini menerima prop 'paket'
// Jika 'paket' ada, berarti ini mode Edit. Jika tidak, mode Create.
export default function PaketForm({ paket }) {
  const isEditMode = Boolean(paket);
  
  // Bind ID ke action update jika ini mode Edit
  const updatePaketWithId = isEditMode ? updatePaket.bind(null, paket.id) : null;
  
  // Format tanggal untuk input type="date" (YYYY-MM-DD)
  const tanggalDefault = paket?.tanggalKeberangkatan
    ? new Date(paket.tanggalKeberangkatan).toISOString().split('T')[0]
    : '';

  return (
    <form action={isEditMode ? updatePaketWithId : createPaket} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div>
            <label htmlFor="namaPaket" className="block text-sm font-medium text-gray-700">Nama Paket</label>
            <input type="text" name="namaPaket" id="namaPaket" defaultValue={paket?.namaPaket} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="fotoPaket" className="block text-sm font-medium text-gray-700">
              {isEditMode ? 'Ganti Foto Paket' : 'Upload Foto Paket'}
            </label>
            <input 
              type="file" 
              name="fotoPaket" 
              id="fotoPaket" 
              className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              // Tambahkan 'required' hanya jika mode Create
              required={!isEditMode} 
            />
            {/* Simpan URL foto lama di input tersembunyi untuk mode edit */}
            {isEditMode && <input type="hidden" name="fotoUrlLama" value={paket.fotoUrl} />}
          </div>
          
          {/* Tampilkan preview foto jika mode Edit */}
          {isEditMode && paket.fotoUrl && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Foto Saat Ini:</p>
              <Image 
                src={paket.fotoUrl} 
                alt={paket.namaPaket} 
                width={200} 
                height={150} 
                className="rounded-md object-cover"
              />
            </div>
          )}
          <div>
            <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
            <input type="number" name="harga" id="harga" defaultValue={paket?.harga} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="durasi" className="block text-sm font-medium text-gray-700">Durasi (hari)</label>
            <input type="number" name="durasi" id="durasi" defaultValue={paket?.durasi} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="tanggalKeberangkatan" className="block text-sm font-medium text-gray-700">Tanggal Keberangkatan</label>
            <input type="date" name="tanggalKeberangkatan" id="tanggalKeberangkatan" defaultValue={tanggalDefault} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
           <div>
            <label htmlFor="sisaKursi" className="block text-sm font-medium text-gray-700">Sisa Kursi</label>
            <input type="number" name="sisaKursi" id="sisaKursi" defaultValue={paket?.sisaKursi} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div>
            <label htmlFor="pesawat" className="block text-sm font-medium text-gray-700">Maskapai Pesawat</label>
            <input type="text" name="pesawat" id="pesawat" defaultValue={paket?.pesawat} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="hotelMadinah" className="block text-sm font-medium text-gray-700">Hotel Madinah</label>
            <input type="text" name="hotelMadinah" id="hotelMadinah" defaultValue={paket?.hotelMadinah} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="ratingHotelMadinah" className="block text-sm font-medium text-gray-700">Rating Hotel Madinah (1-5)</label>
            <input type="number" name="ratingHotelMadinah" id="ratingHotelMadinah" min="1" max="5" defaultValue={paket?.ratingHotelMadinah} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="hotelMakkah" className="block text-sm font-medium text-gray-700">Hotel Makkah</label>
            <input type="text" name="hotelMakkah" id="hotelMakkah" defaultValue={paket?.hotelMakkah} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="ratingHotelMakkah" className="block text-sm font-medium text-gray-700">Rating Hotel Makkah (1-5)</label>
            <input type="number" name="ratingHotelMakkah" id="ratingHotelMakkah" min="1" max="5" defaultValue={paket?.ratingHotelMakkah} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="col-span-1 md:col-span-2">
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea name="deskripsi" id="deskripsi" rows="6" defaultValue={paket?.deskripsi} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          {isEditMode ? 'Update Paket' : 'Simpan Paket'}
        </button>
      </div>
    </form>
  );
}
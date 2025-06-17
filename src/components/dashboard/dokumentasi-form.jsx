'use client';
import { createDokumentasi, updateDokumentasi } from "@/app/lib/actions";
import Image from "next/image";

export default function DokumentasiForm({ dokumentasi }) {
  const isEditMode = Boolean(dokumentasi);
  const action = isEditMode ? updateDokumentasi.bind(null, dokumentasi.id) : createDokumentasi;

  return (
    <form action={action} encType="multipart/form-data" className="space-y-6">
      <div>
        <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
          {isEditMode ? 'Ganti Foto' : 'Upload Foto'}
        </label>
        <input
          type="file"
          id="foto"
          name="foto"
          className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required={!isEditMode}
        />
        {isEditMode && <input type="hidden" name="fotoUrlLama" value={dokumentasi.fotoUrl} />}
      </div>

      {isEditMode && dokumentasi.fotoUrl && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Foto Saat Ini:</p>
          <Image src={dokumentasi.fotoUrl} alt="Preview" width={150} height={100} className="rounded-md object-cover" />
        </div>
      )}

      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows="4"
          defaultValue={dokumentasi?.deskripsi || ''}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Contoh: Suasana di Masjid Nabawi"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          {isEditMode ? 'Update' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
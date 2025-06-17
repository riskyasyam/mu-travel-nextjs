'use client';
import { createTestimoni, updateTestimoni } from "@/app/lib/actions";
import Image from "next/image";

export default function TestimoniForm({ testimoni }) {
  const isEditMode = Boolean(testimoni);
  const action = isEditMode ? updateTestimoni.bind(null, testimoni.id) : createTestimoni;

  return (
    <form action={action} encType="multipart/form-data" className="space-y-6">
      <p className="text-sm text-center text-gray-600">Pilih salah satu media untuk diupload: foto atau video.</p>
      
      <div>
        <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Upload Foto</label>
        <input type="file" name="foto" id="foto" accept="image/*" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      </div>

      <div>
        <label htmlFor="video" className="block text-sm font-medium text-gray-700">Upload Video</label>
        <input type="file" name="video" id="video" accept="video/*" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      </div>

      {isEditMode && (
        <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Media Saat Ini:</p>
            {testimoni.fotoUrl && <Image src={testimoni.fotoUrl} alt="Preview Foto" width={150} height={150} className="rounded-md object-cover" />}
            {testimoni.videoUrl && <video controls width="250"><source src={testimoni.videoUrl} /></video>}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          {isEditMode ? 'Update Media' : 'Simpan Media'}
        </button>
      </div>
    </form>
  );
}
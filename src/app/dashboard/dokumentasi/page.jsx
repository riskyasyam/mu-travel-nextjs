import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { deleteDokumentasi } from '@/app/lib/actions';

const prisma = new PrismaClient();

export default async function DokumentasiPage() {
  const allDocs = await prisma.dokumentasi.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Galeri Dokumentasi</h1>
        <Link
          href="/dashboard/dokumentasi/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Tambah Foto
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allDocs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative w-full h-48">
              <Image
                src={doc.fotoUrl}
                alt={doc.deskripsi || 'Foto Dokumentasi'}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 truncate">{doc.deskripsi || 'Tanpa deskripsi'}</p>
              <div className="mt-4 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/dashboard/dokumentasi/edit/${doc.id}`} className="text-sm font-medium text-blue-600 hover:underline">Edit</Link>
                <form action={deleteDokumentasi.bind(null, doc.id)}>
                  <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
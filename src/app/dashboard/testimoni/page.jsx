import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { deleteTestimoni } from '@/app/lib/actions';

const prisma = new PrismaClient();

export default async function TestimoniPage() {
  const allTestimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Galeri Testimoni</h1>
        <Link
          href="/dashboard/testimoni/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Tambah Media
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allTestimoni.map((testi) => (
          <div key={testi.id} className="bg-white rounded-lg shadow-md group relative">
            {testi.fotoUrl && (
              <Image src={testi.fotoUrl} alt="Testimoni Foto" layout="responsive" width={300} height={300} objectFit="cover" className="rounded-lg" />
            )}
            {testi.videoUrl && (
              <video controls className="w-full rounded-lg">
                <source src={testi.videoUrl} />
              </video>
            )}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 p-1 rounded-lg">
              <Link href={`/dashboard/testimoni/edit/${testi.id}`} className="text-sm font-medium text-white hover:underline">Ganti</Link>
              <form action={deleteTestimoni.bind(null, testi.id)}>
                <button type="submit" className="text-sm font-medium text-red-300 hover:underline">
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { deleteTestimoni } from '@/app/lib/actions';
import { Button } from '@/components/ui/button'; // Impor Button ShadCN
import { DeleteConfirmation } from '@/components/dashboard/delete-confirmation'; // Impor komponen baru kita

const prisma = new PrismaClient();

export default async function TestimoniPage() {
  const allTestimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Testimoni</h1>
        <Button asChild>
          <Link href="/dashboard/testimoni/tambah">+ Tambah Testimoni</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allTestimoni.map((testi) => (
          <div key={testi.id} className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden border">
            {testi.fotoUrl && (
              <div className="relative w-full aspect-square">
                <Image
                  src={testi.fotoUrl}
                  alt={testi.namaJamaah}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className='p-4 flex flex-col flex-grow'>
                <h3 className='font-bold text-slate-800'>{testi.namaJamaah}</h3>
                <p className='text-sm text-slate-600 mt-2 flex-grow'>"{testi.deskripsiTestimoni}"</p>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/testimoni/edit/${testi.id}`}>Edit</Link>
              </Button>
              <DeleteConfirmation id={testi.id} action={deleteTestimoni}>
                Hapus
              </DeleteConfirmation>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
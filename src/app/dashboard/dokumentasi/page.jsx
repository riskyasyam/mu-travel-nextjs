import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { deleteDokumentasi } from '@/app/lib/actions';
import { Button } from '@/components/ui/button'; // <-- 1. Impor Button
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader, // Kita mungkin tidak memakainya, tapi bagus untuk diimpor
  CardTitle,
  CardDescription
} from "@/components/ui/card"; // <-- 2. Impor komponen Card
import { DeleteConfirmation } from '@/components/dashboard/delete-confirmation'; // <-- 3. Impor komponen delete kita

const prisma = new PrismaClient();

export default async function DokumentasiPage() {
  const allDocs = await prisma.dokumentasi.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Galeri Dokumentasi</h1>
        {/* 4. Ganti Link biasa dengan Button asChild */}
        <Button asChild>
          <Link href="/dashboard/dokumentasi/tambah">+ Tambah Foto</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allDocs.map((doc) => (
          // 5. Ganti div kartu dengan komponen Card
          <Card key={doc.id} className="group overflow-hidden flex flex-col">
            <CardContent className="p-0">
              <div className="relative w-full aspect-square">
                {/* 6. Perbaiki komponen Image ke sintaks modern */}
                <Image
                  src={doc.fotoUrl}
                  alt={doc.deskripsi || 'Foto Dokumentasi'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardContent>
            {/* 7. Gunakan CardFooter untuk deskripsi dan tombol aksi */}
            <CardFooter className="p-4 flex flex-col items-start flex-grow">
              <p className="text-sm text-slate-600 flex-grow">
                {doc.deskripsi || 'Tanpa deskripsi'}
              </p>
              <div className="w-full mt-4 flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/dokumentasi/edit/${doc.id}`}>Edit</Link>
                </Button>
                {/* 8. Gunakan komponen DeleteConfirmation */}
                <DeleteConfirmation id={doc.id} action={deleteDokumentasi}>
                  Hapus
                </DeleteConfirmation>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
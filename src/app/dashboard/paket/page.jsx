import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { deletePaket } from '@/app/lib/actions';

const prisma = new PrismaClient();

export default async function PaketPage() {
  const allPaket = await prisma.paket.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Manajemen Paket Umroh</h1>
        <Link
          href="/dashboard/paket/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Tambah Paket
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              {/* 2. Tambahkan kolom header "No." */}
              <th className="p-3 text-left font-semibold text-slate-600">No.</th>
              <th className="p-3 text-left font-semibold text-slate-600">Foto</th>
              <th className="p-3 text-left font-semibold text-slate-600">Nama Paket</th>
              <th className="p-3 text-left font-semibold text-slate-600">Harga</th>
              <th className="p-3 text-left font-semibold text-slate-600">Tanggal Berangkat</th>
              <th className="p-3 text-left font-semibold text-slate-600">Sisa Kursi</th>
              <th className="p-3 text-left font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Tambahkan "index" pada fungsi map */}
            {allPaket.map((paket, index) => (
              <tr key={paket.id} className="border-b hover:bg-gray-50">
                {/* 3. Tambahkan sel untuk menampilkan nomor urut */}
                <td className="p-3 text-slate-800 font-medium align-top">{index + 1}</td>
                <td className="p-2">
                  {paket.fotoUrl ? (
                    <Image
                      src={paket.fotoUrl}
                      alt={`Foto ${paket.namaPaket}`}
                      width={80}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">No Image</span>
                  )}
                </td>
                <td className="p-3 text-slate-800 font-medium align-top">{paket.namaPaket}</td>
                <td className="p-3 text-slate-800 align-top">Rp {paket.harga.toLocaleString('id-ID')}</td>
                <td className="p-3 text-slate-800 align-top">{new Date(paket.tanggalKeberangkatan).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                <td className="p-3 text-slate-800 align-top">{paket.sisaKursi}</td>
                <td className="p-3 align-top">
                  <div className="flex items-center gap-4">
                    <Link href={`/dashboard/paket/edit/${paket.id}`} className="text-blue-500 hover:underline font-medium">
                      Edit
                    </Link>
                    <form action={deletePaket.bind(null, paket.id)}>
                      <button type="submit" className="text-red-500 hover:underline font-medium">
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
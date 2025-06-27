import PemesananForm from "@/components/dashboard/pemesanan-form";
import prisma from "@/lib/prisma";
import { getPemesananById } from "@/app/lib/actions";

export default async function EditPemesananPage({ params: { id } }) {
  // Ambil SEMUA jamaah, SEMUA paket, DAN SATU pemesanan yang akan diedit
  const [jamaahList, paketList, pemesanan] = await Promise.all([
    prisma.jamaah.findMany({ orderBy: { namaLengkap: 'asc' } }),
    prisma.paket.findMany({ orderBy: { namaPaket: 'asc' } }),
    getPemesananById(id)
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Pemesanan</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <PemesananForm jamaahList={jamaahList} paketList={paketList} pemesanan={pemesanan} />
      </div>
    </div>
  );
}
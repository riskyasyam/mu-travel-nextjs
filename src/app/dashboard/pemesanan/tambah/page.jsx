import PemesananForm from "@/components/dashboard/pemesanan-form";
import prisma from "@/lib/prisma.js";

export default async function TambahPemesananPage() {
  // Ambil SEMUA jamaah DAN SEMUA paket
  const [jamaahList, paketList] = await Promise.all([
    prisma.jamaah.findMany({ orderBy: { namaLengkap: 'asc' } }),
    prisma.paket.findMany({ orderBy: { namaPaket: 'asc' } })
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Buat Pemesanan Baru</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <PemesananForm jamaahList={jamaahList} paketList={paketList} />
      </div>
    </div>
  );
}
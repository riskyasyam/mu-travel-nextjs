import PaketForm from "@/components/dashboard/paket-form";

export default function TambahPaketPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Tambah Paket Umroh Baru</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <PaketForm />
      </div>
    </div>
  );
}
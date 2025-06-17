import DokumentasiForm from "@/components/dashboard/dokumentasi-form";

export default function TambahDokumentasiPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Tambah Foto Dokumentasi</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <DokumentasiForm />
      </div>
    </div>
  );
}
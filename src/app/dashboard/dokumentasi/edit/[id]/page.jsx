import DokumentasiForm from "@/components/dashboard/dokumentasi-form";
import { getDokumentasiById } from "@/app/lib/actions";

export default async function EditDokumentasiPage({ params }) {
  const doc = await getDokumentasiById(params.id);

  if (!doc) {
    return <div>Dokumentasi tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Dokumentasi</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <DokumentasiForm dokumentasi={doc} />
      </div>
    </div>
  );
}
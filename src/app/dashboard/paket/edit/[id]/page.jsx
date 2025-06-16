import PaketForm from "@/components/dashboard/paket-form";
import { getPaketById } from "@/app/lib/actions";

export default async function EditPaketPage({ params }) {
  const id = params.id;
  const paket = await getPaketById(id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Paket Umroh</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Kirim data paket yang ada sebagai prop */}
        <PaketForm paket={paket} />
      </div>
    </div>
  );
}
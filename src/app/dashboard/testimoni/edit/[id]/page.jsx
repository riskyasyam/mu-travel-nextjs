import TestimoniForm from "@/components/dashboard/testimoni-form";
import { getTestimoniById } from "@/app/lib/actions";

export default async function EditTestimoniPage({ params }) {
  const testimoni = await getTestimoniById(params.id);

  if (!testimoni) {
    return <div>Testimoni tidak ditemukan.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Testimoni</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <TestimoniForm testimoni={testimoni} />
      </div>
    </div>
  );
}
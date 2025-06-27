import JamaahForm from "@/components/dashboard/jamaah-form";
import { getJamaahById } from "@/app/lib/actions";

export default async function EditJamaahPage({ params: { id } }) {
  const jamaah = await getJamaahById(id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Edit Data Jamaah</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <JamaahForm jamaah={jamaah} />
      </div>
    </div>
  );
}
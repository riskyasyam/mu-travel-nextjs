import JamaahForm from "@/components/dashboard/jamaah-form";

export default function TambahJamaahPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Tambah Data Jamaah Baru</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <JamaahForm />
      </div>
    </div>
  );
}
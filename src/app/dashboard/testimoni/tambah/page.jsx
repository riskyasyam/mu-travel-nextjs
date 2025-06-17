import TestimoniForm from "@/components/dashboard/testimoni-form";

export default function TambahTestimoniPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Tambah Testimoni Baru</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <TestimoniForm />
      </div>
    </div>
  );
}
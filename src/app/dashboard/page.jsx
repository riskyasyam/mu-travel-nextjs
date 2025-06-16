const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Selamat Datang, Admin!
      </h1>

      {/* Contoh Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-slate-600">Total Paket Aktif</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-slate-600">Total Jamaah</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-slate-600">Pendaftaran Baru</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-slate-600">Pesan Masuk</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">3</p>
        </div>
      </div>

      {/* Konten dashboard lainnya bisa ditambahkan di sini */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-slate-600">Aktivitas Terbaru</h3>
        <p className="mt-2 text-slate-500">[Daftar aktivitas terbaru akan muncul di sini]</p>
      </div>
    </div>
  );
};

export default DashboardPage;
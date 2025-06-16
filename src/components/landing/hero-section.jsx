const HeroSection = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">
          Perjalanan Umroh Penuh Makna
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Wujudkan niat suci Anda ke Tanah Suci bersama layanan terbaik dari MU Travel.
        </p>
        <div className="mt-8">
          <a
            href="#features"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Lihat Paket
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
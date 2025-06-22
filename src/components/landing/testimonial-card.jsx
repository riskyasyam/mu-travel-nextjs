import Image from 'next/image';

const TestimonialCard = ({ testimoni }) => {
  return (
    // 1. Wadah utama. Kita gunakan gambar template sebagai background CSS.
    <div
      style={{ backgroundImage: `url(/images/testimonial-template.jpg)` }}
      className="relative aspect-[9/19] w-full bg-contain bg-no-repeat bg-center rounded-2xl shadow-lg"
    >
      {/* 2. "Jendela" untuk menempatkan screenshot dari database. */}
      {/* Angka-angka ini (top, left, width, height) mungkin perlu sedikit Anda sesuaikan */}
      <div className="absolute top-[13%] left-[7%] w-[86%] h-[78%]">

        {/* 3. Gambar screenshot dari DB dengan object-contain di dalam "jendela" */}
        <div className="relative w-full h-full">
          <Image
            src={testimoni.fotoUrl}
            alt={`Testimoni dari ${testimoni.namaJamaah}`}
            fill
            className="object-contain" // <-- object-contain memastikan seluruh gambar muat
          />
        </div>
        
      </div>
    </div>
  );
};

export default TestimonialCard;
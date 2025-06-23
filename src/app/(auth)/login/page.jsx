import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/shared/login-form'; // Impor komponen form

export default function LoginPage() {
  return (
    // Container utama setinggi layar penuh dan menggunakan flexbox
    <div className="min-h-screen flex">

      {/* Kolom Kiri: Gambar */}
      {/* Kolom ini akan disembunyikan di layar kecil (mobile) */}
      <div className="relative hidden lg:flex w-1/2">
        <Image
          src="/images/login-bg.jpg" // Ganti dengan path gambar Anda
          alt="Jamaah Umroh di Depan Ka'bah"
          fill
          className="object-cover"
        />
        {/* Anda bisa menambahkan overlay gelap di sini jika ingin */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Kolom Kanan: Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-20">
        <div className="w-full max-w-sm">
          {/* Bagian Header Form */}
          <div>
            <Link href="/" className="flex items-center justify-center gap-3 mb-6">
              <Image
                src="/logo.svg"
                alt="MU Travel Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#EAC84C] to-[#D4802A] bg-clip-text text-transparent">MU Travel</span>
            </Link>
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Selamat Datang Kembali
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Login untuk melanjutkan ke dashboard Anda.
            </p>
          </div>

          {/* Komponen Form dipanggil di sini */}
          <div className="mt-8">
            <LoginForm />
          </div>

        </div>
      </div>
    </div>
  );
}
import { authenticate } from '@/app/lib/actions'; // Kita akan buat file ini
import LoginForm from '@/components/shared/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Login ke Akun Anda</h2>
          <p className="mt-2 text-sm text-gray-600">
            Selamat datang kembali di MU Travel
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
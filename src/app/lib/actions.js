'use server';

import { signIn, signOut } from '@/auth'; // <-- Impor signOut di sini
import { redirect } from 'next/navigation';

export async function authenticate(prevState, formData) {
  try {
    // Ubah formData menjadi objek biasa
    const credentials = Object.fromEntries(formData);

    // Panggil signIn dan suruh ia untuk tidak me-redirect secara otomatis
    await signIn('credentials', {
      ...credentials,
      redirect: false, // <-- INI KUNCINYA
    });

  } catch (error) {
    // Tangkap error jika validasi kredensial gagal
    if (error.type === 'CredentialsSignin') {
      return 'Email atau password yang Anda masukkan salah.';
    }
    // Jika ada error lain, lemparkan lagi
    throw error;
  }

  // Jika blok 'try' berhasil tanpa error, artinya login sukses.
  // Lakukan redirect ke dashboard secara manual.
  redirect('/dashboard');
}

export async function logout() {
  // Tambahkan objek dengan properti redirectTo
  await signOut({
    redirectTo: '/', // Arahkan ke halaman utama setelah logout
  });
}
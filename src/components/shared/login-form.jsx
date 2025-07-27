'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Impor useRouter untuk redirect
import api from '@/lib/api'; // <-- Impor API client kita
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter(); // Hook untuk navigasi
  
  // State untuk menyimpan input pengguna
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk pesan error dan status loading
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Mencegah form me-refresh halaman
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Kirim data ke API login Laravel
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      // Jika berhasil, Laravel akan mengirim kembali data user dan token
      console.log('Login berhasil:', response.data);
      
      // Simpan token (untuk sekarang kita skip, fokus pada redirect)
      // Di aplikasi nyata, Anda akan menyimpan response.data.access_token di cookies
      
      // Arahkan pengguna ke dashboard
      router.push('/dashboard');

    } catch (error) {
      // Jika gagal, Laravel akan mengirim respons error
      console.error('Login gagal:', error.response);
      if (error.response && error.response.status === 422) {
        // Error validasi dari Laravel
        setErrorMessage(error.response.data.errors.email[0]);
      } else {
        // Error lain (misal: server mati)
        setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="anda@email.com"
          required
          value={email} // <-- Buat jadi controlled component
          onChange={(e) => setEmail(e.target.value)} // <-- Update state saat diketik
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          placeholder="password"
          required 
          value={password} // <-- Buat jadi controlled component
          onChange={(e) => setPassword(e.target.value)} // <-- Update state saat diketik
        />
      </div>
      
      {errorMessage && (
        <p className="text-sm font-medium text-destructive text-center">
          {errorMessage}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Memproses...' : 'Login'}
      </Button>
    </form>
  );
}
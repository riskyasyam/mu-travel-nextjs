'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function CurrencyInput({ name, defaultValue = '', placeholder, required }) {
  // Fungsi untuk memformat nilai menjadi string dengan titik ribuan
  const formatValue = (val) => {
    if (!val) return '';
    // Hapus semua karakter non-angka terlebih dahulu
    const numericVal = val.toString().replace(/[^0-9]/g, '');
    if (numericVal === '') return '';
    return new Intl.NumberFormat('id-ID').format(Number(numericVal));
  };
  
  // Fungsi untuk mendapatkan nilai angka mentah dari string yang diformat
  const getRawValue = (formattedVal) => {
    return formattedVal.replace(/\./g, '');
  };

  // State untuk nilai yang ditampilkan di input (contoh: "2.000.000")
  const [displayValue, setDisplayValue] = useState(formatValue(defaultValue));

  // Handler yang berjalan setiap kali pengguna mengetik
  const handleChange = (e) => {
    const rawValue = getRawValue(e.target.value);
    // Hanya proses jika nilainya adalah angka atau string kosong
    if (!isNaN(Number(rawValue))) {
      setDisplayValue(formatValue(rawValue));
    }
  };

  return (
    <>
      {/* Input yang dilihat pengguna */}
      <Input
        type="text" // Gunakan 'text' untuk bisa menampilkan titik
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-left" // Sejajarkan ke kiri agar lebih natural saat mengetik
      />
      {/* Input tersembunyi ini yang akan mengirim nilai angka mentah ke server */}
      <input
        type="hidden"
        name={name}
        value={getRawValue(displayValue)}
        required={required}
      />
    </>
  );
}
'use server';

import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path'; // <-- TAMBAHKAN BARIS INI

import { signIn, signOut } from '@/auth'; // <-- Impor signOut di sini
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

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

export async function createTestimoni(formData){
    const data = {
        fotoUrl: formData.get('fotoUrl'),
        videoUrl: formData.get('videoUrl'),
    }
    await prisma.testimoni.create({ data });
    revalidatePath('/dashboard/testimoni');
    redirect('/dashboard/testimoni');
}

export async function updateTestimoni(id, formData){
    const data = {
        fotoUrl: formData.get('fotoUrl'),
        videoUrl: formData.get('videoUrl'),
    }
    await prisma.testimoni.update({ where: { id }, data });
    revalidatePath('/dashboard/testimoni');
    redirect('/dashboard/testimoni');
}

export async function deleteTestimoni(id){
    await prisma.testimoni.delete({ where: { id } });
    revalidatePath('/dashboard/testimoni');
    redirect('/dashboard/testimoni');
}

export async function createDokumentasi(formData){
    const data = {
        fotoUrl: formData.get('fotoUrl'),
        deskripsi: formData.get('deskripsi'),
    }
    await prisma.dokumentasi.create({ data });
    revalidatePath('/dashboard/dokumentasi');
    redirect('/dashboard/dokumentasi');
}

export async function updateDokumentasi(id, formData){
    const data = {
        fotoUrl: formData.get('fotoUrl'),
        deskripsi: formData.get('deskripsi'),
    }
    await prisma.dokumentasi.update({ where: { id }, data });
    revalidatePath('/dashboard/dokumentasi');
    redirect('/dashboard/dokumentasi');
}

export async function deleteDokumentasi(id){
    await prisma.dokumentasi.delete({ where: { id } });
    revalidatePath('/dashboard/dokumentasi');
    redirect('/dashboard/dokumentasi');
}

// FUNGSI UNTUK MENGAMBIL SATU PAKET BERDASARKAN ID
export async function getPaketById(id) {
  const paket = await prisma.paket.findUnique({
    where: { id: parseInt(id) },
  });
  return paket;
}

export async function createPaket(formData) {
  const file = formData.get('fotoPaket'); // Ambil file dari form

  if (!file || file.size === 0) {
    // Handle jika tidak ada file yang di-upload
    throw new Error('Foto paket wajib diisi.');
  }

  // Ubah file menjadi buffer yang bisa ditulis ke disk
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Buat nama file yang unik untuk menghindari nama yang sama
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  // Tulis file ke dalam folder public/uploads
  await writeFile(filePath, buffer);

  // Buat URL publik untuk file yang baru disimpan
  const fileUrl = `/uploads/${fileName}`;

  // Ambil sisa data dari form dan siapkan untuk database
  const data = {
    namaPaket: formData.get('namaPaket'),
    fotoUrl: fileUrl, // <-- Gunakan URL file yang baru
    deskripsi: formData.get('deskripsi'),
    harga: parseInt(formData.get('harga'), 10),
    // ... (sisa field lainnya sama seperti sebelumnya)
  };
  
  await prisma.paket.create({ data: {
      ...data,
      // pastikan semua field number dan date di-parse dengan benar
      durasi: parseInt(formData.get('durasi'), 10),
      tanggalKeberangkatan: new Date(formData.get('tanggalKeberangkatan')),
      hotelMadinah: formData.get('hotelMadinah'),
      hotelMakkah: formData.get('hotelMakkah'),
      pesawat: formData.get('pesawat'),
      ratingHotelMakkah: parseInt(formData.get('ratingHotelMakkah'), 10),
      ratingHotelMadinah: parseInt(formData.get('ratingHotelMadinah'), 10),
      sisaKursi: parseInt(formData.get('sisaKursi'), 10),
  } });

  revalidatePath('/dashboard/paket');
  redirect('/dashboard/paket');
}

// UPDATE PAKET
export async function updatePaket(id, formData) {
  const file = formData.get('fotoPaket');
  let fileUrl = formData.get('fotoUrlLama'); // Ambil URL lama

  // Cek jika ada file baru yang di-upload
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);
    
    await writeFile(filePath, buffer);
    fileUrl = `/uploads/${fileName}`; // Ganti dengan URL baru
    // Di aplikasi nyata, Anda mungkin ingin menghapus file lama dari server
  }

  const data = {
    namaPaket: formData.get('namaPaket'),
    fotoUrl: fileUrl, // Gunakan URL baru jika ada, atau URL lama jika tidak
    // ... (sisa field lainnya sama seperti di createPaket)
  };

  await prisma.paket.update({ where: { id: parseInt(id) }, data: {
      ...data,
      // ... (lengkapi semua field yang di-parse seperti di createPaket)
  } });

  revalidatePath('/dashboard/paket');
  redirect('/dashboard/paket');
}

// DELETE PAKET
export async function deletePaket(id) {
  await prisma.paket.delete({ where: { id } });
  revalidatePath('/dashboard/paket');
}
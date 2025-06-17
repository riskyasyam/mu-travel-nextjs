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

export async function getTestimoniById(id) {
  const testimoni = await prisma.testimoni.findUnique({
    where: { id: parseInt(id) },
  });
  return testimoni;
}

export async function createTestimoni(formData) {
  const fotoFile = formData.get('foto');
  const videoFile = formData.get('video');

  const fotoUrl = await uploadFile(fotoFile);
  const videoUrl = fotoUrl ? null : await uploadFile(videoFile);

  if (!fotoUrl && !videoUrl) {
    throw new Error('Anda harus mengupload foto atau video.');
  }

  await prisma.testimoni.create({
    data: { fotoUrl, videoUrl },
  });

  revalidatePath('/dashboard/testimoni');
  redirect('/dashboard/testimoni');
}

export async function updateTestimoni(id, formData) {
  const testimoni = await prisma.testimoni.findUnique({ where: { id: parseInt(id) } });
  if (!testimoni) throw new Error('Testimoni tidak ditemukan');

  const fotoFile = formData.get('foto');
  const videoFile = formData.get('video');

  let fotoUrl = testimoni.fotoUrl;
  let videoUrl = testimoni.videoUrl;

  // Jika ada file baru di-upload, hapus file lama (jika ada)
  if ((fotoFile && fotoFile.size > 0) || (videoFile && videoFile.size > 0)) {
    const oldFileUrl = testimoni.fotoUrl || testimoni.videoUrl;
    if (oldFileUrl) {
      const oldFilePath = path.join(process.cwd(), 'public', oldFileUrl);
      try { await unlink(oldFilePath); } catch { console.log("File lama tidak ditemukan, melanjutkan proses.")}
    }
  }

  const newFotoUrl = await uploadFile(fotoFile);
  const newVideoUrl = newFotoUrl ? null : await uploadFile(videoFile);
  
  await prisma.testimoni.update({
    where: { id: parseInt(id) },
    data: {
      fotoUrl: newFotoUrl || (newVideoUrl ? null : fotoUrl),
      videoUrl: newVideoUrl || (newFotoUrl ? null : videoUrl),
    },
  });

  revalidatePath('/dashboard/testimoni');
  redirect('/dashboard/testimoni');
}

export async function deleteTestimoni(id) {
  try {
    const testimoni = await prisma.testimoni.findUnique({ where: { id: parseInt(id) } });

    // Hapus file fisik jika ada (baik foto maupun video)
    if (testimoni) {
      const fileUrl = testimoni.fotoUrl || testimoni.videoUrl;
      if (fileUrl) {
        const filePath = path.join(process.cwd(), 'public', fileUrl);
        await unlink(filePath);
      }
    }
    
    await prisma.testimoni.delete({ where: { id: parseInt(id) } });

  } catch (error) {
    // Tangani jika file tidak ditemukan tapi tetap ingin hapus record DB
    if (error.code === 'ENOENT') {
        await prisma.testimoni.delete({ where: { id: parseInt(id) } });
    } else {
        console.error("Gagal menghapus testimoni:", error);
    }
  }

  revalidatePath('/dashboard/testimoni');
}

export async function getDokumentasiById(id) {
  const doc = await prisma.dokumentasi.findUnique({
    where: { id: parseInt(id) },
  });
  return doc;
}

export async function createDokumentasi(formData) {
  const file = formData.get('foto');
  const deskripsi = formData.get('deskripsi');

  if (!file || file.size === 0) {
    throw new Error('Foto dokumentasi wajib diisi.');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  await writeFile(filePath, buffer);
  const fileUrl = `/uploads/${fileName}`;

  await prisma.dokumentasi.create({
    data: { fotoUrl: fileUrl, deskripsi },
  });

  revalidatePath('/dashboard/dokumentasi');
  redirect('/dashboard/dokumentasi');
}

export async function updateDokumentasi(id, formData) {
  const file = formData.get('foto');
  const deskripsi = formData.get('deskripsi');
  let fotoUrl = formData.get('fotoUrlLama');

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);
    
    await writeFile(filePath, buffer);
    fotoUrl = `/uploads/${fileName}`;
    // Anda bisa menambahkan logika untuk menghapus file lama di sini
  }

  await prisma.dokumentasi.update({
    where: { id: parseInt(id) },
    data: { fotoUrl, deskripsi },
  });

  revalidatePath('/dashboard/dokumentasi');
  redirect('/dashboard/dokumentasi');
}

export async function deleteDokumentasi(id) {
  try {
    // 1. Ambil data untuk mendapatkan URL file
    const doc = await prisma.dokumentasi.findUnique({ where: { id: parseInt(id) } });

    if (doc && doc.fotoUrl) {
      // 2. Buat path file lengkap di server
      const filePath = path.join(process.cwd(), 'public', doc.fotoUrl);
      // 3. Hapus file dari server
      await unlink(filePath);
    }

    // 4. Hapus record dari database
    await prisma.dokumentasi.delete({ where: { id: parseInt(id) } });

  } catch (error) {
    console.error("Gagal menghapus dokumentasi:", error);
    // Jika file tidak ada, jangan sampai membuat proses gagal
    if (error.code === 'ENOENT') {
        await prisma.dokumentasi.delete({ where: { id: parseInt(id) } });
    }
  }

  revalidatePath('/dashboard/dokumentasi');
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
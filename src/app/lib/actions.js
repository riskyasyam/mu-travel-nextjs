'use server';

import { PrismaClient } from '@prisma/client';
import { writeFile, unlink} from 'fs/promises';
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

export async function getFilteredPemesanan({ from, to }) {
  try {
    const pemesanan = await prisma.pemesanan.findMany({
      where: {
        tanggalPemesanan: {
          gte: from, // gte = greater than or equal to (mulai dari tanggal 'from')
          lte: to,   // lte = less than or equal to (sampai dengan tanggal 'to')
        },
      },
      include: {
        jamaah: true,
        paket: true,
      },
      orderBy: {
        tanggalPemesanan: 'desc',
      },
    });
    return pemesanan;
  } catch (error) {
    console.error("Gagal mengambil data pemesanan terfilter:", error);
    return [];
  }
}

// Mengambil data pemesanan terbaru untuk ditampilkan di dashboard
export async function getRecentPemesanan() {
  try {
    return await prisma.pemesanan.findMany({
      orderBy: { tanggalPemesanan: 'desc' },
      take: 5,
      include: {
        jamaah: { select: { namaLengkap: true } },
        paket: { select: { namaPaket: true } },
      },
    });
  } catch (error) {
    console.error("Gagal mengambil data pemesanan terbaru:", error);
    return [];
  }
}

// --- CRUD UNTUK PEMESANAN ---

// Mengambil semua data pemesanan untuk ditampilkan di tabel
export async function getAllPemesanan(query) {
  const whereClause = query ? {
    OR: [
      { jamaah: { namaLengkap: { contains: query } } },
      { paket: { namaPaket: { contains: query } } },
    ],
  } : {};

  return await prisma.pemesanan.findMany({
    where: whereClause,
    include: {
      jamaah: true, // Sertakan data jamaah terkait
      paket: true,  // Sertakan data paket terkait
    },
    orderBy: { tanggalPemesanan: 'desc' },
  });
}

// Mengambil satu data pemesanan untuk halaman edit
export async function getPemesananById(id) {
  const pemesananId = parseInt(id, 10);
  return await prisma.pemesanan.findUnique({
    where: { id: pemesananId },
  });
}

// Membuat pemesanan baru
export async function createPemesanan(formData) {
  const data = {
    jamaahId: parseInt(formData.get('jamaahId'), 10),
    paketId: parseInt(formData.get('paketId'), 10),
    statusPembayaran: formData.get('statusPembayaran'),
    catatan: formData.get('catatan'),
  };

  await prisma.pemesanan.create({ data });
  revalidatePath('/dashboard/pemesanan');
  redirect('/dashboard/pemesanan');
}

// Mengupdate pemesanan
export async function updatePemesanan(id, formData) {
  const pemesananId = parseInt(id, 10);
  const data = {
    jamaahId: parseInt(formData.get('jamaahId'), 10),
    paketId: parseInt(formData.get('paketId'), 10),
    statusPembayaran: formData.get('statusPembayaran'),
    catatan: formData.get('catatan'),
  };

  await prisma.pemesanan.update({ where: { id: pemesananId }, data });
  revalidatePath('/dashboard/pemesanan');
  redirect('/dashboard/pemesanan');
}

// Menghapus pemesanan
export async function deletePemesanan(id) {
  const pemesananId = parseInt(id, 10);
  await prisma.pemesanan.delete({ where: { id: pemesananId } });
  revalidatePath('/dashboard/pemesanan');
}

// 1. Mengambil daftar semua jamaah beserta total tabungan mereka
export async function getJamaahWithTotalTabungan() {
  try {
    const jamaahWithTabungan = await prisma.jamaah.findMany({
      include: {
        _count: {
          select: { tabungan: true }, // Menghitung jumlah setoran
        },
        tabungan: {
          select: {
            jumlahSetoran: true, // Hanya ambil kolom jumlah setoran untuk dijumlahkan
          },
        },
      },
      orderBy: { namaLengkap: 'asc' },
    });

    // Kalkulasi total tabungan untuk setiap jamaah
    return jamaahWithTabungan.map(j => ({
      ...j,
      totalTabungan: j.tabungan.reduce((sum, current) => sum + current.jumlahSetoran, 0),
    }));

  } catch (error) {
    console.error("Gagal mengambil data rekapitulasi tabungan:", error);
    return [];
  }
}

// 2. Mengambil riwayat setoran untuk SATU jamaah
export async function getSetoranByJamaahId(jamaahId) {
  const id = parseInt(jamaahId, 10);
  try {
    const jamaah = await prisma.jamaah.findUnique({
      where: { id },
      include: {
        tabungan: {
          orderBy: { tanggalSetoran: 'desc' },
        },
      },
    });
    return jamaah;
  } catch (error) {
    console.error("Gagal mengambil riwayat setoran:", error);
    return null;
  }
}

// 3. Menambahkan data setoran baru
export async function createSetoran(formData) {
  const jamaahId = parseInt(formData.get('jamaahId'), 10);
  const jumlahSetoran = parseInt(formData.get('jumlahSetoran'), 10);
  const keterangan = formData.get('keterangan');

  if (!jamaahId || !jumlahSetoran) {
    throw new Error('Data tidak lengkap');
  }

  await prisma.tabungan.create({
    data: {
      jamaahId,
      jumlahSetoran,
      keterangan,
    },
  });

  revalidatePath(`/dashboard/tabungan/detail/${jamaahId}`);
  redirect(`/dashboard/tabungan/detail/${jamaahId}`);
}

// --- CRUD UNTUK DATA JAMA'AH ---

// Mengambil SEMUA data jamaah untuk ditampilkan di tabel
export async function getAllJamaah(query) {
  try {
    const whereClause = query ? {
      OR: [
        { namaLengkap: { contains: query } },
        { nomorKtp: { contains: query } },
        { nomorTelepon: { contains: query } },
      ],
    } : {};

    const jamaah = await prisma.jamaah.findMany({
      where: whereClause,
      orderBy: { namaLengkap: 'asc' },
    });
    return jamaah;
  } catch (error) {
    console.error("Gagal mengambil data jamaah:", error);
    return [];
  }
}

// Mengambil SATU data jamaah berdasarkan ID untuk halaman edit
export async function getJamaahById(id) {
  const jamaahId = parseInt(id, 10);
  const jamaah = await prisma.jamaah.findUnique({
    where: { id: jamaahId },
  });
  if (!jamaah) notFound();
  return jamaah;
}

// MEMBUAT DATA JAMA'AH BARU
export async function createJamaah(formData) {
  const fileKtp = formData.get('scanKtp');
  const filePaspor = formData.get('scanPaspor');

  // Proses upload kedua file secara paralel
  const [scanKtpUrl, scanPasporUrl] = await Promise.all([
    uploadFile(fileKtp),
    uploadFile(filePaspor)
  ]);

  const data = {
    // ... (data lain: namaLengkap, nomorKtp, dll)
    namaLengkap: formData.get('namaLengkap'),
    nomorKtp: formData.get('nomorKtp'),
    nomorPaspor: formData.get('nomorPaspor') || null,
    tempatLahir: formData.get('tempatLahir'),
    tanggalLahir: new Date(formData.get('tanggalLahir')),
    jenisKelamin: formData.get('jenisKelamin'),
    alamat: formData.get('alamat'),
    nomorTelepon: formData.get('nomorTelepon'),
    email: formData.get('email'),
    pekerjaan: formData.get('pekerjaan'),
    // Tambahkan URL file yang sudah di-upload
    scanKtpUrl: scanKtpUrl,
    scanPasporUrl: scanPasporUrl,
  };

  await prisma.jamaah.create({ data });
  revalidatePath('/dashboard/jamaah');
  redirect('/dashboard/jamaah');
}


// MENGUPDATE DATA JAMA'AH
export async function updateJamaah(id, formData) {
  const jamaahId = parseInt(id, 10);
  
  // 1. Ambil data jamaah saat ini dari DB untuk mendapatkan URL file lama
  const currentJamaah = await prisma.jamaah.findUnique({ where: { id: jamaahId } });
  if (!currentJamaah) {
    throw new Error('Data jamaah tidak ditemukan.');
  }

  // 2. Proses file KTP jika ada file baru yang diupload
  const fileKtp = formData.get('scanKtp');
  let scanKtpUrl = currentJamaah.scanKtpUrl; // Defaultnya pakai URL lama

  if (fileKtp && fileKtp.size > 0) {
    console.log("Mengupload KTP baru...");
    // Hapus file KTP lama dari server jika ada
    if (currentJamaah.scanKtpUrl) {
      try {
        await unlink(path.join(process.cwd(), 'public', currentJamaah.scanKtpUrl));
      } catch (err) {
        console.log("Gagal menghapus file KTP lama (mungkin sudah tidak ada):", err.message);
      }
    }
    // Upload file KTP yang baru
    scanKtpUrl = await uploadFile(fileKtp);
  }

  // 3. Proses file Paspor jika ada file baru yang diupload
  const filePaspor = formData.get('scanPaspor');
  let scanPasporUrl = currentJamaah.scanPasporUrl; // Defaultnya pakai URL lama

  if (filePaspor && filePaspor.size > 0) {
    console.log("Mengupload Paspor baru...");
    // Hapus file Paspor lama dari server jika ada
    if (currentJamaah.scanPasporUrl) {
      try {
        await unlink(path.join(process.cwd(), 'public', currentJamaah.scanPasporUrl));
      } catch (err) {
        console.log("Gagal menghapus file Paspor lama (mungkin sudah tidak ada):", err.message);
      }
    }
    // Upload file Paspor yang baru
    scanPasporUrl = await uploadFile(filePaspor);
  }
  
  // 4. Siapkan semua data yang akan diupdate
  const data = {
    namaLengkap: formData.get('namaLengkap'),
    nomorKtp: formData.get('nomorKtp'),
    nomorPaspor: formData.get('nomorPaspor') || null,
    tempatLahir: formData.get('tempatLahir'),
    tanggalLahir: new Date(formData.get('tanggalLahir')),
    jenisKelamin: formData.get('jenisKelamin'),
    alamat: formData.get('alamat'),
    nomorTelepon: formData.get('nomorTelepon'),
    email: formData.get('email'),
    pekerjaan: formData.get('pekerjaan'),
    scanKtpUrl: scanKtpUrl, // Gunakan URL KTP yang baru atau yang lama
    scanPasporUrl: scanPasporUrl, // Gunakan URL Paspor yang baru atau yang lama
  };

  try {
    // 5. Update data di database
    await prisma.jamaah.update({
      where: { id: jamaahId },
      data,
    });
  } catch (error) {
    console.error("Gagal mengupdate data jamaah di DB:", error);
    // Di sini Anda bisa mengembalikan pesan error jika mau
    throw new Error("Gagal mengupdate data jamaah.");
  }
  
  // 6. Revalidasi dan Redirect
  revalidatePath('/dashboard/jamaah');
  redirect('/dashboard/jamaah');
}

// MENGHAPUS DATA JAMA'AH
export async function deleteJamaah(id) {
  const jamaahId = parseInt(id, 10);
  try {
    // Di masa depan, tambahkan pengecekan apakah jamaah ini punya pemesanan/tabungan aktif
    await prisma.jamaah.delete({ where: { id: jamaahId } });
  } catch (error) {
    console.error("Gagal menghapus jamaah:", error);
    // Mungkin akan error jika jamaah terhubung dengan data lain, ini bagus untuk integritas data
  }
  revalidatePath('/dashboard/jamaah');
}

async function uploadFile(file) {
  // Cek jika tidak ada file atau ukurannya 0
  if (!file || file.size === 0) {
    return null; // Kembalikan null jika tidak ada file
  }

  // Ubah file menjadi buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Buat nama file yang unik dengan timestamp
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  // Tulis file ke server di folder public/uploads
  await writeFile(filePath, buffer);

  // Kembalikan URL publiknya untuk disimpan ke database
  return `/uploads/${fileName}`;
}

export async function getTestimonials() {
  const prisma = new PrismaClient();
  try {
    const testimonials = await prisma.testimoni.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return testimonials;
  } catch (error) {
    console.error("Gagal mengambil data testimoni:", error);
    return [];
  }
}

export async function getTestimoniById(id) {
  const testimoni = await prisma.testimoni.findUnique({
    where: { id: parseInt(id) },
  });
  return testimoni;
}

// MEMBUAT TESTIMONI BARU
export async function createTestimoni(formData) {
  const fotoFile = formData.get('fotoUrl'); // Ambil file dari input dengan name="fotoUrl"

  if (!fotoFile || fotoFile.size === 0) {
    throw new Error('Foto screenshot testimoni wajib diisi.');
  }

  // Proses upload file (sama seperti sebelumnya)
  const fotoUrl = await uploadFile(fotoFile);

  // Ambil data teks yang baru
  const data = {
    namaJamaah: formData.get('namaJamaah'),
    deskripsiTestimoni: formData.get('deskripsiTestimoni'),
    fotoUrl: fotoUrl, // Gunakan URL dari file yang diupload
  };

  await prisma.testimoni.create({ data });

  revalidatePath('/dashboard/testimoni');
  redirect('/dashboard/testimoni');
}

// MENGUPDATE TESTIMONI
export async function updateTestimoni(id, formData) {
  const currentTestimoni = await prisma.testimoni.findUnique({ where: { id: parseInt(id) } });
  if (!currentTestimoni) throw new Error('Testimoni tidak ditemukan');

  const fotoFile = formData.get('fotoUrl');
  let newFotoUrl = currentTestimoni.fotoUrl; // Defaultnya pakai URL lama

  // Jika ada file baru yang di-upload, proses filenya
  if (fotoFile && fotoFile.size > 0) {
    // Hapus file lama jika ada
    if (currentTestimoni.fotoUrl) {
      const oldFilePath = path.join(process.cwd(), 'public', currentTestimoni.fotoUrl);
      try { await unlink(oldFilePath); } catch { console.log("File lama tidak ada, melanjutkan.") }
    }
    // Upload file baru
    newFotoUrl = await uploadFile(fotoFile);
  }

  // Siapkan data baru untuk di-update ke database
  const data = {
    namaJamaah: formData.get('namaJamaah'),
    deskripsiTestimoni: formData.get('deskripsiTestimoni'),
    fotoUrl: newFotoUrl, // Gunakan URL baru jika ada, atau URL lama jika tidak
  };

  await prisma.testimoni.update({
    where: { id: parseInt(id) },
    data,
  });

  revalidatePath('/dashboard/testimoni');
  redirect('/dashboard/testimoni');
}

// MENGHAPUS TESTIMONI
export async function deleteTestimoni(id) {
  try {
    const testimoni = await prisma.testimoni.findUnique({ where: { id: parseInt(id) } });

    // Hanya hapus foto, karena tidak ada video lagi
    if (testimoni && testimoni.fotoUrl) {
      const filePath = path.join(process.cwd(), 'public', testimoni.fotoUrl);
      await unlink(filePath);
    }
    
    await prisma.testimoni.delete({ where: { id: parseInt(id) } });

  } catch (error) {
    if (error.code !== 'ENOENT') { // Abaikan error jika file tidak ditemukan
        console.error("Gagal menghapus testimoni:", error);
    } else {
        // Jika file tidak ada tapi record DB ada, tetap hapus record DB
        await prisma.testimoni.delete({ where: { id: parseInt(id) } });
    }
  }

  revalidatePath('/dashboard/testimoni');
}

export async function getDokumentasi() {
  try {
    const dokumentasi = await prisma.dokumentasi.findMany({
      orderBy: {
        createdAt: 'desc', // Tampilkan yang terbaru di awal
      },
    });
    return dokumentasi;
  } catch (error) {
    console.error("Gagal mengambil data dokumentasi:", error);
    // Kembalikan array kosong jika terjadi error
    return [];
  }
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

export async function getPaketLandingPage() {
  try {
    const paket = await prisma.paket.findMany({
      orderBy: { tanggalKeberangkatan: 'asc' },
      take: 6, // Ambil 6 paket terdekat
    });
    return paket;
  } catch (error) {
    console.error("Gagal mengambil data paket:", error);
    return []; // Kembalikan array kosong jika gagal
  }
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

export async function sendToWhatsApp(formData) {
  // ... (kode untuk mengambil nama, email, dll.)
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  // ---> GANTI NOMOR DI SINI <---
  const waNumber = "6281251112909"; 

  const text = `
Halo, saya ingin bertanya tentang paket umroh.
---------------------
Nama: ${name}
Email: ${email}
No. Telepon: ${phone}
---------------------
Pesan:
${message}
  `.trim();

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  
  redirect(waLink);
}

// UPDATE PAKET
export async function updatePaket(id, formData) {
  console.log('--- ACTION UPDATEPAKET DIPANGGIL ---');
  console.log('ID Paket:', id);

  const fotoFile = formData.get('fotoPaket');
  let fileUrl = formData.get('fotoUrlLama'); 

  console.log('File baru diterima:', fotoFile?.name || 'Tidak ada file baru');

  // Jika ada file baru yang di-upload, proses filenya
  if (fotoFile && fotoFile.size > 0) {
    console.log('Memproses upload file baru...');
    // Hapus file lama jika ada
    const currentPaket = await prisma.paket.findUnique({ where: { id: parseInt(id) } });
    if (currentPaket?.fotoUrl) {
      const oldFilePath = path.join(process.cwd(), 'public', currentPaket.fotoUrl);
      try { 
        await unlink(oldFilePath);
        console.log('File lama berhasil dihapus:', currentPaket.fotoUrl);
      } catch { 
        console.log("File lama tidak ditemukan, melanjutkan proses.");
      }
    }
    // Upload file baru
    fileUrl = await uploadFile(fotoFile);
    console.log('File baru berhasil diupload, URL:', fileUrl);
  }

  // Siapkan data baru untuk di-update ke database
  const data = {
    namaPaket: formData.get('namaPaket'),
    fotoUrl: fileUrl,
    deskripsi: formData.get('deskripsi'),
    harga: parseInt(formData.get('harga'), 10),
    durasi: parseInt(formData.get('durasi'), 10),
    tanggalKeberangkatan: new Date(formData.get('tanggalKeberangkatan')),
    hotelMadinah: formData.get('hotelMadinah'),
    hotelMakkah: formData.get('hotelMakkah'),
    pesawat: formData.get('pesawat'),
    ratingHotelMakkah: parseInt(formData.get('ratingHotelMakkah'), 10),
    ratingHotelMadinah: parseInt(formData.get('ratingHotelMadinah'), 10),
    sisaKursi: parseInt(formData.get('sisaKursi'), 10),
  };

  // --- INI BAGIAN PALING PENTING UNTUK DILIHAT ---
  console.log('DATA YANG AKAN DIUPDATE:', data);
  // ---------------------------------------------

  try {
    await prisma.paket.update({
      where: { id: parseInt(id) },
      data,
    });
    console.log('SUKSES: Data paket berhasil diupdate di database.');
  } catch (error) {
    console.error('ERROR SAAT UPDATE PRISMA:', error); // Tampilkan error jika gagal
  }

  revalidatePath('/dashboard/paket');
  redirect('/dashboard/paket');
}

// DELETE PAKET
export async function deletePaket(id) {
  await prisma.paket.delete({ where: { id } });
  revalidatePath('/dashboard/paket');
}
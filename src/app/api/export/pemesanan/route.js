import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs'; // <-- Impor library baru

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return new NextResponse('Tanggal awal dan akhir wajib diisi', { status: 400 });
  }

  // Pengambilan data dari database tetap sama
  const pemesanan = await prisma.pemesanan.findMany({
    where: {
      tanggalPemesanan: { gte: new Date(from), lte: new Date(to) },
    },
    include: { jamaah: true, paket: true },
    orderBy: { tanggalPemesanan: 'asc' },
  });

  // --- MULAI LOGIKA PEMBUATAN FILE EXCEL (.xlsx) ---

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Pemesanan');

  // 1. Tentukan kolom dan header tabel
  worksheet.columns = [
    { header: 'ID Pesan', key: 'id', width: 10 },
    { header: 'Tanggal Pesan', key: 'tanggal', width: 25 },
    { header: 'Nama Jamaah', key: 'nama', width: 30 },
    { header: 'No. KTP', key: 'ktp', width: 20 },
    { header: 'Paket Dipesan', key: 'paket', width: 35 },
    { header: 'Status Bayar', key: 'status', width: 20 },
    { header: 'Catatan', key: 'catatan', width: 40 },
  ];

  // 2. Beri style pada header (tebal, background, border)
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }, // Warna abu-abu terang
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // 3. Masukkan data ke dalam baris-baris
  pemesanan.forEach(p => {
    worksheet.addRow({
      id: p.id,
      tanggal: new Date(p.tanggalPemesanan).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }),
      nama: p.jamaah.namaLengkap,
      ktp: p.jamaah.nomorKtp, // Tambahkan ' di depan agar tidak jadi scientific notation
      paket: p.paket.namaPaket,
      status: p.statusPembayaran,
      catatan: p.catatan || '',
    });
  });
  
  // 4. Beri border pada semua sel data
  worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
    if (rowNumber > 1) { // Mulai dari baris kedua (setelah header)
        row.eachCell({ includeEmpty: true }, function (cell) {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });
    }
  });


  // 5. Buat buffer dari workbook dan kirim sebagai file .xlsx
  const buffer = await workbook.xlsx.writeBuffer();

  const headers = new Headers();
  headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  headers.set('Content-Disposition', `attachment; filename="laporan-pemesanan-${new Date().toISOString().split('T')[0]}.xlsx"`);

  return new NextResponse(buffer, {
    status: 200,
    headers,
  });
}
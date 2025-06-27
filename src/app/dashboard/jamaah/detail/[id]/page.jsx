import Link from 'next/link';
import Image from 'next/image';
import { getJamaahById } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from 'lucide-react';

// Komponen kecil untuk menampilkan baris data agar lebih rapi
const DetailItem = ({ label, value }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-3 border-b">
    <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
    <dd className="sm:col-span-2 text-sm text-gray-900 font-semibold">{value || '-'}</dd>
  </div>
);

export default async function DetailJamaahPage({ params: { id } }) {
  const jamaah = await getJamaahById(id);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/dashboard/jamaah" className='flex items-center gap-2'>
              <ArrowLeft size={14}/> Kembali ke Daftar Jamaah
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{jamaah.namaLengkap}</h1>
              <p className="text-muted-foreground">Detail Lengkap Data Jamaah</p>
            </div>
            <Button asChild>
              <Link href={`/dashboard/jamaah/edit/${jamaah.id}`} className="flex items-center gap-2">
                <Edit size={16}/> Edit Data
              </Link>
            </Button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Informasi Pribadi */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-1">
                <DetailItem label="Nama Lengkap" value={jamaah.namaLengkap} />
                <DetailItem label="Nomor KTP" value={jamaah.nomorKtp} />
                <DetailItem label="Nomor Paspor" value={jamaah.nomorPaspor || 'Belum ada'} />
                <DetailItem label="Tempat Lahir" value={jamaah.tempatLahir} />
                <DetailItem label="Tanggal Lahir" value={new Date(jamaah.tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
                <DetailItem label="Jenis Kelamin" value={jamaah.jenisKelamin} />
                <DetailItem label="Alamat" value={jamaah.alamat} />
                <DetailItem label="Nomor Telepon" value={jamaah.nomorTelepon} />
                <DetailItem label="Email" value={jamaah.email || 'Tidak ada'} />
                <DetailItem label="Pekerjaan" value={jamaah.pekerjaan || 'Tidak ada'} />
              </dl>
            </CardContent>
          </Card>
        </div>
        
        {/* Kolom Kanan: Dokumen */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan KTP</CardTitle>
            </CardHeader>
            <CardContent>
              {jamaah.scanKtpUrl ? (
                <div>
                  <Image src={jamaah.scanKtpUrl} alt="Scan KTP" width={300} height={200} className="rounded-md border w-full h-auto object-contain" />
                  <Button asChild variant="secondary" className="mt-4 w-full">
                    <a href={jamaah.scanKtpUrl} download>Download KTP</a>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum di-upload.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scan Paspor</CardTitle>
            </CardHeader>
            <CardContent>
              {jamaah.scanPasporUrl ? (
                <div>
                  <Image src={jamaah.scanPasporUrl} alt="Scan Paspor" width={300} height={200} className="rounded-md border w-full h-auto object-contain" />
                  <Button asChild variant="secondary" className="mt-4 w-full">
                    <a href={jamaah.scanPasporUrl} download>Download Paspor</a>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum di-upload.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
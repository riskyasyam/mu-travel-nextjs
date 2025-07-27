'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PemesananForm({ jamaahList, paketList, pemesanan }) {
  const router = useRouter();
  const isEditMode = Boolean(pemesanan);

  // State untuk data form
  const [formData, setFormData] = useState({
    jamaahId: pemesanan?.jamaahId?.toString() || '',
    paketId: pemesanan?.paketId?.toString() || '',
    statusPembayaran: pemesanan?.statusPembayaran || '',
    catatan: pemesanan?.catatan || '',
  });
  
  // State untuk UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isEditMode) {
        await api.put(`/pemesanans/${pemesanan.id}`, formData);
      } else {
        await api.post('/pemesanans', formData);
      }
      router.push('/dashboard/pemesanan');
      router.refresh();
    } catch (error) {
      console.error("Gagal menyimpan data pemesanan:", error.response?.data);
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan. Pastikan jamaah belum memesan paket yang sama.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const statusOptions = ["BELUM BAYAR", "DP", "LUNAS_TABUNGAN", "LUNAS_CICILAN_FIF", "LUNAS"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Pilih Jamaah</Label>
        <Select name="jamaahId" value={formData.jamaahId} onValueChange={(value) => handleSelectChange('jamaahId', value)} required>
          <SelectTrigger><SelectValue placeholder="Pilih jamaah yang akan memesan" /></SelectTrigger>
          <SelectContent>
            {jamaahList.map(jamaah => (
              <SelectItem key={jamaah.id} value={jamaah.id.toString()}>{jamaah.namaLengkap} ({jamaah.nomorKtp})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Pilih Paket</Label>
        <Select name="paketId" value={formData.paketId} onValueChange={(value) => handleSelectChange('paketId', value)} required>
          <SelectTrigger><SelectValue placeholder="Pilih paket yang akan diambil" /></SelectTrigger>
          <SelectContent>
            {paketList.map(paket => (
              <SelectItem key={paket.id} value={paket.id.toString()}>{paket.namaPaket}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Status Pembayaran</Label>
        <Select name="statusPembayaran" value={formData.statusPembayaran} onValueChange={(value) => handleSelectChange('statusPembayaran', value)} required>
          <SelectTrigger><SelectValue placeholder="Pilih status pembayaran" /></SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>{status.replace(/_/g, ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Catatan (Opsional)</Label>
        <Textarea name="catatan" value={formData.catatan} onChange={handleTextareaChange} />
      </div>

      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : (isEditMode ? 'Update Pemesanan' : 'Simpan Pemesanan')}
        </Button>
      </div>
    </form>
  );
}

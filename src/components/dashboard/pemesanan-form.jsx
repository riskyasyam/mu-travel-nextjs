'use client';
import { createPemesanan, updatePemesanan } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Form ini menerima list jamaah, list paket, dan data pemesanan (opsional)
export default function PemesananForm({ jamaahList, paketList, pemesanan }) {
  const isEditMode = Boolean(pemesanan);
  const action = isEditMode ? updatePemesanan.bind(null, pemesanan.id) : createPemesanan;
  
  const statusOptions = ["BELUM BAYAR", "DP", "LUNAS_TABUNGAN", "LUNAS_CICILAN_FIF", "LUNAS"];

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label>Pilih Jamaah</Label>
        <Select name="jamaahId" defaultValue={pemesanan?.jamaahId?.toString()} required>
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
        <Select name="paketId" defaultValue={pemesanan?.paketId?.toString()} required>
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
        <Select name="statusPembayaran" defaultValue={pemesanan?.statusPembayaran} required>
          <SelectTrigger><SelectValue placeholder="Pilih status pembayaran" /></SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>{status.replace('_', ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Catatan (Opsional)</Label>
        <Textarea name="catatan" defaultValue={pemesanan?.catatan || ''} />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          {isEditMode ? 'Update Pemesanan' : 'Simpan Pemesanan'}
        </Button>
      </div>
    </form>
  );
}
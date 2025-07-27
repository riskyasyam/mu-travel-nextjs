'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { motion } from 'framer-motion';

const ContactSection = () => {
  // State untuk mengelola input form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const waNumber = "6281251112909"; // Ganti dengan nomor WA Anda
    const text = `
Halo, saya ingin bertanya tentang paket umroh.
---------------------
Nama: ${formData.name}
Email: ${formData.email}
No. Telepon: ${formData.phone}
---------------------
Pesan:
${formData.message}
    `.trim();

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    
    // Buka link WhatsApp di tab baru
    window.open(waLink, '_blank');
    
    setIsLoading(false);
  };

  return (
    <section id="alamat" className="bg-slate-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="overflow-hidden shadow-2xl rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Kolom Kiri: Form */}
              <div className="p-8 md:p-12">
                <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 font-poppins">
                  KONSULTASI SEKARANG
                </h2>
                <p className="mt-3 text-gray-600">
                  Tim kami siap membantu Anda. Kirimkan pertanyaan Anda dan kami akan segera merespons.
                </p>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Nama Lengkap Anda" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Aktif Anda" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Nomor WhatsApp Anda" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan Anda</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tuliskan pertanyaan Anda di sini..." required />
                  </div>
                  <div>
                    <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-base" disabled={isLoading}>
                      {isLoading ? 'Memproses...' : 'Kirim via WhatsApp'}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Kolom Kanan: Peta & Alamat */}
              <div className="flex flex-col">
                <div className="w-full h-80 md:h-full min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.85966550608!2d116.8576473747594!3d-1.25595999872958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df1475c77a3c3b5%3A0x4a1f9c3556f86642!2sKantor%20WALI%20KOTA%20BALIKPAPAN!5e0!3m2!1sen!2sid!4v1718717838183!5m2!1sen!2sid6"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="bg-gray-800 text-white p-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={24} className="mt-1 text-orange-400 flex-shrink-0"/>
                    <div>
                      <h3 className="font-bold">Kunjungi Kantor Cabang Kami</h3>
                      <address className="text-sm text-gray-300 mt-1 not-italic">
                        Perumahan BDS 2, Blok B/36, Rt. 43,<br/>
                        Kelurahan Sungai Nangka, Balikpapan Selatan,<br/>
                        Kalimantan Timur
                      </address>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

// resources/js/components/Footer.tsx
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#4b552a] text-white pt-16 pb-8 rounded-t-[3rem]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                    {/* Kiri: Logo & Deskripsi */}
                    <div className="w-full md:w-1/2">
                        
                        {/* Container logo tanpa margin-bottom */}
                        <div className="flex items-center">
                            <img 
                                src="/images/logo lba.webp" 
                                alt="Logo Loka Berdaya Amerta" 
                                className="h-16 md:h-28 w-auto object-contain" 
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        
                        {/* Teks deskripsi ditarik ke atas dengan -mt-2 atau -mt-4 (negative margin) */}
                        <p className="text-gray-300 leading-relaxed mb-6 max-w-md -mt-2 md:-mt-4">
                            Loka Berdaya Amerta adalah lembaga pionir dalam pemberdayaan masyarakat yang fokus pada peningkatan keterampilan, ekonomi, pendidikan, dan keberlanjutan lingkungan melalui kolaborasi lintas sektor.
                        </p>
                        
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-[#f7ffda] transition"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-[#f7ffda] transition"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-[#f7ffda] transition"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-[#f7ffda] transition"><Youtube size={24} /></a>
                        </div>
                    </div>

                    {/* Kanan: Kontak */}
                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <Phone className="mt-1 text-[#f7ffda]" size={20} />
                            <p className="text-gray-300">081 330003450</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="mt-1 text-[#f7ffda]" size={20} />
                            <p className="text-gray-300">info@lokaberdaya.com</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 text-[#f7ffda]" size={20} />
                            <p className="text-gray-300">Jl. Sarirogo No.1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234</p>
                        </div>
                    </div>
                </div>

                {/* Garis Bawah & Copyright */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© {new Date().getFullYear()} Loka Berdaya Amerta. All rights reserved.</p>
                    <div className="flex gap-4 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
    const [isProgramOpen, setIsProgramOpen] = useState(false);

    return (
        <nav className="w-full bg-[#4b552a] px-6 py-4 shadow-md fixed top-0 left-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                
                {/* 1. KIRI: Logo & Teks */}
                <div className="flex items-center gap-3">
                    <img 
                        src="/images/logo lba.webp" 
                        alt="Logo LBA" 
                        className="h-20 w-auto object-contain" 
                        onError={(e) => e.currentTarget.style.display = 'none'} 
                    />
                    <Link href="/" className="text-xl md:text-2xl font-bold text-white tracking-tight hover:text-[#f7ffda] transition">
                        Loka Berdaya Amerta
                    </Link>
                </div>

                {/* 2. KANAN: Wadah untuk Menu dan Tombol Login */}
                <div className="flex items-center gap-12 lg:gap-20">
                    
                    {/* Menu Navigasi (Tengah) */}
                    <div className="hidden md:flex items-center gap-8 text-[#f7ffda]/80 font-medium">
                        <Link href="/" className="hover:text-white transition">Beranda</Link>
                        <Link href="/tentang" className="hover:text-white transition">Tentang Kami</Link>
                        
                        {/* --- MENU PUBLIKASI / BLOG DITAMBAHKAN DI SINI --- */}
                        <Link href="/blog" className="hover:text-white transition">Blog</Link>

                        {/* --- DROPDOWN PROGRAM PEMBERDAYAAN --- */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsProgramOpen(true)}
                            onMouseLeave={() => setIsProgramOpen(false)}
                        >
                            <button className="flex items-center gap-1 hover:text-white transition py-2 focus:outline-none cursor-pointer">
                                Program Pemberdayaan
                                <ChevronDown 
                                    size={16} 
                                    className={`transition-transform duration-200 ${isProgramOpen ? 'rotate-180' : ''}`} 
                                />
                            </button>

                            {/* Kotak Dropdown Putih */}
                            {isProgramOpen && (
                                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl overflow-hidden py-2 text-gray-700 z-50 border border-gray-100">
                                    <Link href="/program/agriculture" className="block px-5 py-3 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm">Program Agriculture (Pertanian)</Link>
                                    <Link href="/program/agroforestry" className="block px-5 py-3 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm">Program Agroforestry dan Perkebunan</Link>
                                    <Link href="/program/peternakan" className="block px-5 py-3 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm">Program Peternakan</Link>
                                    <Link href="/program/umkm" className="block px-5 py-3 hover:bg-[#f7ffda] hover:text-[#4b552a] transition font-medium text-sm">Program UMKM Bangkit</Link>
                                </div>
                            )}
                        </div>
                        {/* --- AKHIR DROPDOWN --- */}

                        <Link href="/kontak" className="hover:text-white transition">Hubungi Kami</Link>
                    </div>

                    {/* Tombol Login & Register (Kanan) */}
                    <div className="flex items-center gap-5">
                        <Link href="/login" className="text-white font-medium hover:text-[#f7ffda] transition">
                            Log in
                        </Link>
                        <Link href="/register" className="bg-[#f7ffda] text-[#4b552a] px-5 py-2.5 rounded-md font-bold hover:bg-white transition shadow-sm">
                            Register
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}
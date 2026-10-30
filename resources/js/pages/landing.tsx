import { Head } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Users, Leaf, Building2, MapPin, Phone, Mail, Send, User } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800">
            <Head title="Loka Berdaya Amerta" />

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HERO SECTION */}
            <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/landing.webp')" }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start text-white mt-16">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-4">
                        Tumbuhkan Kesejahteraan<br />dengan Pemberdayaan
                    </h1>
                    <p className="text-lg md:text-xl font-light">
                        Budayakan Potensi Lokal untuk Tumbuhkan Kesejahteraan
                    </p>
                </div>
            </section>

            {/* 3. STATS BAR */}
            <div className="container mx-auto px-6 md:px-12 relative z-20 -mt-16">
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row justify-around items-center gap-6 border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#f7ffda] rounded-full text-[#4b552a]">
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                            <p className="text-sm text-gray-500">Penerima Manfaat</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#f7ffda] rounded-full text-[#4b552a]">
                            <Leaf size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">4</h3>
                            <p className="text-sm text-gray-500">Program</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#f7ffda] rounded-full text-[#4b552a]">
                            <Building2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">15 Kota</h3>
                            <p className="text-sm text-gray-500">Titik Pemberdayaan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. TENTANG KAMI */}
            <section className="container mx-auto px-6 md:px-12 py-24">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 relative">
                        <img 
                            src="/images/tentang.webp" 
                            alt="Petani Sawah" 
                            className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
                        />
                        <div className="absolute -bottom-6 right-6 md:right-12 bg-[#9c8e4d] text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[150px]">
                            <span className="text-4xl font-bold">30</span>
                            <span className="text-sm font-medium">Tahun Berkarya</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mt-8 md:mt-0">
                        <span className="text-[#4b552a] font-semibold tracking-wider uppercase text-sm mb-2 block">Tentang Kami</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Sekilas Tentang Loka Berdaya Amerta</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Sebuah lembaga yang berkomitmen untuk mendorong pemberdayaan masyarakat, inovasi, dan pembangunan berkelanjutan. Loka Berdaya Amerta adalah lembaga pionir dalam pemberdayaan masyarakat yang fokus pada peningkatan keterampilan, ekonomi, pendidikan, dan keberlanjutan lingkungan melalui kolaborasi lintas sektor.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. VISI & MISI */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#eff5da] p-10 rounded-2xl shadow-sm">
                        <h3 className="text-2xl font-bold text-[#4b552a] mb-4">Visi</h3>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Menjadi lembaga pionir dalam pemberdayaan masyarakat, menciptakan lingkungan yang berdaya, berdamai, dan berkelanjutan.
                        </p>
                    </div>
                    <div className="bg-[#eff5da] p-10 rounded-2xl shadow-sm">
                        <h3 className="text-2xl font-bold text-[#4b552a] mb-4">Misi</h3>
                        <ul className="text-gray-700 leading-relaxed text-lg list-disc pl-5 space-y-2">
                            <li>Mengembangkan program pemberdayaan masyarakat yang berfokus pada peningkatan keterampilan, kesejahteraan ekonomi, dan pendidikan.</li>
                            <li>Mendorong inovasi dan pengembangan teknologi yang ramah lingkungan untuk mendukung pembangunan berkelanjutan.</li>
                            <li>Menjadi mitra strategis bagi pemerintah, lembaga swadaya masyarakat, dan sektor bisnis dalam mengatasi berbagai tantangan pembangunan.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. PROGRAM UTAMA */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 max-w-lg leading-tight">
                    Program Utama Pemberdayaan Masyarakat
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row border border-gray-100">
                        <img src="/images/agriculture.webp" alt="Agriculture" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" />
                        <div className="p-6 flex flex-col justify-between w-full sm:w-3/5">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Program Agriculture</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">Mendorong ketahanan pangan melalui peningkatan produktivitas dan kemandirian petani secara berkelanjutan.</p>
                            </div>
                            <button className="bg-[#4b552a] text-white px-4 py-2 rounded-lg text-sm w-max hover:bg-[#3a4220] transition">Selengkapnya</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row border border-gray-100">
                        <img src="/images/agroforestry.webp" alt="Agroforestry" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" />
                        <div className="p-6 flex flex-col justify-between w-full sm:w-3/5">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Agroforestry dan Perkebunan</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">Meningkatkan hasil pertanian melalui integrasi tanaman hutan dan perkebunan untuk meningkatkan pendapatan sekaligus menjaga kelestarian lingkungan.</p>
                            </div>
                            <button className="bg-[#4b552a] text-white px-4 py-2 rounded-lg text-sm w-max hover:bg-[#3a4220] transition">Selengkapnya</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row border border-gray-100">
                        <img src="/images/peternakan.webp" alt="Peternakan" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" />
                        <div className="p-6 flex flex-col justify-between w-full sm:w-3/5">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Program Peternakan</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">Mendorong peternak berdaya melalui penguatan modal usaha dan akses pasar yang lebih luas.</p>
                            </div>
                            <button className="bg-[#4b552a] text-white px-4 py-2 rounded-lg text-sm w-max hover:bg-[#3a4220] transition">Selengkapnya</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row border border-gray-100">
                        <img src="/images/umkm.webp" alt="UMKM" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" />
                        <div className="p-6 flex flex-col justify-between w-full sm:w-3/5">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">UMKM Bangkit</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">Hadirkan akses pembiayaan tanpa riba untuk mendorong pertumbuhan usaha kecil yang berdaya.</p>
                            </div>
                            <button className="bg-[#4b552a] text-white px-4 py-2 rounded-lg text-sm w-max hover:bg-[#3a4220] transition">Selengkapnya</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. MAP SECTION */}
            <section className="container mx-auto px-6 md:px-12 pb-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4b552a] mb-8">Temukan Kami di</h2>
                <div className="w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-md relative">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.307548570149!2d112.67889967357418!3d-7.431179073205722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e132a4632891%3A0x4058849ad5fd97eb!2sYatim%20Mandiri%20Sidoarjo%3A%20Lembaga%20Amil%20Zakat%20Nasional!5e0!3m2!1sid!2sid!4v1793240614969!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </div>
            </section>

            {/* 8. TESTIMONI */}
            <section className="container mx-auto px-6 md:px-12 pb-24 text-center">
                <div className="inline-block bg-[#9c8e4d] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    Testimoni Penerima Manfaat
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#4b552a] mb-4 leading-tight">
                    Kata Penerima Manfaat Tentang<br/>Program Loka Berdaya Amerta
                </h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Cerita nyata dari peserta, relawan, dan masyarakat yang telah merasakan dampak langsung dari program pemberdayaan.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    
                    {/* Testimoni 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
                        <div className="mb-8 relative">
                            <span className="text-6xl text-[#f7ffda] absolute -top-4 -left-2 z-0 font-serif">"</span>
                            <p className="text-gray-700 relative z-10 text-lg leading-relaxed">
                                "Saya sangat merasakan dampak dari program pemberdayaan dari Loka Berdaya Amerta. Terimakasih LBA"
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="w-14 h-14 bg-[#eff5da] rounded-full flex items-center justify-center text-[#4b552a]">
                                <User size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#4b552a] text-lg">Pak Duwi</h4>
                                <p className="text-sm text-gray-500 font-medium">Petani</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimoni 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
                        <div className="mb-8 relative">
                            <span className="text-6xl text-[#f7ffda] absolute -top-4 -left-2 z-0 font-serif">"</span>
                            <p className="text-gray-700 relative z-10 text-lg leading-relaxed">
                                "Melalui program Gen Mandiri saya menjadi pemuda yang lebih melek akan potensi diri dan potensi lingkungan untuk bisnis"
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="w-14 h-14 bg-[#eff5da] rounded-full flex items-center justify-center text-[#4b552a]">
                                <User size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#4b552a] text-lg">Mas Abdul</h4>
                                <p className="text-sm text-gray-500 font-medium">Alumni Gen Mandiri</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimoni 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
                        <div className="mb-8 relative">
                            <span className="text-6xl text-[#f7ffda] absolute -top-4 -left-2 z-0 font-serif">"</span>
                            <p className="text-gray-700 relative z-10 text-lg leading-relaxed">
                                "Terimakasih LBA, dengan program kesejahteraan perempuan, Kami para janda bisa tetap berkarya"
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="w-14 h-14 bg-[#eff5da] rounded-full flex items-center justify-center text-[#4b552a]">
                                <User size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#4b552a] text-lg">Ibu Setiani</h4>
                                <p className="text-sm text-gray-500 font-medium">PM Bunda Bisa</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 9. MITRA KOLABORATOR */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12">
                    
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#4b552a] mb-4">Mitra Kolaborator</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Loka Berdaya Amerta telah berkolaborasi dengan berbagai mitra strategis dalam melaksanakan program pemberdayaan ekonomi dan sosial.
                        </p>
                    </div>

                    <div className="w-full md:w-2/3 flex flex-wrap items-center justify-center md:justify-end gap-8 md:gap-12">
                        <div className="flex items-center justify-center h-20 w-40 bg-gray-50 border border-gray-200 rounded-xl">
                            <span className="text-gray-400 font-semibold text-sm">Logo Mitra 1</span>
                        </div>
                        <div className="flex items-center justify-center h-20 w-40 bg-gray-50 border border-gray-200 rounded-xl">
                            <span className="text-gray-400 font-semibold text-sm">Logo Mitra 2</span>
                        </div>
                        <div className="flex items-center justify-center h-20 w-40 bg-gray-50 border border-gray-200 rounded-xl">
                            <span className="text-gray-400 font-semibold text-sm">Logo Mitra 3</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. HUBUNGI KAMI SECTION */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Kiri: Form Kontak (Warna Hijau Tua) */}
                    <div className="bg-[#4b552a] p-10 md:p-14 text-white">
                        <h2 className="text-3xl font-bold mb-2">Hubungi Kami</h2>
                        <p className="text-[#f7ffda]/80 mb-8">Punya pertanyaan khusus untuk kami?</p>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Nama *" 
                                    className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email *" 
                                    className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="tel" 
                                    placeholder="No. Telepon" 
                                    className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Subject" 
                                    className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition"
                                />
                            </div>
                            <div>
                                <textarea 
                                    rows={4} 
                                    placeholder="Pesan" 
                                    className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#f7ffda] transition resize-none"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="flex items-center gap-2 bg-[#f7ffda] text-[#4b552a] px-6 py-3 rounded-lg font-bold hover:bg-white transition duration-300"
                            >
                                <Send size={18} />
                                KIRIM PESAN
                            </button>
                        </form>
                    </div>

                    {/* Kanan: Info Kontak (Warna Cream/White) */}
                    <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
                        <span className="text-[#9c8e4d] font-semibold tracking-wider uppercase mb-2 block">Lebih Lanjut</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">Kontak Kami</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#f7ffda] p-3 rounded-full text-[#4b552a]">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Telepon / WhatsApp</h4>
                                    <p className="text-gray-600">081 330003450</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#f7ffda] p-3 rounded-full text-[#4b552a]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-600">info@lokaberdaya.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#f7ffda] p-3 rounded-full text-[#4b552a]">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Alamat Kantor</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Jl. Sarirogo No. 1, Sari Rogo, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 11. FOOTER (Menggunakan Komponen Terpisah) */}
            <Footer />
        </div>
    );
}
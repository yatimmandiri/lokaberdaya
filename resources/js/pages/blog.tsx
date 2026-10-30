import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Kategori Filter
const categories = ["Semua Berita", "Pertanian", "Peternakan", "UMKM", "Kegiatan"];

// Data Dummy Berita Blog
const blogData = [
    {
        id: 1,
        kategori: "Pertanian",
        judul: "Dari Ladang untuk Negeri, Kediri Menyejahterakan Petani",
        tanggal: "12 Okt 2024",
        penulis: "Tim LBA",
        gambar: "https://images.unsplash.com/photo-1592982537447-6f29922e2f5b?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Program pendampingan pertanian di Kediri berhasil meningkatkan hasil panen gabah hingga 30 ton dalam satu periode..."
    },
    {
        id: 2,
        kategori: "Kegiatan",
        judul: "Launching Program Baru: Sinergi LBA dengan Pemerintah Desa",
        tanggal: "05 Okt 2024",
        penulis: "Humas LBA",
        gambar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Peresmian program pemberdayaan ekonomi baru yang menyasar kelompok tani dan UMKM di wilayah Sidoarjo..."
    },
    {
        id: 3,
        kategori: "UMKM",
        judul: "UMKM Bangkit: Kisah Ibu Setiani Tetap Berkarya",
        tanggal: "28 Sep 2024",
        penulis: "Tim LBA",
        gambar: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Melalui program kesejahteraan perempuan, para janda kini memiliki akses permodalan tanpa riba untuk memulai usaha..."
    },
    {
        id: 4,
        kategori: "Pertanian",
        judul: "Mengenal Agroforestry: Meningkatkan Ekonomi Tanpa Merusak Hutan",
        tanggal: "20 Sep 2024",
        penulis: "Tim LBA",
        gambar: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Pendekatan integrasi tanaman hutan dan perkebunan menjadi solusi cerdas bagi petani untuk tetap produktif..."
    },
    {
        id: 5,
        kategori: "Peternakan",
        judul: "Pelatihan Fattening Domba untuk Peternak Pemula",
        tanggal: "15 Sep 2024",
        penulis: "Divisi Peternakan",
        gambar: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Loka Berdaya Amerta mengadakan pelatihan intensif mengenai manajemen pakan dan penggemukan domba..."
    },
    {
        id: 6,
        kategori: "Kegiatan",
        judul: "Penyaluran Modal Usaha Tahap II untuk 37 Penerima Manfaat",
        tanggal: "10 Sep 2024",
        penulis: "Humas LBA",
        gambar: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Sebanyak 37 pelaku usaha mikro dan ultra mikro menerima bantuan permodalan dengan akad Qordhul Hasan..."
    },
    {
        id: 7,
        kategori: "Pertanian",
        judul: "Panen Raya di Lumajang: Bukti Kemandirian Petani",
        tanggal: "02 Sep 2024",
        penulis: "Tim LBA",
        gambar: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Desa Sidorejo merayakan panen raya dengan hasil yang memuaskan berkat pendampingan teknis yang berkelanjutan..."
    },
    {
        id: 8,
        kategori: "UMKM",
        judul: "Tips Memasarkan Produk UMKM di Era Digital",
        tanggal: "25 Agu 2024",
        penulis: "Divisi Ekonomi",
        gambar: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Pendampingan tidak hanya soal modal, tetapi juga pemasaran. Berikut strategi jitu memasarkan produk UMKM..."
    },
    {
        id: 9,
        kategori: "Kegiatan",
        judul: "Kunjungan Studi Tiru dari Lembaga Pemberdayaan Lain",
        tanggal: "18 Agu 2024",
        penulis: "Humas LBA",
        gambar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        ringkasan: "Menerima kunjungan dari berbagai lembaga untuk berbagi praktik baik dalam pengelolaan program pemberdayaan..."
    }
];

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState("Semua Berita");

    // Logika untuk memfilter berita berdasarkan kategori
    const filteredBlog = activeCategory === "Semua Berita" 
        ? blogData 
        : blogData.filter(blog => blog.kategori === activeCategory);

    return (
        <div className="min-h-screen bg-[#f7ffda] font-sans text-gray-800">
            <Head title="Blog & Publikasi - Loka Berdaya Amerta" />

            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. HEADER SECTION */}
            <section className="pt-32 pb-12 text-center container mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#4b552a] mb-4">Blog & Publikasi</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Ikuti perkembangan terbaru, kisah inspiratif, dan kabar terbaru dari program pemberdayaan Loka Berdaya Amerta.
                </p>
            </section>

            {/* 3. FILTER KATEGORI */}
            <section className="container mx-auto px-6 md:px-12 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                activeCategory === cat
                                    ? 'bg-[#4b552a] text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-[#4b552a]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* 4. GRID BLOG */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                {filteredBlog.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Belum ada berita untuk kategori ini.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlog.map((blog) => (
                            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                                
                                {/* Gambar Cover */}
                                <div className="h-56 w-full overflow-hidden relative">
                                    <img 
                                        src={blog.gambar} 
                                        alt={blog.judul} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    {/* Badge Kategori */}
                                    <div className="absolute top-4 left-4 bg-[#4b552a]/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-semibold">
                                        {blog.kategori}
                                    </div>
                                </div>

                                {/* Konten Kartu */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{blog.tanggal}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{blog.penulis}</span>
                                        </div>
                                    </div>

                                    {/* Judul Berita */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-[#4b552a] transition">
                                        {blog.judul}
                                    </h3>
                                    
                                    {/* Ringkasan */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {blog.ringkasan}
                                    </p>

                                    {/* Tombol Selengkapnya */}
                                    <Link 
                                        href="#" 
                                        className="flex items-center justify-between w-full bg-[#f7ffda] text-[#4b552a] px-4 py-3 rounded-lg text-sm font-bold hover:bg-[#4b552a] hover:text-white transition group/btn"
                                    >
                                        Baca Selengkapnya
                                        <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition" />
                                    </Link>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Pagination Placeholder */}
                <div className="flex justify-center mt-16">
                    <div className="flex gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4b552a] text-white font-bold cursor-pointer">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 border border-gray-200 font-bold hover:bg-gray-50 cursor-pointer">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-600 border border-gray-200 font-bold hover:bg-gray-50 cursor-pointer">3</button>
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <Footer />
        </div>
    );
}
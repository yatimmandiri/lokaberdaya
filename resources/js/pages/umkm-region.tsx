import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Program, UmkmRegion } from '@/types/content';
import { ArrowLeft, MapPin, Users } from 'lucide-react';

type Props = {
    program: Program;
    region: UmkmRegion;
};

export default function UmkmRegionPage({ program, region }: Props) {
    const images = region.images
        .map((image) => image.image_url)
        .filter((image): image is string => Boolean(image));

    const beneficiaries = region.beneficiaries ?? [];

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head
                title={`${region.city} - ${program.page_title ?? program.title} - Loka Berdaya Amerta`}
            />

            <Navbar />

            <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-6 md:px-12">
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <Link href="/" className="hover:text-[#4b552a]">
                            Beranda
                        </Link>
                        <span className="text-gray-300">/</span>
                        <Link
                            href={`/program/${program.slug}`}
                            className="hover:text-[#4b552a]"
                        >
                            {program.title}
                        </Link>
                        <span className="text-gray-300">/</span>
                        <span className="font-medium text-gray-900">
                            {region.city}
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-14">
                        <div className="md:col-span-5">
                            <div className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-[#9c8e4d] uppercase">
                                <span className="h-px w-8 bg-[#9c8e4d]" />
                                UMKM Bangkit
                            </div>

                            <h1 className="mb-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-[#4b552a]">
                                {region.city}
                            </h1>

                            <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600">
                                {region.description ??
                                    `Terdapat ${beneficiaries.length} pelaku usaha yang telah mendapatkan pendampingan dan permodalan di wilayah ini.`}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                                <Link
                                    href={`/program/${program.slug}`}
                                    className="group inline-flex items-center gap-2 rounded-full bg-[#4b552a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3a4220]"
                                >
                                    <ArrowLeft
                                        size={16}
                                        className="transition-transform group-hover:-translate-x-1"
                                    />
                                    Kembali ke Program
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-3xl">
                                <img
                                    src={
                                        images[0] ??
                                        program.hero_image_url ??
                                        '/images/umkm.webp'
                                    }
                                    alt={`UMKM di ${region.city}`}
                                    className="h-85 w-full object-cover object-top md:h-120"
                                />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur">
                                    <MapPin
                                        size={12}
                                        className="text-[#4b552a]"
                                    />
                                    <span className="text-[10px] font-bold tracking-widest text-[#4b552a] uppercase">
                                        {region.city}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {images.length > 1 && (
                <section className="border-y border-gray-200/70 bg-white">
                    <div className="container mx-auto px-6 py-10 md:px-12 md:py-12">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {images.slice(1).map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-4/3 overflow-hidden rounded-xl bg-gray-100"
                                >
                                    <img
                                        src={image}
                                        alt={`UMKM di ${region.city} - ${index + 2}`}
                                        className="h-full w-full object-cover object-top"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                                <Users size={14} />
                                Penerima Manfaat
                            </div>
                            <h2 className="text-3xl leading-tight font-bold text-gray-900 md:text-[2.5rem]">
                                Wilayah {region.city}
                            </h2>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-[#4b552a] tabular-nums">
                                {String(beneficiaries.length).padStart(2, '0')}
                            </div>
                            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                Pelaku Usaha
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-700">
                                        <th className="border-b-2 border-gray-200 p-4 font-semibold">
                                            No
                                        </th>
                                        <th className="border-b-2 border-gray-200 p-4 font-semibold">
                                            Nama
                                        </th>
                                        <th className="border-b-2 border-gray-200 p-4 font-semibold">
                                            Bidang Usaha
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {beneficiaries.map((beneficiary, index) => (
                                        <tr
                                            key={beneficiary.id}
                                            className="transition hover:bg-[#f7ffda]/50"
                                        >
                                            <td className="border-b border-gray-100 p-4 text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="border-b border-gray-100 p-4 font-medium text-gray-800">
                                                {beneficiary.name}
                                            </td>
                                            <td className="border-b border-gray-100 p-4 text-gray-600">
                                                {beneficiary.business}
                                            </td>
                                        </tr>
                                    ))}
                                    {beneficiaries.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="p-8 text-center text-sm text-gray-500"
                                            >
                                                Data penerima manfaat belum
                                                tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
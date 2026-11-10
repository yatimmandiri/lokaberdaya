import { Head, Link } from '@inertiajs/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Program, ProgramActivity } from '@/types/content';
import { ArrowLeft, ArrowUpRight, MapPin, Tag } from 'lucide-react';

type Props = {
    program: Program;
    activity: ProgramActivity;
};

export default function ProgramActivityPage({ program, activity }: Props) {
    const paragraphs = (activity.long_description ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const details = activity.detail_items ?? [];

    return (
        <div className="min-h-screen bg-[#fafaf7] font-sans text-gray-800 selection:bg-[#4b552a] selection:text-[#f7ffda]">
            <Head
                title={`${activity.city} - ${program.page_title ?? program.title} - Loka Berdaya Amerta`}
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
                            {activity.city}
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-14">
                        <div className="md:col-span-5">
                            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-[0.3em] text-[#9c8e4d] uppercase">
                                <span className="h-px w-8 bg-[#9c8e4d]" />
                                Program
                            </div>

                            {activity.category && (
                                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#4b552a]/10 px-3 py-1 text-[11px] font-bold tracking-wider text-[#4b552a] uppercase">
                                    <Tag size={12} />
                                    {activity.category}
                                </div>
                            )}

                            <h1 className="mb-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-[#4b552a]">
                                {activity.city}
                            </h1>

                            <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600">
                                {program.page_title ?? program.title}
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
                                <Link
                                    href="/kontak"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#4b552a]"
                                >
                                    <span className="border-b border-[#4b552a]/30 pb-0.5 transition group-hover:border-[#4b552a]">
                                        Dukung program ini
                                    </span>
                                    <ArrowUpRight
                                        size={14}
                                        className="transition-transform group-hover:rotate-45"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-3xl">
                                <img
                                    src={
                                        activity.image_url ??
                                        program.hero_image_url ??
                                        '/images/agriculture.webp'
                                    }
                                    alt={`Kegiatan di ${activity.city}`}
                                    className="h-85 w-full object-cover md:h-120"
                                />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur">
                                    <MapPin
                                        size={12}
                                        className="text-[#4b552a]"
                                    />
                                    <span className="text-[10px] font-bold tracking-widest text-[#4b552a] uppercase">
                                        {activity.city}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {details.length > 0 && (
                <section className="border-y border-gray-200/70 bg-white">
                    <div className="container mx-auto px-6 py-10 md:px-12 md:py-12">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {details.map((detail, index) => (
                                <div
                                    key={index}
                                    className="flex gap-2 text-sm leading-relaxed text-gray-600"
                                >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9c8e4d]" />
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {paragraphs.length > 0 && (
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
                            <div className="md:col-span-3">
                                <div className="sticky top-28">
                                    <div className="mb-2 text-[11px] font-bold tracking-[0.25em] text-[#9c8e4d] uppercase">
                                        Selengkapnya
                                    </div>
                                    <h2 className="text-xl leading-tight font-bold text-gray-900">
                                        Kegiatan di {activity.city}
                                    </h2>
                                </div>
                            </div>
                            <div className="md:col-span-9">
                                <div className="space-y-6 text-base leading-[1.8] whitespace-pre-wrap text-gray-700 md:text-lg">
                                    {paragraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
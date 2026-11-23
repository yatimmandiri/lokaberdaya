import { Form, Head, Link, usePage } from "@inertiajs/react";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Leaf,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { useState, type CSSProperties, type MouseEvent } from "react";
import GoogleLoginButton from "@/components/google-login-button";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { home } from "@/routes";
import { store } from "@/routes/login";
import { request } from "@/routes/password";

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const highlights = [
    {
        icon: Leaf,
        title: "Data terpusat",
        description: "Semua informasi desa dalam satu tempat.",
    },
    {
        icon: BadgeCheck,
        title: "Akses terkendali",
        description: "Hanya administrator yang dapat mengelola.",
    },
    {
        icon: ShieldCheck,
        title: "Aman & andal",
        description: "Aktivitas tercatat dan terlindungi.",
    },
];

export default function Login({ status, canResetPassword }: Props) {
    const { name, site } = usePage().props;
    const brand = site?.site_name || name || "Loka Berdaya Amerta";
    const [pointer, setPointer] = useState({ x: 50, y: 0 });

    const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <>
            <Head title="Masuk Admin" />

            <div className="relative min-h-svh overflow-hidden bg-[#f7ffda] text-gray-900">
                {/* Latar dekoratif yang bergerak halus */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 -left-40 size-[28rem] rounded-full bg-[#e5edcb] opacity-80 blur-3xl animate-pulse"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 -bottom-40 size-[32rem] rounded-full bg-[#d7e5a8] opacity-70 blur-3xl animate-pulse [animation-delay:1s]"
                />

                <div className="relative mx-auto grid min-h-svh w-full max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Panel kiri: identitas & nilai produk */}
                    <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#4b552a] px-12 py-12 text-white lg:flex xl:px-16">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(220,240,160,0.18),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(0,0,0,0.28),transparent_50%)]"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:46px_46px]"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full border border-white/10"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full border border-white/10"
                        />

                        <Link
                            href={home()}
                            className="relative z-10 inline-flex w-fit items-center gap-3 rounded-xl transition-transform duration-300 hover:-translate-x-1"
                        >
                            <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                                {/* LOGO DESKTOP (PANEL KIRI) */}
                                <img
                                    src="/images/logo lba.webp"
                                    alt="Logo"
                                    className="size-6 object-contain"
                                />
                            </span>
                            <span className="text-lg font-semibold tracking-tight">
                                {brand}
                            </span>
                        </Link>

                        <div className="relative z-10 my-12 max-w-lg">
                            <h2 className="mt-6 text-4xl leading-[1.15] font-semibold tracking-tight xl:text-5xl">
                                Satu ruang untuk
                                <br />
                                <span className="text-[#d8e89a]">
                                    menggerakkan desa.
                                </span>
                            </h2>
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 xl:text-base">
                                Kelola data, pantau aktivitas, dan atur
                                konfigurasi sistem dengan lebih mudah dalam satu
                                platform.
                            </p>

                            <ul className="mt-10 space-y-4">
                                {highlights.map(
                                    ({ icon: Icon, title, description }) => (
                                        <li
                                            key={title}
                                            className="group flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                                        >
                                            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 transition-colors duration-300 group-hover:bg-[#d8e89a]/20">
                                                <Icon className="size-4 text-[#d8e89a]" />
                                            </span>
                                            <span>
                                                <span className="block text-sm font-medium">
                                                    {title}
                                                </span>
                                                <span className="block text-xs text-white/60">
                                                    {description}
                                                </span>
                                            </span>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>

                        <p className="relative z-10 text-xs text-white/45">
                            © {new Date().getFullYear()} {brand}. Seluruh hak
                            dilindungi.
                        </p>
                    </aside>

                    {/* Panel kanan: formulir masuk */}
                    <main className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
                        <div className="w-full max-w-[430px]">
                            {/* Identitas brand untuk layar kecil */}
                            <Link
                                href={home()}
                                className="mb-8 inline-flex items-center gap-3 lg:hidden"
                            >
                                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eff5da] ring-1 ring-[#4b552a]/10">
                                    {/* LOGO MOBILE */}
                                    <img
                                        src="/images/logo lba.webp"
                                        alt="Logo"
                                        className="size-7 object-contain"
                                    />
                                </span>
                                <span className="text-base font-semibold text-[#4b552a]">
                                    {brand}
                                </span>
                            </Link>

                            <div
                                onMouseMove={handlePointerMove}
                                style={
                                    {
                                        "--mouse-x": `${pointer.x}%`,
                                        "--mouse-y": `${pointer.y}%`,
                                    } as CSSProperties
                                }
                                className="group/card relative overflow-hidden rounded-[28px] border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-25px_rgba(75,85,42,0.45)] ring-1 ring-[#4b552a]/5 backdrop-blur-xl animate-in fade-in-0 slide-in-from-bottom-6 duration-700 sm:p-9"
                            >
                                {/* Sorotan mengikuti kursor */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), rgba(75,85,42,0.10), transparent 70%)",
                                    }}
                                />

                                <div className="relative">
                                    <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#2f3719]">
                                        Selamat datang
                                    </h1>
                                    <p className="mt-2 text-sm leading-relaxed text-[#4b552a]/65">
                                        Masuk ke panel admin {brand} untuk
                                        melanjutkan pengelolaan sistem.
                                    </p>

                                    {status && (
                                        <div
                                            role="status"
                                            className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700 animate-in fade-in-0 slide-in-from-top-2 duration-300"
                                        >
                                            <BadgeCheck className="mt-0.5 size-4 shrink-0" />
                                            {status}
                                        </div>
                                    )}

                                    <div className="mt-8 [&_a]:h-12 [&_a]:rounded-xl [&_a]:border-[#4b552a]/15 [&_a]:text-sm [&_a]:font-medium [&_a]:text-[#2f3719] [&_a]:transition-all [&_a]:duration-300 [&_a]:hover:-translate-y-0.5 [&_a]:hover:border-[#4b552a]/30 [&_a]:hover:bg-[#f7ffda] [&_a]:hover:shadow-md">
                                        <GoogleLoginButton />
                                    </div>

                                    <Form
                                        {...store.form()}
                                        resetOnSuccess={["password"]}
                                        className="mt-1 flex flex-col gap-5"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="grid gap-5">
                                                    <div className="grid gap-2">
                                                        <Label
                                                            htmlFor="email"
                                                            className="text-[#2f3719]"
                                                        >
                                                            Alamat Email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            required
                                                            autoFocus
                                                            tabIndex={1}
                                                            autoComplete="email"
                                                            placeholder="nama@email.com"
                                                            className="h-12 rounded-xl border-[#4b552a]/15 bg-[#f7ffda]/40 px-4 text-sm shadow-none transition-all duration-300 placeholder:text-[#4b552a]/40 hover:border-[#4b552a]/30 focus-visible:border-[#4b552a] focus-visible:ring-4 focus-visible:ring-[#4b552a]/10"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.email
                                                            }
                                                        />
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <div className="flex items-center">
                                                            <Label
                                                                htmlFor="password"
                                                                className="text-[#2f3719]"
                                                            >
                                                                Kata Sandi
                                                            </Label>
                                                            {canResetPassword && (
                                                                <TextLink
                                                                    href={request()}
                                                                    className="ml-auto text-xs font-semibold text-[#4b552a] hover:text-[#3a4220]"
                                                                    tabIndex={5}
                                                                >
                                                                    Lupa kata
                                                                    sandi?
                                                                </TextLink>
                                                            )}
                                                        </div>
                                                        <PasswordInput
                                                            id="password"
                                                            name="password"
                                                            required
                                                            tabIndex={2}
                                                            autoComplete="current-password"
                                                            placeholder="Masukkan kata sandi"
                                                            className="h-12 rounded-xl border-[#4b552a]/15 bg-[#f7ffda]/40 px-4 text-sm shadow-none transition-all duration-300 placeholder:text-[#4b552a]/40 hover:border-[#4b552a]/30 focus-visible:border-[#4b552a] focus-visible:ring-4 focus-visible:ring-[#4b552a]/10"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#4b552a]/10 bg-[#f7ffda]/35 px-4 py-3 transition-colors duration-300 hover:bg-[#eff5da]/70">
                                                        <div className="flex items-center gap-3">
                                                            <Checkbox
                                                                id="remember"
                                                                name="remember"
                                                                tabIndex={3}
                                                                className="size-4 rounded border-[#4b552a]/30 transition-all data-[state=checked]:border-[#4b552a] data-[state=checked]:bg-[#4b552a]"
                                                            />
                                                            <Label
                                                                htmlFor="remember"
                                                                className="cursor-pointer text-sm text-[#4b552a]!"
                                                            >
                                                                Ingat saya
                                                            </Label>
                                                        </div>
                                                        <span className="hidden text-[11px] text-[#4b552a]/50 sm:block">
                                                            Tetap masuk di
                                                            perangkat ini
                                                        </span>
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        className="group/button mt-1 h-12 w-full rounded-xl bg-[#4b552a] text-sm font-semibold text-white shadow-lg shadow-[#4b552a]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a4220] hover:shadow-xl hover:shadow-[#4b552a]/30 active:translate-y-0 active:scale-[0.99]"
                                                        tabIndex={4}
                                                        disabled={processing}
                                                        data-test="login-button"
                                                    >
                                                        {processing ? (
                                                            <Spinner />
                                                        ) : (
                                                            <>
                                                                Masuk ke panel
                                                                <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                <p className="flex items-start gap-2 rounded-xl bg-[#f7ffda]/60 p-3 text-center text-xs leading-relaxed text-[#4b552a]/65">
                                                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#4b552a]" />
                                                    <span className="text-left">
                                                        Halaman ini khusus
                                                        administrator. Akun baru
                                                        dibuat melalui menu
                                                        Kelola Admin.
                                                    </span>
                                                </p>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4b552a]/70">
                                <Link
                                    href={home()}
                                    className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-[#4b552a]"
                                >
                                    <ArrowLeft className="size-3.5 transition-transform duration-300 hover:-translate-x-1" />
                                    Kembali ke halaman utama
                                </Link>
                                <span>Loka Berdaya Amerta</span>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

import { Link, usePage } from '@inertiajs/react';
import {
    ExternalLink,
    Handshake,
    Image as ImageIcon,
    LayoutGrid,
    Leaf,
    Mail,
    MapPin,
    MessageSquareQuote,
    Newspaper,
    FileText,
    Settings,
    Sprout,
    Tags,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

// Urutan grup mengikuti halaman user: Beranda, Tentang Kami, Blog, Program,
// Hubungi Kami, dan seterusnya.
const homeNavItems: NavItem[] = [
    { title: 'Slide Hero', href: '/admin/hero-slides', icon: ImageIcon },
    {
        title: 'Testimoni',
        href: '/admin/testimonials',
        icon: MessageSquareQuote,
    },
    { title: 'Mitra', href: '/admin/partners', icon: Handshake },
];

const aboutNavItems: NavItem[] = [
    { title: 'Halaman Tentang', href: '/admin/about', icon: FileText },
    { title: 'Nilai Perjuangan', href: '/admin/core-values', icon: Leaf },
];

const blogNavItems: NavItem[] = [
    { title: 'Artikel Blog', href: '/admin/posts', icon: Newspaper },
    { title: 'Kategori Blog', href: '/admin/categories', icon: Tags },
];

const programNavItems: NavItem[] = [
    { title: 'Program Pemberdayaan', href: '/admin/programs', icon: Sprout },
    { title: 'Wilayah UMKM', href: '/admin/umkm', icon: MapPin },
];

const contactNavItems: NavItem[] = [
    { title: 'Pesan Masuk', href: '/admin/messages', icon: Mail },
];

const settingsNavItems: NavItem[] = [
    { title: 'Pengaturan Situs', href: '/admin/settings', icon: Settings },
    { title: 'Kelola Admin', href: '/admin/admins', icon: Users },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat Situs',
        href: '/',
        icon: ExternalLink,
    },
];

export function AppSidebar() {
    const { unreadMessages } = usePage().props;

    const mainNavItems: NavItem[] = [
        { title: 'Dashboard', href: '/admin', icon: LayoutGrid },
    ];

    const contactItems: NavItem[] = contactNavItems.map((item) => ({
        ...item,
        badge: unreadMessages,
    }));

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="[&_[data-sidebar=group-label]]:text-[11px] [&_[data-sidebar=group-label]]:font-semibold [&_[data-sidebar=group-label]]:tracking-wider [&_[data-sidebar=group-label]]:text-gray-400 [&_[data-sidebar=group-label]]:uppercase [&_[data-sidebar=menu-button]]:text-gray-700 [&_[data-sidebar=menu-button]:hover]:bg-[#eff5da] [&_[data-sidebar=menu-button]:hover]:text-[#4b552a] [&_[data-sidebar=menu-button][data-active=true]]:bg-[#eff5da] [&_[data-sidebar=menu-button][data-active=true]]:font-semibold [&_[data-sidebar=menu-button][data-active=true]]:text-[#4b552a] [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-gray-200/80 [&_[data-sidebar=sidebar]]:bg-white [&_[data-sidebar=sidebar]]:text-gray-700"
        >
            <SidebarHeader className="px-2 pt-3 pb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 py-1">
                <NavMain items={mainNavItems} label="Utama" />
                <NavMain items={homeNavItems} label="Beranda" />
                <NavMain items={aboutNavItems} label="Tentang Kami" />
                <NavMain items={blogNavItems} label="Blog" />
                <NavMain items={programNavItems} label="Program" />
                <NavMain items={contactItems} label="Hubungi Kami" />
                <NavMain items={settingsNavItems} label="Pengaturan" />
            </SidebarContent>

            <SidebarFooter className="px-2 pb-3">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

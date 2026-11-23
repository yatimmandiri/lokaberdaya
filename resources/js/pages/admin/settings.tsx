import {
    SettingsForm,
    type SettingsGroup,
} from '@/components/admin/settings-form';

type Settings = Record<string, string | null>;

type Props = {
    settings: Settings;
    textKeys: string[];
    imageKeys: string[];
};

const labels: Record<string, string> = {
    site_name: 'Nama Situs',
    site_tagline: 'Tagline',
    phone: 'Nomor Telepon / WhatsApp',
    email: 'Email',
    address: 'Alamat Kantor',
    maps_embed_url: 'URL Embed Google Maps',
    hero_title: 'Judul Hero (baris 1)',
    hero_title_accent: 'Judul Hero (baris 2)',
    hero_subtitle: 'Subjudul Hero',
    footer_description: 'Deskripsi Footer',
};

const groups: SettingsGroup[] = [
    {
        title: 'Identitas Situs',
        keys: ['site_name', 'site_tagline'],
        imageKeys: ['logo'],
    },
    {
        title: 'Kontak',
        keys: ['phone', 'email', 'address', 'maps_embed_url'],
    },
    {
        title: 'Landing Page - Hero',
        keys: ['hero_title', 'hero_title_accent', 'hero_subtitle'],
    },
    {
        title: 'Footer',
        keys: ['footer_description'],
    },
];

const imageLabels: Record<string, string> = {
    logo: 'Logo Situs',
};

const longFields = new Set(['address', 'maps_embed_url', 'footer_description']);

export default function AdminSettings({
    settings,
    textKeys,
    imageKeys,
}: Props) {
    return (
        <SettingsForm
            title="Pengaturan Situs"
            description="Identitas, kontak, hero landing page, dan footer situs."
            settings={settings}
            textKeys={textKeys}
            imageKeys={imageKeys}
            groups={groups}
            labels={labels}
            imageLabels={imageLabels}
            longFields={longFields}
            saveUrl="/admin/settings"
        />
    );
}

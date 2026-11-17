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
    about_years: 'Tentang - Angka Tahun',
    about_years_label: 'Tentang - Label Tahun',
    about_eyebrow: 'Tentang - Eyebrow',
    about_title: 'Tentang - Judul',
    about_text: 'Tentang - Deskripsi',
    vision: 'Visi',
    mission: 'Misi (satu baris per poin)',
    about_page_badge: 'Halaman Tentang - Badge',
    about_page_title: 'Halaman Tentang - Judul',
    about_page_intro: 'Halaman Tentang - Intro',
    about_story_quote: 'Halaman Tentang - Kutipan Cerita',
    about_story:
        'Halaman Tentang - Cerita (pisahkan paragraf dengan baris kosong)',
};

const groups: SettingsGroup[] = [
    {
        title: 'Landing - Tentang, Visi & Misi',
        keys: [
            'about_years',
            'about_years_label',
            'about_eyebrow',
            'about_title',
            'about_text',
            'vision',
            'mission',
        ],
        imageKeys: ['about_image'],
    },
    {
        title: 'Halaman Tentang Kami',
        keys: [
            'about_page_badge',
            'about_page_title',
            'about_page_intro',
            'about_story_quote',
            'about_story',
        ],
        imageKeys: ['about_page_image', 'about_values_image'],
    },
];

const imageLabels: Record<string, string> = {
    about_image: 'Gambar Tentang (Landing)',
    about_page_image: 'Gambar Hero Halaman Tentang',
    about_values_image: 'Gambar Nilai-Nilai',
};

const longFields = new Set([
    'about_text',
    'vision',
    'mission',
    'about_page_intro',
    'about_story_quote',
    'about_story',
]);

export default function AdminAboutPage({
    settings,
    textKeys,
    imageKeys,
}: Props) {
    return (
        <SettingsForm
            title="Halaman Tentang"
            description="Konten bagian tentang pada landing page dan halaman Tentang Kami."
            settings={settings}
            textKeys={textKeys}
            imageKeys={imageKeys}
            groups={groups}
            labels={labels}
            imageLabels={imageLabels}
            longFields={longFields}
            saveUrl="/admin/about"
            saveLabel="Simpan Halaman Tentang"
        />
    );
}

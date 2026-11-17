import { type FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type SettingsGroup = {
    title: string;
    keys: string[];
    imageKeys?: string[];
};

type NormalizedGroup = {
    title: string;
    keys: string[];
    imageKeys: string[];
};

type Props = {
    title: string;
    description?: string;
    settings: Record<string, string | null>;
    textKeys: string[];
    imageKeys: string[];
    groups: SettingsGroup[];
    labels: Record<string, string>;
    imageLabels: Record<string, string>;
    longFields?: Set<string>;
    saveUrl: string;
    saveLabel?: string;
};

export function SettingsForm({
    title,
    description,
    settings,
    textKeys,
    imageKeys,
    groups,
    labels,
    imageLabels,
    longFields = new Set<string>(),
    saveUrl,
    saveLabel = 'Simpan Pengaturan',
}: Props) {
    const initial: Record<string, any> = {};

    textKeys.forEach((key) => {
        initial[key] = settings[key] ?? '';
    });
    imageKeys.forEach((key) => {
        initial[key] = null;
    });

    const form = useForm(initial);

    const usedTextKeys = new Set(groups.flatMap((group) => group.keys));
    const leftoverKeys = textKeys.filter((key) => !usedTextKeys.has(key));

    const tabs: NormalizedGroup[] = [
        ...groups.map((group) => ({
            title: group.title,
            keys: group.keys,
            imageKeys: group.imageKeys ?? [],
        })),
        ...(leftoverKeys.length > 0
            ? [
                  {
                      title: 'Pengaturan Lainnya',
                      keys: leftoverKeys,
                      imageKeys: [],
                  },
              ]
            : []),
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].title);
    const activeGroup = tabs.find((tab) => tab.title === activeTab) ?? tabs[0];

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(saveUrl, {
            forceFormData: true,
            preserveScroll: true,
            onError: (errors) => {
                const firstErrorKey = Object.keys(errors)[0];
                const target = tabs.find((tab) =>
                    [...tab.keys, ...tab.imageKeys].includes(firstErrorKey),
                );

                if (target) {
                    setActiveTab(target.title);
                }
            },
        });
    };

    const renderTextField = (key: string) => (
        <div
            key={key}
            className={longFields.has(key) ? 'md:col-span-2' : undefined}
        >
            <Label htmlFor={key} className="mb-1.5 block">
                {labels[key] ?? key}
            </Label>
            {longFields.has(key) ? (
                <textarea
                    id={key}
                    value={form.data[key] ?? ''}
                    onChange={(event) => form.setData(key, event.target.value)}
                    rows={key === 'maps_embed_url' ? 3 : 4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none"
                />
            ) : (
                <Input
                    id={key}
                    value={form.data[key] ?? ''}
                    onChange={(event) => form.setData(key, event.target.value)}
                    className="bg-white"
                />
            )}
            {form.errors[key] && (
                <p className="mt-1 text-sm text-red-500">{form.errors[key]}</p>
            )}
        </div>
    );

    const renderImageField = (key: string) => (
        <div key={key}>
            <Label htmlFor={key} className="mb-1.5 block">
                {imageLabels[key] ?? key}
            </Label>
            {settings[key] && (
                <img
                    src={settings[key] as string}
                    alt={imageLabels[key] ?? key}
                    className="mb-2 h-20 w-auto rounded border border-gray-200 object-contain p-1"
                />
            )}
            <Input
                id={key}
                type="file"
                accept="image/*"
                onChange={(event) =>
                    form.setData(key, event.target.files?.[0] ?? null)
                }
                className="bg-white"
            />
            <p className="mt-1 text-xs text-gray-500">
                Kosongkan jika tidak ingin mengubah gambar.
            </p>
            {form.errors[key] && (
                <p className="mt-1 text-sm text-red-500">{form.errors[key]}</p>
            )}
        </div>
    );

    return (
        <>
            <Head title={title} />

            <form onSubmit={submit} className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-1 text-sm text-gray-500">
                                {description}
                            </p>
                        )}
                    </div>
                    <Button type="submit" disabled={form.processing}>
                        {saveLabel}
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-2 pt-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.title}
                                type="button"
                                onClick={() => setActiveTab(tab.title)}
                                className={`shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                                    activeTab === tab.title
                                        ? 'border-[#4b552a] text-[#4b552a]'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <div className="p-5">
                        <h2 className="mb-4 text-base font-semibold text-gray-900">
                            {activeGroup.title}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {activeGroup.keys.map(renderTextField)}
                            {activeGroup.imageKeys.map(renderImageField)}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing}>
                        {saveLabel}
                    </Button>
                </div>
            </form>
        </>
    );
}

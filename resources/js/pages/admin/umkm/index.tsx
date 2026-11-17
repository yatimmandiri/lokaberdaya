import { Head, Link, router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { MapPin, Pencil, Plus, Trash2, Users, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import type { UmkmRegion } from '@/types/content';

type Props = {
    regions: UmkmRegion[];
};

type SortFilter =
    | 'default'
    | 'az'
    | 'za'
    | 'most_beneficiaries'
    | 'most_images';

export default function AdminUmkm({ regions }: Props) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortFilter>('default');

    const remove = (region: UmkmRegion) => {
        if (
            !window.confirm(
                `Hapus wilayah "${region.city}" beserta gambar dan penerima manfaatnya? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/umkm/${region.id}`, { preserveScroll: true });
    };

    const filteredAndSorted = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = regions.filter((region) => {
            if (!query) return true;
            const haystack = [region.city, region.description ?? '']
                .join(' ')
                .toLowerCase();
            return haystack.includes(query);
        });

        if (sortBy === 'az') {
            result.sort((a, b) => a.city.localeCompare(b.city));
        } else if (sortBy === 'za') {
            result.sort((a, b) => b.city.localeCompare(a.city));
        } else if (sortBy === 'most_beneficiaries') {
            result.sort(
                (a, b) =>
                    (b.beneficiaries_count ?? 0) - (a.beneficiaries_count ?? 0),
            );
        } else if (sortBy === 'most_images') {
            result.sort(
                (a, b) => (b.images_count ?? 0) - (a.images_count ?? 0),
            );
        } else {
            result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }

        return result;
    }, [regions, search, sortBy]);

    const hasActiveFilter = search.trim() !== '' || sortBy !== 'default';

    const columns: ColumnDef<UmkmRegion>[] = [
        {
            id: 'city',
            accessorFn: (region) => region.city,
            header: 'Wilayah',
            meta: { className: 'max-w-[420px]' },
            cell: ({ row }) => (
                <div>
                    <p className="flex items-center gap-2 font-semibold text-gray-900">
                        <MapPin className="h-4 w-4 shrink-0 text-[#4b552a]" />
                        {row.original.city}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {row.original.description ??
                            'Belum ada deskripsi wilayah.'}
                    </p>
                </div>
            ),
        },
        {
            id: 'beneficiaries_count',
            accessorFn: (region) => region.beneficiaries_count ?? 0,
            header: 'Penerima Manfaat',
            cell: ({ row }) => (
                <span className="inline-flex items-center gap-1 whitespace-nowrap text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    {row.original.beneficiaries_count ?? 0} penerima
                </span>
            ),
        },
        {
            id: 'images_count',
            accessorFn: (region) => region.images_count ?? 0,
            header: 'Gambar',
            cell: ({ row }) => (
                <span className="whitespace-nowrap text-gray-600">
                    {row.original.images_count ?? 0} gambar
                </span>
            ),
        },
        {
            id: 'sort_order',
            accessorFn: (region) => region.sort_order,
            header: 'Urutan',
            cell: ({ row }) => (
                <span className="text-gray-500">{row.original.sort_order}</span>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    <Link
                        href={`/admin/umkm/${row.original.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <Pencil className="h-4 w-4" /> Edit
                    </Link>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(row.original)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Wilayah UMKM" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Wilayah UMKM
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola wilayah sebaran penerima manfaat UMKM beserta
                            galeri dan daftar pelakunya.
                        </p>
                    </div>
                    <Link
                        href="/admin/umkm/create"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4b552a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                    >
                        <Plus className="h-4 w-4" /> Tambah Wilayah
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    data={filteredAndSorted}
                    totalCount={regions.length}
                    minWidthClass="min-w-[760px]"
                    emptyMessage={
                        regions.length === 0
                            ? 'Belum ada wilayah UMKM.'
                            : 'Tidak ada wilayah yang cocok dengan filter/pencarian.'
                    }
                    search={{
                        value: search,
                        onChange: setSearch,
                        placeholder: 'Cari nama kota atau deskripsi wilayah...',
                    }}
                    toolbar={
                        <>
                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value as SortFilter)
                                }
                                className="h-9 rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-700 transition outline-none hover:bg-gray-50 focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                            >
                                <option value="default">Urutan Default</option>
                                <option value="az">Nama Kota (A-Z)</option>
                                <option value="za">Nama Kota (Z-A)</option>
                                <option value="most_beneficiaries">
                                    Penerima Terbanyak
                                </option>
                                <option value="most_images">
                                    Gambar Terbanyak
                                </option>
                            </select>

                            {hasActiveFilter && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setSortBy('default');
                                    }}
                                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    <X className="h-4 w-4" /> Reset
                                </button>
                            )}
                        </>
                    }
                />
            </div>
        </>
    );
}

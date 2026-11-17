import { Head, Link, router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import type { Post } from '@/types/content';

type Props = {
    posts: Post[];
};

type StatusFilter = 'all' | 'published' | 'draft';

function formatDate(value: string | null): string {
    if (!value) return 'Belum terjadwal';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function AdminPosts({ posts }: Props) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [categoryId, setCategoryId] = useState<string>('all');

    const remove = (post: Post) => {
        if (
            !window.confirm(
                `Hapus artikel "${post.title}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/posts/${post.id}`, { preserveScroll: true });
    };

    const categories = useMemo(() => {
        const map = new Map<string, string>();
        posts.forEach((post) => {
            if (post.category?.id && post.category?.name) {
                map.set(String(post.category.id), post.category.name);
            }
        });
        return Array.from(map, ([id, name]) => ({ id, name }));
    }, [posts]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        return posts.filter((post) => {
            if (status === 'published' && !post.is_published) return false;
            if (status === 'draft' && post.is_published) return false;

            if (
                categoryId !== 'all' &&
                String(post.category?.id ?? '') !== categoryId
            ) {
                return false;
            }

            if (!query) return true;

            const haystack = [
                post.title,
                post.author ?? '',
                post.category?.name ?? '',
            ]
                .join(' ')
                .toLowerCase();

            return haystack.includes(query);
        });
    }, [posts, search, status, categoryId]);

    const hasActiveFilter =
        search.trim() !== '' || status !== 'all' || categoryId !== 'all';

    const resetFilters = () => {
        setSearch('');
        setStatus('all');
        setCategoryId('all');
    };

    const columns: ColumnDef<Post>[] = [
        {
            id: 'title',
            accessorFn: (post) => post.title,
            header: 'Artikel',
            cell: ({ row }) => {
                const post = row.original;

                return (
                    <div className="flex items-center gap-3">
                        {post.image_url && (
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="h-12 w-20 shrink-0 rounded-lg object-cover"
                            />
                        )}
                        <p className="line-clamp-2 font-semibold text-gray-900">
                            {post.title}
                        </p>
                    </div>
                );
            },
        },
        {
            id: 'category',
            accessorFn: (post) => post.category?.name ?? '',
            header: 'Kategori',
            cell: ({ row }) => (
                <span className="text-gray-600">
                    {row.original.category?.name ?? 'Tanpa kategori'}
                </span>
            ),
        },
        {
            id: 'author',
            accessorFn: (post) => post.author ?? '',
            header: 'Penulis',
            cell: ({ row }) => (
                <span className="text-gray-600">
                    {row.original.author ?? 'Tanpa penulis'}
                </span>
            ),
        },
        {
            id: 'published_at',
            accessorFn: (post) => post.published_at ?? '',
            header: 'Tanggal Terbit',
            cell: ({ row }) => (
                <span className="whitespace-nowrap text-gray-500">
                    {formatDate(row.original.published_at)}
                </span>
            ),
        },
        {
            id: 'is_published',
            accessorFn: (post) => post.is_published,
            header: 'Status',
            cell: ({ row }) =>
                row.original.is_published ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Terbit
                    </span>
                ) : (
                    <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                        Draft
                    </span>
                ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    <Link
                        href={`/admin/posts/${row.original.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
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
            <Head title="Artikel Blog" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Artikel Blog
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola publikasi berita dan artikel di halaman blog.
                        </p>
                    </div>
                    <Link
                        href="/admin/posts/create"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#4b552a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a4220]"
                    >
                        <Plus className="h-4 w-4" /> Tambah Artikel
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    data={filtered}
                    totalCount={posts.length}
                    minWidthClass="min-w-[860px]"
                    emptyMessage={
                        posts.length === 0
                            ? 'Belum ada artikel. Klik "Tambah Artikel".'
                            : 'Tidak ada artikel yang cocok dengan filter/pencarian.'
                    }
                    search={{
                        value: search,
                        onChange: setSearch,
                        placeholder: 'Cari judul, penulis, atau kategori...',
                    }}
                    toolbar={
                        <>
                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(
                                        event.target.value as StatusFilter,
                                    )
                                }
                                className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 transition outline-none focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                            >
                                <option value="all">Semua Status</option>
                                <option value="published">Terbit</option>
                                <option value="draft">Draft</option>
                            </select>

                            <select
                                value={categoryId}
                                onChange={(event) =>
                                    setCategoryId(event.target.value)
                                }
                                className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 transition outline-none focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                            >
                                <option value="all">Semua Kategori</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {hasActiveFilter && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
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

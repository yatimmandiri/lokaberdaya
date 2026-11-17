import { Head, router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import {
    Check,
    ChevronDown,
    ChevronUp,
    Clock,
    Mail,
    MailOpen,
    Phone,
    Trash2,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import type { ContactMessage } from '@/types/content';

type Props = {
    messages: ContactMessage[];
};

type ReadFilter = 'all' | 'unread' | 'read';

function formatDateTime(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function initials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

export default function AdminMessages({ messages }: Props) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<ReadFilter>('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const counts = useMemo(
        () => ({
            all: messages.length,
            unread: messages.filter((message) => !message.is_read).length,
            read: messages.filter((message) => message.is_read).length,
        }),
        [messages],
    );

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        return messages.filter((message) => {
            if (filter === 'unread' && message.is_read) {
                return false;
            }

            if (filter === 'read' && !message.is_read) {
                return false;
            }

            if (!query) {
                return true;
            }

            return [
                message.name,
                message.email,
                message.phone ?? '',
                message.subject ?? '',
                message.message,
            ]
                .join(' ')
                .toLowerCase()
                .includes(query);
        });
    }, [messages, filter, search]);

    const toggleRead = (message: ContactMessage) => {
        router.patch(
            `/admin/messages/${message.id}/toggle-read`,
            {},
            { preserveScroll: true, preserveState: true },
        );
    };

    const remove = (message: ContactMessage) => {
        if (
            !window.confirm(
                `Hapus pesan dari "${message.name}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/messages/${message.id}`, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const filterTabs: { key: ReadFilter; label: string; count: number }[] = [
        { key: 'all', label: 'Semua', count: counts.all },
        { key: 'unread', label: 'Belum Dibaca', count: counts.unread },
        { key: 'read', label: 'Sudah Dibaca', count: counts.read },
    ];

    const hasActiveFilter = search.trim() !== '' || filter !== 'all';

    const columns: ColumnDef<ContactMessage>[] = [
        {
            id: 'name',
            accessorFn: (message) => message.name,
            header: 'Pengirim',
            cell: ({ row }) => {
                const message = row.original;

                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                message.is_read
                                    ? 'bg-gray-100 text-gray-500'
                                    : 'bg-[#4b552a] text-white'
                            }`}
                        >
                            {initials(message.name) || (
                                <Mail className="h-4 w-4" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-900">
                                {message.name}
                            </p>
                            <a
                                href={`mailto:${message.email}`}
                                className="block max-w-[220px] truncate text-xs text-gray-500 hover:text-[#4b552a] hover:underline"
                            >
                                {message.email}
                            </a>
                            {message.phone && (
                                <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                                    <Phone className="h-3 w-3" />
                                    {message.phone}
                                </span>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'message',
            accessorFn: (message) => message.message,
            header: 'Pesan',
            meta: { className: 'max-w-[420px]' },
            cell: ({ row }) => {
                const message = row.original;
                const expanded = expandedId === message.id;

                return (
                    <div>
                        <p className="font-medium text-gray-900">
                            {message.subject || 'Tanpa subjek'}
                        </p>
                        <p
                            className={`mt-1 text-sm whitespace-pre-line text-gray-600 ${
                                expanded ? '' : 'line-clamp-2'
                            }`}
                        >
                            {message.message}
                        </p>
                        {message.message.length > 180 && (
                            <button
                                type="button"
                                onClick={() =>
                                    setExpandedId(expanded ? null : message.id)
                                }
                                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#4b552a] hover:underline"
                            >
                                {expanded ? (
                                    <>
                                        <ChevronUp className="h-3.5 w-3.5" />
                                        Ringkas
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-3.5 w-3.5" />
                                        Selengkapnya
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                );
            },
        },
        {
            id: 'is_read',
            accessorFn: (message) => message.is_read,
            header: 'Status',
            cell: ({ row }) =>
                row.original.is_read ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        <MailOpen className="h-3 w-3" /> Dibaca
                    </span>
                ) : (
                    <span className="inline-flex rounded-full bg-[#4b552a] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                        Baru
                    </span>
                ),
        },
        {
            id: 'created_at',
            accessorFn: (message) => message.created_at,
            header: 'Waktu',
            cell: ({ row }) => (
                <span className="inline-flex items-center gap-1 text-xs whitespace-nowrap text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatDateTime(row.original.created_at)}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Aksi',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleRead(row.original)}
                    >
                        {row.original.is_read ? (
                            <>
                                <Mail className="mr-1 h-4 w-4" />
                                Tandai belum dibaca
                            </>
                        ) : (
                            <>
                                <Check className="mr-1 h-4 w-4" />
                                Tandai dibaca
                            </>
                        )}
                    </Button>
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
            <Head title="Pesan Masuk" />

            <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Pesan Masuk
                            </h1>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff5da] px-2.5 py-1 text-xs font-medium text-[#4b552a]">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                                Diperbarui otomatis
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Pesan yang dikirim pengunjung melalui halaman
                            Kontak. Daftar akan diperbarui otomatis tanpa perlu
                            refresh.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-center shadow-sm">
                            <p className="text-xl font-bold text-gray-900">
                                {counts.unread}
                            </p>
                            <p className="text-[11px] font-medium text-gray-500">
                                Belum dibaca
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-center shadow-sm">
                            <p className="text-xl font-bold text-gray-900">
                                {counts.all}
                            </p>
                            <p className="text-[11px] font-medium text-gray-500">
                                Total pesan
                            </p>
                        </div>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={filtered}
                    totalCount={counts.all}
                    minWidthClass="min-w-[900px]"
                    emptyMessage={
                        counts.all === 0
                            ? 'Belum ada pesan masuk.'
                            : 'Tidak ada pesan yang cocok dengan filter/pencarian.'
                    }
                    search={{
                        value: search,
                        onChange: setSearch,
                        placeholder:
                            'Cari nama, email, subjek, atau isi pesan...',
                    }}
                    toolbar={
                        <>
                            {filterTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setFilter(tab.key)}
                                    className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition ${
                                        filter === tab.key
                                            ? 'border-[#4b552a] bg-[#4b552a] text-white'
                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                    <span
                                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                            filter === tab.key
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                            {hasActiveFilter && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        setFilter('all');
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

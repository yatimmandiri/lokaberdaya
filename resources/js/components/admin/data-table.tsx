import { type ReactNode, useEffect, useState } from 'react';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    ChevronUp,
    Search,
    X,
} from 'lucide-react';

type Props<T> = {
    columns: ColumnDef<T>[];
    data: T[];
    getRowId?: (row: T) => string;
    search?: {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    };
    toolbar?: ReactNode;
    totalCount?: number;
    emptyMessage?: string;
    minWidthClass?: string;
    pageSizeOptions?: number[];
    initialPageSize?: number;
    renderExpandedRow?: (row: T, collapse: () => void) => ReactNode;
};

function buildPageList(current: number, total: number): (number | '…')[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index);
    }

    const pages: (number | '…')[] = [0];

    if (current > 2) {
        pages.push('…');
    }

    for (
        let page = Math.max(1, current - 1);
        page <= Math.min(total - 2, current + 1);
        page += 1
    ) {
        pages.push(page);
    }

    if (current < total - 3) {
        pages.push('…');
    }

    pages.push(total - 1);

    return pages;
}

export function DataTable<T>({
    columns,
    data,
    getRowId,
    search,
    toolbar,
    totalCount,
    emptyMessage = 'Belum ada data.',
    minWidthClass = 'min-w-[640px]',
    pageSizeOptions = [5, 10, 25, 50],
    initialPageSize = 10,
    renderExpandedRow,
}: Props<T>) {
    const [pageSizeValue, setPageSizeValue] = useState(String(initialPageSize));

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: { pageIndex: 0, pageSize: initialPageSize },
        },
        getRowId: getRowId
            ? (row) => getRowId(row)
            : (row, index) => {
                  const id = (row as { id?: unknown })?.id;

                  return typeof id === 'string' || typeof id === 'number'
                      ? String(id)
                      : String(index);
              },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        autoResetPageIndex: true,
    });

    useEffect(() => {
        if (pageSizeValue === 'all') {
            table.setPageSize(Math.max(data.length, 1));
        }
    }, [data.length, pageSizeValue]);

    const changePageSize = (value: string) => {
        setPageSizeValue(value);
        table.setPageSize(
            value === 'all' ? Math.max(data.length, 1) : Number(value),
        );
    };

    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;
    const rows = table.getRowModel().rows;
    const firstRow = rows.length ? pageIndex * currentPageSize + 1 : 0;
    const lastRow = rows.length ? firstRow + rows.length - 1 : 0;

    return (
        <div className="space-y-3">
            {/* Toolbar + pengaturan jumlah baris berada di ATAS tabel */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        {search && (
                            <div className="relative w-full sm:w-64">
                                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={search.value}
                                    onChange={(event) =>
                                        search.onChange(event.target.value)
                                    }
                                    placeholder={
                                        search.placeholder ?? 'Cari data...'
                                    }
                                    className="h-10 w-full rounded-lg border border-gray-300 bg-white pr-9 pl-9 text-sm text-gray-900 transition outline-none focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                                />
                                {search.value && (
                                    <button
                                        type="button"
                                        onClick={() => search.onChange('')}
                                        className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                                        aria-label="Hapus pencarian"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        )}
                        {toolbar}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <label
                            htmlFor="page-size"
                            className="text-sm font-medium text-gray-600"
                        >
                            Tampilkan
                        </label>
                        <select
                            id="page-size"
                            value={pageSizeValue}
                            onChange={(event) =>
                                changePageSize(event.target.value)
                            }
                            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 transition outline-none focus:border-[#4b552a] focus:ring-1 focus:ring-[#4b552a]"
                        >
                            {pageSizeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                            <option value="all">Semua</option>
                        </select>
                        <span className="text-sm text-gray-500">
                            data per halaman
                        </span>
                    </div>
                </div>

                {totalCount !== undefined && (
                    <p className="mt-3 text-xs text-gray-500">
                        Menampilkan {data.length} dari {totalCount} data
                    </p>
                )}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table
                        className={`w-full ${minWidthClass} text-left text-sm`}
                    >
                        <thead className="bg-gray-50/80 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={`px-4 py-3 ${
                                                (
                                                    header.column.columnDef
                                                        .meta as
                                                        | {
                                                              className?: string;
                                                          }
                                                        | undefined
                                                )?.className ?? ''
                                            }`}
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <button
                                                    type="button"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="inline-flex items-center gap-1 transition hover:text-[#4b552a]"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronUp className="h-3.5 w-3.5" />
                                                        ),
                                                        desc: (
                                                            <ChevronDown className="h-3.5 w-3.5" />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? (
                                                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                                                    )}
                                                </button>
                                            ) : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={
                                            table.getAllLeafColumns().length
                                        }
                                        className="px-4 py-12 text-center text-sm text-gray-500"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row) => (
                                    <FragmentRow
                                        key={row.id}
                                        row={row}
                                        renderExpandedRow={renderExpandedRow}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
                    <span>
                        Menampilkan {firstRow}–{lastRow} dari{' '}
                        {table.getFilteredRowModel().rows.length} data
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            className="inline-flex h-8 items-center gap-1 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft className="h-4 w-4" /> Sebelumnya
                        </button>

                        {buildPageList(pageIndex, pageCount).map(
                            (page, index) =>
                                page === '…' ? (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="px-1.5 text-gray-400"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => table.setPageIndex(page)}
                                        className={`h-8 min-w-8 rounded-lg px-2 text-sm font-medium transition ${
                                            page === pageIndex
                                                ? 'bg-[#4b552a] text-white'
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page + 1}
                                    </button>
                                ),
                        )}

                        <button
                            type="button"
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            className="inline-flex h-8 items-center gap-1 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Berikutnya <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FragmentRow<T>({
    row,
    renderExpandedRow,
}: {
    row: import('@tanstack/react-table').Row<T>;
    renderExpandedRow?: (row: T, collapse: () => void) => ReactNode;
}) {
    return (
        <>
            <tr
                className={
                    row.getIsExpanded()
                        ? 'bg-[#fafcf5]'
                        : 'transition-colors hover:bg-[#fafcf5]'
                }
            >
                {row.getVisibleCells().map((cell) => (
                    <td
                        key={cell.id}
                        className={`px-4 py-3 align-top ${
                            (
                                cell.column.columnDef.meta as
                                    | { className?: string }
                                    | undefined
                            )?.className ?? ''
                        }`}
                    >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                        )}
                    </td>
                ))}
            </tr>
            {row.getIsExpanded() && renderExpandedRow && (
                <tr>
                    <td
                        colSpan={row.getVisibleCells().length}
                        className="border-t border-gray-100 bg-gray-50/60"
                    >
                        {renderExpandedRow(row.original, () =>
                            row.toggleExpanded(),
                        )}
                    </td>
                </tr>
            )}
        </>
    );
}

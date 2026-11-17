import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { type ColumnDef, type Row } from '@tanstack/react-table';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type CrudField = {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'number' | 'checkbox' | 'file' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    help?: string;
    full?: boolean;
};

export type CrudTableColumn<T> = {
    key: string;
    label: string;
    render?: (item: T) => ReactNode;
    className?: string;
};

type Item = Record<string, any>;

type Props<T extends Item> = {
    title: string;
    description?: string;
    storeUrl: string;
    items: T[];
    fields: CrudField[];
    createFields?: CrudField[];
    updateUrl: (item: T) => string;
    deleteUrl: (item: T) => string;
    renderItem: (item: T) => ReactNode;
    itemTitle: (item: T) => string;
    createButtonLabel?: string;
    emptyMessage?: string;
    layout?: 'table' | 'list';
    tableColumns?: CrudTableColumn<T>[];
};

function initialData(fields: CrudField[], item?: Item): Item {
    return fields.reduce<Item>((data, field) => {
        if (field.type === 'checkbox') {
            data[field.name] = item
                ? Boolean(item[field.name])
                : field.name === 'is_active';
        } else if (field.type === 'file') {
            data[field.name] = null;
        } else {
            data[field.name] = item?.[field.name] ?? '';
        }

        return data;
    }, {});
}

function FieldInput({
    field,
    value,
    error,
    onChange,
}: {
    field: CrudField;
    value: any;
    error?: string;
    onChange: (value: any) => void;
}) {
    if (field.type === 'checkbox') {
        return (
            <div className="flex items-center gap-2 pt-6">
                <input
                    id={field.name}
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) => onChange(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#4b552a] focus:ring-[#4b552a]"
                />
                <Label htmlFor={field.name} className="cursor-pointer">
                    {field.label}
                </Label>
            </div>
        );
    }

    return (
        <div className={field.full ? 'md:col-span-2' : undefined}>
            <Label htmlFor={field.name} className="mb-1.5 block">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
            </Label>

            {field.type === 'textarea' ? (
                <textarea
                    id={field.name}
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none"
                />
            ) : field.type === 'select' ? (
                <select
                    id={field.name}
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4b552a] focus:ring-2 focus:ring-[#4b552a]/30 focus:outline-none"
                >
                    <option value="">Pilih...</option>
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : field.type === 'file' ? (
                <Input
                    id={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        onChange(event.target.files?.[0] ?? null)
                    }
                    className="bg-white"
                />
            ) : (
                <Input
                    id={field.name}
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={field.placeholder}
                    className="bg-white"
                />
            )}

            {field.help && (
                <p className="mt-1 text-xs text-gray-500">{field.help}</p>
            )}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

function EditForm({
    fields,
    data,
    errors,
    setData,
    onSubmit,
    onCancel,
    submitLabel = 'Simpan Perubahan',
}: {
    fields: CrudField[];
    data: Item;
    errors: Record<string, any>;
    setData: (key: string, value: any) => void;
    onSubmit: (event: FormEvent) => void;
    onCancel?: () => void;
    submitLabel?: string;
}) {
    return (
        <form onSubmit={onSubmit} className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {fields.map((field) => (
                    <FieldInput
                        key={field.name}
                        field={field}
                        value={data[field.name]}
                        error={errors[field.name] as string | undefined}
                        onChange={(value) => setData(field.name, value)}
                    />
                ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        <X className="mr-1 h-4 w-4" /> Batal
                    </Button>
                )}
                <Button type="submit">{submitLabel}</Button>
            </div>
        </form>
    );
}

export function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
            }`}
        >
            {active ? 'Aktif' : 'Nonaktif'}
        </span>
    );
}

function cellContent<T extends Item>(
    item: T,
    column: CrudTableColumn<T>,
): ReactNode {
    if (column.render) {
        return column.render(item);
    }

    const value = item[column.key];

    if (typeof value === 'boolean') {
        return <StatusBadge active={value} />;
    }

    if (value === null || value === undefined || value === '') {
        return <span className="text-gray-400">-</span>;
    }

    return <span className="line-clamp-2 text-gray-700">{String(value)}</span>;
}

function CrudListRow<T extends Item>({
    item,
    fields,
    updateUrl,
    deleteUrl,
    itemTitle,
    renderItem,
}: {
    item: T;
    fields: CrudField[];
    updateUrl: string;
    deleteUrl: string;
    itemTitle: string;
    renderItem: (item: T) => ReactNode;
}) {
    const [editing, setEditing] = useState(false);
    const form = useForm<Item>(initialData(fields, item));

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(updateUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    };

    const remove = () => {
        if (
            !window.confirm(
                `Hapus "${itemTitle}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(deleteUrl, { preserveScroll: true });
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                    {editing ? (
                        <p className="text-sm font-semibold text-[#4b552a]">
                            Mengubah: {itemTitle}
                        </p>
                    ) : (
                        renderItem(item)
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    {editing ? (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(false)}
                        >
                            <X className="mr-1 h-4 w-4" /> Batal
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(true)}
                        >
                            <Pencil className="mr-1 h-4 w-4" /> Edit
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={remove}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {editing && (
                <div className="border-t border-gray-100 bg-gray-50/60">
                    <EditForm
                        fields={fields}
                        data={form.data}
                        errors={form.errors}
                        setData={form.setData}
                        onSubmit={submit}
                    />
                </div>
            )}
        </div>
    );
}

function CrudEditPanel<T extends Item>({
    itemTitle,
    item,
    fields,
    updateUrl,
    onDone,
}: {
    itemTitle: string;
    item: T;
    fields: CrudField[];
    updateUrl: string;
    onDone: () => void;
}) {
    const form = useForm<Item>(initialData(fields, item));

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(updateUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: onDone,
        });
    };

    return (
        <div>
            <p className="px-4 pt-4 text-sm font-semibold text-[#4b552a]">
                Mengubah: {itemTitle}
            </p>
            <EditForm
                fields={fields}
                data={form.data}
                errors={form.errors}
                setData={form.setData}
                onSubmit={submit}
                onCancel={onDone}
            />
        </div>
    );
}

export function CrudManager<T extends Item>({
    title,
    description,
    storeUrl,
    items,
    fields,
    createFields,
    updateUrl,
    deleteUrl,
    renderItem,
    itemTitle,
    createButtonLabel = 'Tambah',
    emptyMessage = 'Belum ada data.',
    layout = 'table',
    tableColumns,
}: Props<T>) {
    const [showCreate, setShowCreate] = useState(false);
    const [search, setSearch] = useState('');
    const createForm = useForm<Item>(initialData(createFields ?? fields));

    const filteredItems = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return items;
        }

        return items.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === 'string' &&
                    value.toLowerCase().includes(query),
            ),
        );
    }, [items, search]);

    const columns: CrudTableColumn<T>[] =
        tableColumns ??
        fields
            .filter((field) => field.type !== 'file')
            .map((field) => ({
                key: field.name,
                label: field.label,
            }));

    const remove = (item: T) => {
        if (
            !window.confirm(
                `Hapus "${itemTitle(item)}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            return;
        }

        router.delete(deleteUrl(item), { preserveScroll: true });
    };

    const tableColumnsDefs: ColumnDef<T>[] = [
        ...columns.map((column) => ({
            id: column.key,
            accessorFn: (row: T) => row[column.key],
            header: column.label,
            cell: ({ row }: { row: Row<T> }) =>
                cellContent(row.original, column),
            meta: { className: column.className },
        })),
        {
            id: 'actions',
            header: 'Aksi',
            enableSorting: false,
            cell: ({ row }: { row: Row<T> }) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => row.toggleExpanded()}
                    >
                        {row.getIsExpanded() ? (
                            <>
                                <X className="mr-1 h-4 w-4" /> Batal
                            </>
                        ) : (
                            <>
                                <Pencil className="mr-1 h-4 w-4" /> Edit
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

    const submitCreate = (event: FormEvent) => {
        event.preventDefault();

        createForm.post(storeUrl, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                setShowCreate(false);
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
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
                <Button type="button" onClick={() => setShowCreate((v) => !v)}>
                    {showCreate ? (
                        <>
                            <X className="mr-1 h-4 w-4" /> Tutup Form
                        </>
                    ) : (
                        <>
                            <Plus className="mr-1 h-4 w-4" />{' '}
                            {createButtonLabel}
                        </>
                    )}
                </Button>
            </div>

            {showCreate && (
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        {createButtonLabel}
                    </h2>
                    <EditForm
                        fields={createFields ?? fields}
                        data={createForm.data}
                        errors={createForm.errors}
                        setData={createForm.setData}
                        onSubmit={submitCreate}
                        submitLabel="Simpan"
                    />
                </div>
            )}

            {layout === 'table' ? (
                <DataTable
                    columns={tableColumnsDefs}
                    data={filteredItems}
                    totalCount={items.length}
                    emptyMessage={
                        items.length === 0
                            ? emptyMessage
                            : 'Tidak ada data yang cocok dengan pencarian.'
                    }
                    search={{
                        value: search,
                        onChange: setSearch,
                        placeholder: `Cari ${title.toLowerCase()}...`,
                    }}
                    renderExpandedRow={(item, collapse) => (
                        <CrudEditPanel
                            itemTitle={itemTitle(item)}
                            item={item}
                            fields={fields}
                            updateUrl={updateUrl(item)}
                            onDone={collapse}
                        />
                    )}
                />
            ) : (
                <div className="space-y-3">
                    {items.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                            {emptyMessage}
                        </div>
                    ) : (
                        items.map((item) => (
                            <CrudListRow
                                key={item.id}
                                item={item}
                                fields={fields}
                                updateUrl={updateUrl(item)}
                                deleteUrl={deleteUrl(item)}
                                itemTitle={itemTitle(item)}
                                renderItem={renderItem}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

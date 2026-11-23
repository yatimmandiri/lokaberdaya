import { Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import {
    CrudManager,
    type CrudField,
    type CrudTableColumn,
} from '@/components/admin/crud-manager';
import type { AdminUser } from '@/types/content';

type Props = {
    admins: AdminUser[];
};

const fields: CrudField[] = [
    { name: 'name', label: 'Nama', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
        name: 'password',
        label: 'Kata Sandi',
        type: 'password',
        full: true,
        help: 'Kosongkan jika tidak ingin mengubah kata sandi.',
    },
];

const createFields: CrudField[] = [
    { name: 'name', label: 'Nama', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
        name: 'password',
        label: 'Kata Sandi',
        type: 'password',
        required: true,
        full: true,
        help: 'Akun baru langsung dapat login melalui /login/admin.',
    },
];

const tableColumns: CrudTableColumn<AdminUser>[] = [
    {
        key: 'name',
        label: 'Nama',
        render: (admin) => (
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff5da] text-sm font-bold text-[#4b552a]">
                    {admin.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-gray-900">{admin.name}</p>
            </div>
        ),
    },
    { key: 'email', label: 'Email' },
    {
        key: 'created_at',
        label: 'Ditambahkan',
        render: (admin) =>
            new Intl.DateTimeFormat('id-ID', {
                dateStyle: 'medium',
            }).format(new Date(admin.created_at)),
    },
];

export default function AdminUsers({ admins }: Props) {
    return (
        <>
            <Head title="Kelola Admin" />

            <div className="p-4 md:p-6">
                <div className="mb-4 flex items-start gap-3 rounded-xl border border-[#4b552a]/15 bg-[#f7ffda] p-4 text-sm text-[#4b552a]">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>
                        Semua akun di halaman ini memiliki akses penuh ke panel
                        admin. Bagikan alamat <strong>/login/admin</strong>{' '}
                        kepada admin yang baru ditambahkan.
                    </p>
                </div>

                <CrudManager
                    title="Kelola Admin"
                    description="Tambah, ubah, atau hapus akun administrator panel."
                    storeUrl="/admin/admins"
                    items={admins}
                    fields={fields}
                    createFields={createFields}
                    updateUrl={(admin) => `/admin/admins/${admin.id}`}
                    deleteUrl={(admin) => `/admin/admins/${admin.id}`}
                    itemTitle={(admin) => admin.name}
                    createButtonLabel="Tambah Admin"
                    emptyMessage="Belum ada akun admin."
                    tableColumns={tableColumns}
                    renderItem={(admin) => (
                        <div>
                            <p className="font-semibold text-gray-900">
                                {admin.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {admin.email}
                            </p>
                        </div>
                    )}
                />
            </div>
        </>
    );
}

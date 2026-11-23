import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/auth/google/password';

type Props = {
    name: string;
    email: string;
    passwordRules: string;
};

export default function CreatePassword({ name, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Buat Kata Sandi" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                readOnly
                                className="bg-gray-50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Google</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                readOnly
                                className="bg-gray-50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Kata Sandi</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="Buat kata sandi"
                                passwordrules={passwordRules}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Konfirmasi Kata Sandi
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Ulangi kata sandi"
                                passwordrules={passwordRules}
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 w-full bg-[#4b552a] hover:bg-[#3a4220]"
                            disabled={processing}
                            data-test="create-password-button"
                        >
                            {processing && <Spinner />}
                            Buat Kata Sandi & Masuk
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

CreatePassword.layout = {
    title: 'Buat Kata Sandi',
    description:
        'Akun Google Anda belum terdaftar. Buat kata sandi untuk menyelesaikan pendaftaran.',
};

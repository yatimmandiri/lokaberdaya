import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { edit } from '@/routes/security';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Konfirmasi kata sandi" />

            <h1 className="sr-only">Konfirmasi kata sandi</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Konfirmasi kata sandi"
                    description="Area aman. Masukkan kata sandi Anda untuk melanjutkan ke pengaturan."
                />

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="max-w-xl space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Kata sandi</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Masukkan kata sandi"
                                    autoComplete="current-password"
                                    autoFocus
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center">
                                <Button
                                    type="submit"
                                    className="bg-[#4b552a] hover:bg-[#3a4220]"
                                    disabled={processing}
                                    data-test="confirm-password-button"
                                >
                                    {processing && <Spinner />}
                                    Konfirmasi kata sandi
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

ConfirmPassword.layout = {
    breadcrumbs: [
        {
            title: 'Security',
            href: edit(),
        },
    ],
};

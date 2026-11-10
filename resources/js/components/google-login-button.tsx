import { usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { redirect as googleRedirect } from '@/routes/auth/google';

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
                fill="#4285F4"
            />
            <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
                fill="#34A853"
            />
            <path
                d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
                fill="#FBBC05"
            />
            <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
                fill="#EA4335"
            />
        </svg>
    );
}

type Props = {
    label?: string;
    separator?: string;
};

export default function GoogleLoginButton({ label, separator }: Props = {}) {
    const { errors } = usePage().props;

    return (
        <>
            <div className="grid gap-2">
                {/* OAuth requires a full page navigation, so a plain anchor is used */}
                <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    tabIndex={1}
                >
                    <a
                        href={googleRedirect.url()}
                        data-test="google-login-button"
                    >
                        <GoogleIcon />
                        {label ?? 'Masuk dengan Google'}
                    </a>
                </Button>
                <InputError message={errors.google} className="text-center" />
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {separator ?? 'atau masuk dengan email'}
                    </span>
                </div>
            </div>
        </>
    );
}

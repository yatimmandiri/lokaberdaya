<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class GoogleController extends Controller
{
    /**
     * Session key used while waiting for the user to create a password.
     */
    private const PENDING_SESSION_KEY = 'auth.google.pending';

    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirect(): SymfonyRedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google and sign them in.
     */
    public function callback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable) {
            return redirect()
                ->route('login')
                ->withErrors(['google' => __('Gagal melakukan autentikasi dengan Google. Silakan coba lagi.')]);
        }

        $email = $googleUser->getEmail();

        if (! $email) {
            return redirect()
                ->route('login')
                ->withErrors(['google' => __('Email dari akun Google tidak dapat dibaca. Silakan coba lagi.')]);
        }

        $user = User::where('email', $email)->first();

        if (! $user) {
            $request->session()->put(self::PENDING_SESSION_KEY, [
                'name' => $googleUser->getName() ?: $email,
                'email' => $email,
            ]);

            return redirect()->route('auth.google.password.create');
        }

        $request->session()->forget(self::PENDING_SESSION_KEY);

        // Google has already verified ownership of this email address.
        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        Auth::login($user, true);

        return redirect()->intended('/admin');
    }

    /**
     * Show the form for creating a password after a first Google sign in.
     */
    public function showCreatePassword(Request $request): Response|RedirectResponse
    {
        $pending = $request->session()->get(self::PENDING_SESSION_KEY);

        if (! is_array($pending)) {
            return redirect()
                ->route('login')
                ->withErrors(['google' => __('Sesi pendaftaran Google sudah berakhir. Silakan masuk kembali dengan Google.')]);
        }

        return Inertia::render('auth/create-password', [
            'name' => $pending['name'],
            'email' => $pending['email'],
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }

    /**
     * Create the account and password for a first-time Google user.
     */
    public function storeCreatePassword(Request $request): RedirectResponse
    {
        $pending = $request->session()->get(self::PENDING_SESSION_KEY);

        if (! is_array($pending)) {
            return redirect()
                ->route('login')
                ->withErrors(['google' => __('Sesi pendaftaran Google sudah berakhir. Silakan masuk kembali dengan Google.')]);
        }

        $validated = $request->validate([
            'password' => ['required', 'string', Password::default(), 'confirmed'],
        ]);

        $user = User::where('email', $pending['email'])->first();

        if (! $user) {
            $user = User::query()->create([
                'name' => $pending['name'],
                'email' => $pending['email'],
                'password' => $validated['password'],
                'role' => 'admin',
            ]);

            // Google has already verified ownership of this email address.
            $user->markEmailAsVerified();
        }

        $request->session()->forget(self::PENDING_SESSION_KEY);

        Auth::login($user, true);

        return redirect()->intended('/admin');
    }
}

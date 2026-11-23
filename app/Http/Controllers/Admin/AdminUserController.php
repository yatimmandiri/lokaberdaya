<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the administrator accounts.
     */
    public function index(): Response
    {
        return Inertia::render('admin/admins/index', [
            'admins' => User::query()
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'created_at']),
        ]);
    }

    /**
     * Store a newly created administrator account.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'string', Password::default()],
        ]);

        $admin = User::query()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'admin',
        ]);

        $admin->markEmailAsVerified();

        $this->flashSuccess('Admin baru berhasil ditambahkan.');

        return back();
    }

    /**
     * Update the given administrator account.
     */
    public function update(Request $request, User $admin): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($admin->id)],
            'password' => ['nullable', 'string', Password::default()],
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (! empty($validated['password'])) {
            $data['password'] = $validated['password'];
        }

        $admin->update($data);

        $this->flashSuccess('Data admin berhasil diperbarui.');

        return back();
    }

    /**
     * Remove the given administrator account.
     */
    public function destroy(Request $request, User $admin): RedirectResponse
    {
        if ($request->user()?->is($admin)) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Anda tidak dapat menghapus akun sendiri.',
            ]);

            return back();
        }

        if (User::query()->count() <= 1) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Minimal harus ada satu akun admin.',
            ]);

            return back();
        }

        $admin->delete();

        $this->flashSuccess('Admin berhasil dihapus.');

        return back();
    }
}

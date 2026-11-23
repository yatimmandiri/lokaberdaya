<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

function googleUser(string $email, string $name = 'Google User'): SocialiteUser
{
    return (new SocialiteUser)->setRaw([])->map([
        'id' => '1234567890',
        'nickname' => 'googleuser',
        'name' => $name,
        'email' => $email,
        'avatar' => null,
        'token' => 'google-token',
    ]);
}

function pendingGoogleRegistration(string $email = 'google.user@example.com', string $name = 'Google User'): array
{
    return [
        'auth.google.pending' => [
            'name' => $name,
            'email' => $email,
        ],
    ];
}

test('users are redirected to google to authenticate', function () {
    Socialite::fake('google');

    $this->get(route('auth.google.redirect'))
        ->assertRedirect('https://socialite.fake/google/authorize');
});

test('unregistered google accounts are redirected to the create password page', function () {
    Socialite::fake('google', googleUser('google.user@example.com'));

    $this->get(route('auth.google.callback'))
        ->assertRedirect(route('auth.google.password.create'))
        ->assertSessionHas('auth.google.pending', [
            'name' => 'Google User',
            'email' => 'google.user@example.com',
        ]);

    expect(User::where('email', 'google.user@example.com')->exists())->toBeFalse();

    $this->assertGuest();

    $this->get(route('auth.google.password.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/create-password')
            ->where('name', 'Google User')
            ->where('email', 'google.user@example.com')
            ->has('passwordRules'));
});

test('the create password page requires a pending google registration', function () {
    $this->get(route('auth.google.password.create'))
        ->assertRedirect(route('login'))
        ->assertSessionHasErrors('google');
});

test('unregistered google accounts can create a password and are signed in', function () {
    $this->withSession(pendingGoogleRegistration())
        ->post(route('auth.google.password.store'), [
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ])
        ->assertRedirect('/admin')
        ->assertSessionMissing('auth.google.pending');

    $user = User::where('email', 'google.user@example.com')->first();

    expect($user)->not->toBeNull()
        ->and($user->name)->toBe('Google User')
        ->and($user->role)->toBe('admin')
        ->and($user->hasVerifiedEmail())->toBeTrue()
        ->and(Hash::check('Password123!', $user->password))->toBeTrue();

    $this->assertAuthenticatedAs($user);
});

test('creating a password requires a valid confirmed password', function () {
    $this->withSession(pendingGoogleRegistration())
        ->post(route('auth.google.password.store'), [
            'password' => 'short',
            'password_confirmation' => 'different',
        ])
        ->assertSessionHasErrors('password');

    expect(User::where('email', 'google.user@example.com')->exists())->toBeFalse();

    $this->assertGuest();
});

test('creating a password requires a pending google registration', function () {
    $this->post(route('auth.google.password.store'), [
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ])
        ->assertRedirect(route('login'))
        ->assertSessionHasErrors('google');

    $this->assertGuest();
});

test('existing admins can authenticate with google', function () {
    $user = User::factory()->unverified()->create();

    Socialite::fake('google', googleUser($user->email));

    $this->get(route('auth.google.callback'))
        ->assertRedirect('/admin');

    expect($user->refresh()->hasVerifiedEmail())->toBeTrue();

    $this->assertAuthenticatedAs($user);
});

test('failed google authentication redirects back to login with errors', function () {
    Socialite::fake('google', fn () => throw new RuntimeException('Google error'));

    $this->from(route('home'))->get(route('auth.google.callback'))
        ->assertRedirect(route('login'))
        ->assertSessionHasErrors('google');

    $this->assertGuest();
});

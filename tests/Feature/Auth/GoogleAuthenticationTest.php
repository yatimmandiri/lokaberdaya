<?php

use App\Models\User;
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

test('users are redirected to google to authenticate', function () {
    Socialite::fake('google');

    $this->get(route('auth.google.redirect'))
        ->assertRedirect('https://socialite.fake/google/authorize');
});

test('users can authenticate with google and are created automatically', function () {
    Socialite::fake('google', googleUser('google.user@example.com'));

    $this->get(route('auth.google.callback'))
        ->assertRedirect(route('home', absolute: false));

    $user = User::where('email', 'google.user@example.com')->first();

    expect($user)
        ->not->toBeNull()
        ->and($user->name)->toBe('Google User')
        ->and($user->hasVerifiedEmail())->toBeTrue();

    $this->assertAuthenticatedAs($user);
});

test('existing users can authenticate with google', function () {
    $user = User::factory()->unverified()->create();

    Socialite::fake('google', googleUser($user->email));

    $this->get(route('auth.google.callback'))
        ->assertRedirect(route('home', absolute: false));

    expect($user->refresh()->hasVerifiedEmail())->toBeTrue();

    $this->assertAuthenticatedAs($user);
});

test('admin users are redirected to the admin dashboard after google sign in', function () {
    $user = User::factory()->admin()->create();

    Socialite::fake('google', googleUser($user->email));

    $this->get(route('auth.google.callback'))
        ->assertRedirect('/admin');

    $this->assertAuthenticatedAs($user);
});

test('failed google authentication redirects back to login with errors', function () {
    Socialite::fake('google', fn () => throw new RuntimeException('Google error'));

    $this->from(route('home'))->get(route('auth.google.callback'))
        ->assertRedirect(route('login'))
        ->assertSessionHasErrors('google');

    $this->assertGuest();
});

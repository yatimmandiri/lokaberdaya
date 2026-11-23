<?php

use App\Models\User;

test('admin can open the admin management page', function () {
    $this->actingAs(User::factory()->create());

    $this->get(route('admin.admins.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/admins/index'));
});

test('admin can add a new admin who can log in immediately', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('admin.admins.store'), [
        'name' => 'Admin Baru',
        'email' => 'admin.baru@example.com',
        'password' => 'password-baru',
    ])->assertRedirect();

    $admin = User::where('email', 'admin.baru@example.com')->first();

    expect($admin)
        ->not->toBeNull()
        ->and($admin->name)->toBe('Admin Baru')
        ->and($admin->role)->toBe('admin')
        ->and($admin->hasVerifiedEmail())->toBeTrue();

    $this->post(route('logout'));

    $this->post(route('login.store'), [
        'email' => 'admin.baru@example.com',
        'password' => 'password-baru',
    ])->assertRedirect('/admin');

    $this->assertAuthenticatedAs($admin);
});

test('admin must have a unique email address', function () {
    $existing = User::factory()->create();
    $this->actingAs(User::factory()->create());

    $this->post(route('admin.admins.store'), [
        'name' => 'Admin Lain',
        'email' => $existing->email,
        'password' => 'password-baru',
    ])->assertSessionHasErrors('email');
});

test('admin can update another admin without changing the password', function () {
    $admin = User::factory()->create();
    $this->actingAs(User::factory()->create());

    $this->put(route('admin.admins.update', $admin), [
        'name' => 'Nama Diperbarui',
        'email' => 'diperbarui@example.com',
        'password' => '',
    ])->assertRedirect();

    expect($admin->refresh())
        ->name->toBe('Nama Diperbarui')
        ->email->toBe('diperbarui@example.com');
});

test('admin cannot delete their own account', function () {
    $admin = User::factory()->create();
    $this->actingAs($admin);

    $this->delete(route('admin.admins.destroy', $admin))->assertRedirect();

    $this->assertDatabaseHas('users', ['id' => $admin->id]);
});

test('admin can delete another admin', function () {
    $admin = User::factory()->create();
    $this->actingAs(User::factory()->create());

    $this->delete(route('admin.admins.destroy', $admin))->assertRedirect();

    $this->assertDatabaseMissing('users', ['id' => $admin->id]);
});

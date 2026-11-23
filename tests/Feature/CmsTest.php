<?php

use App\Models\Program;
use App\Models\UmkmRegion;
use App\Models\User;
use Database\Seeders\ContentSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('public pages render with seeded content', function () {
    $this->seed(ContentSeeder::class);

    $this->get(route('home'))->assertOk();
    $this->get(route('tentang'))->assertOk();
    $this->get(route('agriculture'))->assertOk();
    $this->get(route('agroforestry'))->assertOk();
    $this->get(route('peternakan'))->assertOk();
    $this->get(route('umkm'))->assertOk();
    $this->get(route('blog'))->assertOk();
    $this->get(route('kontak'))->assertOk();
});

test('landing quick stats are calculated from cms data', function () {
    $this->seed(ContentSeeder::class);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('landing')
            ->where('landingStats.0.value', '136')
            ->where('landingStats.0.label', 'Penerima Manfaat')
            ->where('landingStats.1.value', '4')
            ->where('landingStats.1.label', 'Program')
            ->where('landingStats.2.value', '28')
            ->where('landingStats.2.label', 'Titik Pemberdayaan'));
});

test('landing quick stats follow added and deleted data', function () {
    $this->seed(ContentSeeder::class);

    $program = Program::query()->firstOrFail();

    $program->activities()->create([
        'city' => 'Test Kota',
        'detail_items' => ['Jumlah PM: 5'],
        'sort_order' => 99,
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('landingStats.0.value', '141')
            ->where('landingStats.2.value', '29'));

    $region = UmkmRegion::query()->firstOrFail();
    $beneficiaries = $region->beneficiaries()->count();
    $region->delete();

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('landingStats.0.value', (string) (141 - $beneficiaries))
            ->where('landingStats.2.value', '28'));
});

test('admin can open every cms page', function () {
    $this->seed(ContentSeeder::class);

    $admin = User::factory()->create();
    $this->actingAs($admin);

    $program = Program::query()->firstOrFail();

    $this->get(route('admin.dashboard'))->assertOk();
    $this->get(route('admin.settings.edit'))->assertOk();
    $this->get(route('admin.hero-slides.index'))->assertOk();
    $this->get(route('admin.programs.index'))->assertOk();
    $this->get(route('admin.programs.edit', $program))->assertOk();
    $this->get(route('admin.programs.activities.index', $program))->assertOk();
    $this->get(route('admin.programs.activities.create', $program))->assertOk();
    $this->get(route('admin.umkm.index'))->assertOk();
    $this->get(route('admin.umkm.create'))->assertOk();
    $this->get(route('admin.posts.index'))->assertOk();
    $this->get(route('admin.posts.create'))->assertOk();
    $this->get(route('admin.categories.index'))->assertOk();
    $this->get(route('admin.testimonials.index'))->assertOk();
    $this->get(route('admin.partners.index'))->assertOk();
    $this->get(route('admin.core-values.index'))->assertOk();
    $this->get(route('admin.messages.index'))->assertOk();
});

test('contact form stores a message', function () {
    $this->post(route('kontak.store'), [
        'name' => 'Pengunjung',
        'email' => 'pengunjung@example.com',
        'subject' => 'Tanya program',
        'message' => 'Bagaimana cara ikut program?',
    ])->assertRedirect();

    $this->assertDatabaseHas('contact_messages', [
        'email' => 'pengunjung@example.com',
        'subject' => 'Tanya program',
    ]);
});

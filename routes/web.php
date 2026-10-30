<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // <-- Tambahkan baris ini 

Route::inertia('/', 'landing')->name('home');
Route::get('/tentang', function () {
    return Inertia::render('about');
})->name('tentang');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
Route::inertia('/kontak', 'contact')->name('kontak');
Route::inertia('/program/agriculture', 'agriculture')->name('agriculture'); 
Route::inertia('/program/agroforestry', 'agroforestry')->name('agroforestry');
Route::inertia('/program/peternakan', 'peternakan')->name('peternakan');
Route::inertia('/program/umkm', 'umkm')->name('umkm');
Route::inertia('/blog', 'blog')->name('blog');
require __DIR__.'/settings.php';

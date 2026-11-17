<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Support\ImageUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * @var array<int, string>
     */
    private const TEXT_KEYS = [
        'site_name',
        'site_tagline',
        'phone',
        'email',
        'address',
        'maps_embed_url',
        'hero_title',
        'hero_title_accent',
        'hero_subtitle',
        'landing_stat_1_value',
        'landing_stat_1_label',
        'landing_stat_2_value',
        'landing_stat_2_label',
        'landing_stat_3_value',
        'landing_stat_3_label',
        'footer_description',
    ];

    /**
     * @var array<int, string>
     */
    private const IMAGE_KEYS = [
        'logo',
    ];

    public function edit(): Response
    {
        $settings = SiteSetting::allValues();

        foreach (self::IMAGE_KEYS as $key) {
            $settings[$key] = ImageUploader::url($settings[$key] ?? null);
        }

        return Inertia::render('admin/settings', [
            'settings' => $settings,
            'textKeys' => self::TEXT_KEYS,
            'imageKeys' => self::IMAGE_KEYS,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $rules = collect(self::TEXT_KEYS)
            ->mapWithKeys(fn (string $key): array => [$key => ['nullable', 'string']])
            ->all();

        foreach (self::IMAGE_KEYS as $key) {
            $rules[$key] = ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:8192'];
        }

        $validated = $request->validate($rules);
        $values = [];

        foreach (self::TEXT_KEYS as $key) {
            $values[$key] = $validated[$key] ?? null;
        }

        foreach (self::IMAGE_KEYS as $key) {
            if ($request->hasFile($key)) {
                ImageUploader::delete(SiteSetting::get($key));
                $values[$key] = ImageUploader::store($request->file($key), 'settings');
            }
        }

        SiteSetting::setMany($values);

        $this->flashSuccess('Pengaturan situs berhasil disimpan.');

        return back();
    }
}

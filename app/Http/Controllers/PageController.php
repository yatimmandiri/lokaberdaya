<?php

namespace App\Http\Controllers;

use App\Models\CoreValue;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Program;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Support\LandingStats;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function landing(): Response
    {
        return Inertia::render('landing', [
            'heroSlides' => HeroSlide::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'programs' => Program::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'testimonials' => Testimonial::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'partners' => Partner::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'landingStats' => LandingStats::get(),
        ]);
    }

    public function about(): Response
    {
        $settings = SiteSetting::allValues();

        return Inertia::render('about', [
            'coreValues' => CoreValue::query()->orderBy('sort_order')->get(),
            'storyParagraphs' => $this->paragraphs($settings['about_story'] ?? ''),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('contact');
    }

    /**
     * @return array<int, string>
     */
    private function paragraphs(?string $value): array
    {
        if (blank($value)) {
            return [];
        }

        return collect(preg_split('/\R{2,}/', trim($value)) ?: [])
            ->map(fn (string $paragraph): string => trim($paragraph))
            ->filter()
            ->values()
            ->all();
    }
}

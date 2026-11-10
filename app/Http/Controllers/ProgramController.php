<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\UmkmRegion;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function agriculture(): Response
    {
        return $this->renderProgram('agriculture', 'agriculture');
    }

    public function agroforestry(): Response
    {
        return $this->renderProgram('agroforestry', 'agroforestry');
    }

    public function peternakan(): Response
    {
        return $this->renderProgram('peternakan', 'peternakan');
    }

    public function umkm(): Response
    {
        $program = Program::query()
            ->where('slug', 'umkm')
            ->with('stats')
            ->firstOrFail();

        return Inertia::render('umkm', [
            'program' => $program,
            'regions' => UmkmRegion::query()
                ->with(['images', 'beneficiaries'])
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function activity(string $program, string $city): Response
    {
        $programModel = Program::query()
            ->where('slug', $program)
            ->with('stats')
            ->firstOrFail();

        if ($programModel->slug === 'umkm') {
            $region = UmkmRegion::query()
                ->with(['images', 'beneficiaries'])
                ->get()
                ->first(fn (UmkmRegion $region) => Str::slug($region->city) === $city);

            abort_if($region === null, 404);

            return Inertia::render('umkm-region', [
                'program' => $programModel,
                'region' => $region,
            ]);
        }

        $activity = $programModel->activities()
            ->get()
            ->first(fn ($activity) => Str::slug($activity->city) === $city);

        abort_if($activity === null, 404);

        return Inertia::render('program-activity', [
            'program' => $programModel,
            'activity' => $activity,
        ]);
    }

    private function renderProgram(string $slug, string $component): Response
    {
        $program = Program::query()
            ->where('slug', $slug)
            ->with(['stats', 'activities'])
            ->firstOrFail();

        return Inertia::render($component, [
            'program' => $program,
        ]);
    }
}

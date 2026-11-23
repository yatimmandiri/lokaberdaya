<?php

namespace App\Support;

use App\Models\Program;
use App\Models\ProgramActivity;
use App\Models\ProgramStat;
use App\Models\UmkmBeneficiary;
use App\Models\UmkmRegion;

class LandingStats
{
    /**
     * Quick stats for the landing page, calculated from current CMS data.
     *
     * @return array<int, array{value: string, label: string, icon: string}>
     */
    public static function get(): array
    {
        return [
            [
                'value' => (string) self::beneficiaries(),
                'label' => 'Penerima Manfaat',
                'icon' => 'users',
            ],
            [
                'value' => (string) Program::query()->where('is_active', true)->count(),
                'label' => 'Program',
                'icon' => 'leaf',
            ],
            [
                'value' => (string) self::empowermentPoints(),
                'label' => 'Titik Pemberdayaan',
                'icon' => 'building',
            ],
        ];
    }

    /**
     * Beneficiaries are taken from the activity details ("Jumlah PM") and
     * the individual UMKM beneficiaries. The program stats are only used as
     * a fallback when those detailed records have not been filled yet.
     */
    private static function beneficiaries(): int
    {
        $fromActivities = ProgramActivity::query()
            ->whereHas('program', fn ($query) => $query->where('is_active', true))
            ->get(['detail_items'])
            ->sum(fn (ProgramActivity $activity): int => self::countBeneficiaries($activity->detail_items));

        $total = $fromActivities + UmkmBeneficiary::query()->count();

        return $total > 0 ? $total : self::sumProgramStat('penerima manfaat');
    }

    /**
     * Empowerment points are the program activity locations plus UMKM regions.
     */
    private static function empowermentPoints(): int
    {
        $total = ProgramActivity::query()
            ->whereHas('program', fn ($query) => $query->where('is_active', true))
            ->count() + UmkmRegion::query()->count();

        return $total > 0 ? $total : self::sumProgramStat('titik pemberdayaan');
    }

    private static function countBeneficiaries(mixed $detailItems): int
    {
        if (! is_array($detailItems)) {
            return 0;
        }

        return collect($detailItems)
            ->sum(function (mixed $item): int {
                if (! is_string($item) || ! preg_match('/Jumlah\s*PM\s*:\s*(\d[\d.,]*)/iu', $item, $matches)) {
                    return 0;
                }

                return (int) str_replace(['.', ','], '', $matches[1]);
            });
    }

    private static function sumProgramStat(string $label): int
    {
        return ProgramStat::query()
            ->whereRaw('LOWER(label) LIKE ?', ['%'.mb_strtolower($label).'%'])
            ->get(['value'])
            ->sum(fn (ProgramStat $stat): int => self::numericValue($stat->value));
    }

    private static function numericValue(?string $value): int
    {
        if (blank($value) || ! preg_match('/\d[\d.,]*/', $value, $matches)) {
            return 0;
        }

        return (int) str_replace(['.', ','], '', $matches[0]);
    }
}

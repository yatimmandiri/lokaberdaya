<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Landing quick stats are now calculated from CMS data, so the old
     * manually entered values are no longer needed.
     */
    public function up(): void
    {
        DB::table('site_settings')->where('key', 'like', 'landing_stat_%')->delete();
    }

    public function down(): void
    {
        // The removed settings cannot be restored automatically.
    }
};

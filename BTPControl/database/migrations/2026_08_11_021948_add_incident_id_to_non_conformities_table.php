<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('non_conformities', function (Blueprint $table) {
            $table->foreignId('incident_id')
                ->nullable()
                ->after('inspection_check_id')
                ->constrained('incidents')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('non_conformities', function (Blueprint $table) {
            $table->dropForeign(['incident_id']);
            $table->dropColumn('incident_id');
        });
    }
};
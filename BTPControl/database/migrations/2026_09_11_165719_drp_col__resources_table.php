<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            if (Schema::hasColumn('resources', 'unit_cost')) {
                $table->dropColumn('unit_cost');
            }

            if (!Schema::hasColumn('resources', 'unit')) {
                $table->enum('unit', [
                    'unit',
                    'piece',
                    'kg',
                    'tonne',
                    'litre',
                    'm3',
                    'm2',
                    'm',
                    'mm',
                    'bag',
                    'box',
                    'pallet',
                    'roll',
                    'sheet',
                    'bar',
                    'bundle',
                    'load',
                    'hour',
                    'day',
                ])
                ->default('unit')
                ->after('quantity');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            if (Schema::hasColumn('resources', 'unit')) {
                $table->dropColumn('unit');
            }

            if (!Schema::hasColumn('resources', 'unit_cost')) {
                $table->decimal('unit_cost', 10, 2)
                    ->default(0)
                    ->after('quantity');
            }
        });
    }
};                    
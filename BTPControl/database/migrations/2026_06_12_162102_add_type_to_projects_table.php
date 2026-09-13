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
    Schema::table('projects', function (Blueprint $table) {
        $table->string('type')->nullable()->after('name');
        $table->foreignId('updated_by')->nullable();
    });
}

public function down(): void
{
    Schema::table('projects', function (Blueprint $table) {
        $table->dropColumn('type');
        $table->dropColumn('updated_by');
    });
}
};

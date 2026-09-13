<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
         $table->id();
         $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
         $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
         $table->enum('type', ['daily','weekly','incident','quality','safety','progress']);
         $table->date('report_date');
         $table->string('weather')->nullable();
         $table->text('summary')->nullable();
         $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};

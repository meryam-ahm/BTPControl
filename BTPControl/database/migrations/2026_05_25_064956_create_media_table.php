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
Schema::create('media', function (Blueprint $table) {
         $table->id();
         $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
         $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
         $table->enum('type', ['photo','video','document','incident']);
         $table->string('url');
         $table->string('related_type')->nullable();
         $table->unsignedBigInteger('related_id')->nullable();
         $table->timestamps();});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};

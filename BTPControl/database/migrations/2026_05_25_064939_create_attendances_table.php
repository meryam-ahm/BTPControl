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
Schema::create('attendance', function (Blueprint $table) {
           $table->id();
           $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
           $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
           $table->dateTime('check_in');
           $table->dateTime('check_out')->nullable();
           $table->enum('status', ['present','late','absent','half_day'])->default('present');
           $table->string('role_snapshot')->nullable();
           $table->timestamps();});
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
 
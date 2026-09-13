<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
          $table->id();
          $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
          $table->string('title');
          $table->text('description')->nullable();
          $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
          $table->foreignId('parent_task_id')->nullable()->constrained('tasks')->nullOnDelete();
          $table->enum('priority', ['low','medium','high','urgent'])->default('medium');
          $table->enum('status', ['pending','in progress','review','completed','cancelled'])->default('pending');
          $table->integer('progress')->default(0);
          $table->decimal('estimated_hours', 5, 2)->nullable();
          $table->date('due_date')->nullable();
          $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

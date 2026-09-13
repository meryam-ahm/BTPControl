<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')
                ->constrained('projects')
                ->onDelete('cascade');

            $table->foreignId('task_id')
                ->nullable()
                ->constrained('tasks')
                ->nullOnDelete();

            $table->foreignId('inspected_by')
                ->constrained('users')
                ->onDelete('cascade');

            $table->enum('type', ['quality', 'safety']);

            $table->string('title');

            $table->date('inspection_date')->nullable();

            $table->enum('status', ['draft', 'completed'])
                ->default('draft');

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspections');
    }
};
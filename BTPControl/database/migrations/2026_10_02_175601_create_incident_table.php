<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')
                ->constrained('projects')
                ->cascadeOnDelete();

            $table->foreignId('reported_by')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('title');

            $table->text('description')->nullable();

            $table->enum('type', [
                'safety',
                'accident',
                'near_miss',
                'equipment',
                'property_damage',
                'environmental',
                'other'
            ])->default('safety');

            $table->enum('severity', [
                'low',
                'medium',
                'high',
                'critical'
            ])->default('medium');

            $table->enum('status', [
                'open',
                'investigating',
                'resolved',
                'closed'
            ])->default('open');

            $table->dateTime('incident_date');

            $table->string('location')->nullable();

            $table->text('immediate_action')->nullable();

            $table->text('root_cause')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
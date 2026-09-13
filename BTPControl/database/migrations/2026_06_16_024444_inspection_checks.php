<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inspection_checks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('inspection_id')
                ->constrained('inspections')
                ->onDelete('cascade');

            $table->string('check_name');

            $table->string('required_value')->nullable();

            $table->string('actual_value')->nullable();

            $table->string('unit')->nullable();

            $table->enum('status', ['pending', 'ok', 'fail'])
                ->default('pending');

            $table->enum('severity', ['low', 'medium', 'high'])
                ->nullable(); // used only if fail

            $table->text('comment')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inspection_checks');
    }
    
};
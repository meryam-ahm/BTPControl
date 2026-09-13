<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignid('client_id')->constrained('clients')->onDelete('cascade');
            $table->string('location')->nullable();
            $table->decimal('budget',12,2)->default(0);
            $table->enum("status",["planned","active","paused","completed","cancelled"])->default("planned");
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');     
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

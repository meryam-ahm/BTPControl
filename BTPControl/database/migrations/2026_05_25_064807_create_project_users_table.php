<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('project_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->ondelete("cascade");
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('role_on_proj',[ "chef_chantier","engineer","worker","supervisor"]);
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('project_users');
    }
};

 
 

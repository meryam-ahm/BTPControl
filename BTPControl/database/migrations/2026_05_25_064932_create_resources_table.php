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
      Schema::create('resources', function (Blueprint $table) {
         $table->id();
         $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
         $table->string('name');
         $table->enum('type', ['material','equipment','tool','vehicle']);
         $table->integer('quantity')->default(0);
         $table->decimal('unit_cost', 10, 2)->default(0);
         $table->enum('status', ['available','in_use','damaged','out_of_stock'])->default('available');
         $table->string('supplier')->nullable();
         $table->timestamps();
});
     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};

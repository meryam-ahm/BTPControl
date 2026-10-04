<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Temporarily allow both old and new values
        DB::statement("
            ALTER TABLE project_users
            MODIFY role_on_proj ENUM(
                'chef_chantier',
                'site_manager',
                'engineer',
                'worker',
                'supervisor'
            ) NOT NULL
        ");

        // Convert existing data
        DB::table('project_users')
            ->where('role_on_proj', 'chef_chantier')
            ->update([
                'role_on_proj' => 'site_manager'
            ]);

        // Remove the old value from the ENUM
        DB::statement("
            ALTER TABLE project_users
            MODIFY role_on_proj ENUM(
                'site_manager',
                'engineer',
                'worker',
                'supervisor'
            ) NOT NULL
        ");
    }

    public function down(): void
    {
        // Temporarily allow both values
        DB::statement("
            ALTER TABLE project_users
            MODIFY role_on_proj ENUM(
                'chef_chantier',
                'site_manager',
                'engineer',
                'worker',
                'supervisor'
            ) NOT NULL
        ");

        // Convert back
        DB::table('project_users')
            ->where('role_on_proj', 'site_manager')
            ->update([
                'role_on_proj' => 'chef_chantier'
            ]);

        // Restore original ENUM
        DB::statement("
            ALTER TABLE project_users
            MODIFY role_on_proj ENUM(
                'chef_chantier',
                'engineer',
                'worker',
                'supervisor'
            ) NOT NULL
        ");
    }
};


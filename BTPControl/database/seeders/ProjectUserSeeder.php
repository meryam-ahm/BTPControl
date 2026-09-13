<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProjectUser;

class ProjectUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

public function run(): void
{ 
      ProjectUser::factory()->count(40)->create();
}
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
  use App\Models\Attendance;

class AttendanceSeeder extends Seeder
{

public function run(): void
{
    for ($i=1; $i<=100; $i++) {
        Attendance::create([
            'project_id' => rand(1,5),
            'user_id' => rand(1,20),
            'check_in' => now(),
            'check_out' => now()->addHours(8),
            'status' => ['present','late','absent'][rand(0,2)],
            'role_snapshot' => ['worker','engineer','site_manager'][rand(0,2)]
        ]);
    }
}
}

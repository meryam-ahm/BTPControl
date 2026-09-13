<?php

namespace Database\Seeders;
   use App\Models\Report;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{

public function run(): void
{
    for ($i=1; $i<=20; $i++) {
        Report::create([
            'project_id' => rand(1,5),
            'created_by' => rand(1,20),
            'type' => 'daily',
            'report_date' => now(),
            'summary' => "Report $i"
        ]);
    }
}
}

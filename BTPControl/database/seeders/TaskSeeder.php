<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{

public function run(): void
{
    for ($i=1; $i<=80; $i++) {
        Task::create([
            'project_id' => rand(1,5),
            'title' => "Task $i",
            'assigned_to' => rand(1,20),
            'status' => ['pending','in_progress','completed'][rand(0,2)],
            'priority' => ['low','medium','high'][rand(0,2)],
            'progress' => rand(0,100)
        ]);
    }
}
}

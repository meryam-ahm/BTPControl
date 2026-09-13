<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
    use App\Models\TaskUpdate;

class TaskUpdateSeeder extends Seeder
{

public function run(): void
{
    $notes = ['started','in progress','delayed','completed'];

    for ($i=1; $i<=120; $i++) {
        TaskUpdate::create([
            'task_id' => rand(1,80),
            'progress' => rand(0,100),
            'note' => $notes[array_rand($notes)],
            'updated_by' => rand(1,20)
        ]);
    }
}
}

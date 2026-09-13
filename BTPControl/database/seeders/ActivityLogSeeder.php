<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
  use App\Models\ActivityLog;

class ActivityLogSeeder extends Seeder
{

public function run(): void
{
    $actions = ['created','updated','deleted','assigned'];

    for ($i=1; $i<=120; $i++) {
        ActivityLog::create([
            'project_id' => rand(1,5),
            'user_id' => rand(1,20),
            'entity_type' => 'Task',
            'entity_id' => rand(1,80),
            'action_type' => $actions[array_rand($actions)],
            'message' => "Activity $i"
        ]);
    }
}
}

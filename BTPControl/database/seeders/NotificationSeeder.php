<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
    use App\Models\Notification;

class NotificationSeeder extends Seeder
{

public function run(): void
{
    for ($i=1; $i<=80; $i++) {
        Notification::create([
            'user_id' => rand(1,20),
            'project_id' => rand(1,5),
            'type' => 'task_update',
            'message' => "Notification $i",
            'is_read' => false
        ]);
    }
}
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Database\Seeders\UserSeeder;
use Database\Seeders\ClientSeeder;
use Database\Seeders\ProjectSeeder;
use Database\Seeders\ProjectUserSeeder;
use Database\Seeders\TaskSeeder;
use Database\Seeders\TaskUpdateSeeder;
use Database\Seeders\AttendanceSeeder;
use Database\Seeders\ResourceSeeder;
use Database\Seeders\ReportSeeder;
use Database\Seeders\ReportItemSeeder;
use Database\Seeders\NotificationSeeder;
use Database\Seeders\ChatMessageSeeder;
use Database\Seeders\MediaSeeder;
use Database\Seeders\ActivityLogSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ClientSeeder::class,
            ProjectSeeder::class,
            ProjectUserSeeder::class,
            TaskSeeder::class,
            TaskUpdateSeeder::class,
            AttendanceSeeder::class,
            ResourceSeeder::class,
            ReportSeeder::class,
            ReportItemSeeder::class,
            NotificationSeeder::class,
            ChatMessageSeeder::class,
            MediaSeeder::class,
            ActivityLogSeeder::class,
        ]);
    }
}
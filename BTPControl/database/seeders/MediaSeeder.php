<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
    use App\Models\Media;

class MediaSeeder extends Seeder
{

public function run(): void
{
    for ($i=1; $i<=50; $i++) {
        Media::create([
            'project_id' => rand(1,5),
            'uploaded_by' => rand(1,20),
            'type' => ['photo','document','incident'][rand(0,2)],
            'url' => "file$i.jpg",
            'related_type' => 'task',
            'related_id' => rand(1,80)
        ]);
    }
}
}

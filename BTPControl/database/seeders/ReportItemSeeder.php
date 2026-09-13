<?php

namespace Database\Seeders;
use App\Models\ReportItem;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportItemSeeder extends Seeder
{

public function run(): void
{
    $items = ['cement','steel','fuel','workers'];

    for ($i=1; $i<=100; $i++) {
        ReportItem::create([
            'report_id' => rand(1,20),
            'type' => ['material','equipment','labor'][rand(0,2)],
            'label' => $items[array_rand($items)],
            'value' => rand(1,100)
        ]);
    }
}
}

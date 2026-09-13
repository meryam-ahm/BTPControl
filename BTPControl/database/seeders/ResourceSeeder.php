<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Resource;

class ResourceSeeder extends Seeder
{

public function run(): void
{
    $items = ['Excavator','Crane','Truck','Cement','Steel','Sand'];

    for ($i=1; $i<=60; $i++) {
        Resource::create([
            'project_id' => rand(1,5),
            'type' => ['material','equipment','tool','vehicle'][rand(0,3)],
            'name' => $items[array_rand($items)],
            'quantity' => rand(1,100),
            'status' => 'available'
        ]);
    }
}
}

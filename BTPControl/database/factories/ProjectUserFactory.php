<?php

namespace Database\Factories;
use App\Models\Model;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectUserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'project_id' => Project::inRandomOrder()->value('id'),
            'user_id' => User::inRandomOrder()->value('id'),
            'role_on_proj' => fake()->randomElement([
                'chef_chantier',
                'engineer',
                'worker',
                'supervisor'
            ]),
        ];

    }
}

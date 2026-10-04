<?php

namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
 
class UserFactory extends Factory
{
public function definition(): array
{
    $roles = ['admin', 'site_manager', 'engineer', 'worker', 'supervisor'];

    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'password' => Hash::make('password'),
        'role' => fake()->randomElement($roles),
    ];
}
}

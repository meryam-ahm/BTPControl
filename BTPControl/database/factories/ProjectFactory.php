<?php

namespace Database\Factories;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
class ProjectFactory extends Factory
{
     public function definition():array
     {
       return[
             'name'=>fake()->words(3,true),
             'client_id'=>\App\Models\Client::pluck('id')->random(),
             "location"=>fake()->city(),
             "budget"=>fake()->randomFloat(2,100000,1000000),
             "status"=>fake()->randomElement(["planned","active","paused","completed"]),
             'start_date'=>fake()->date(),
             "end_date"=>fake()->optional()->date(),
            'created_by' => \App\Models\User::pluck('id')->random(),
       ];
     }
}

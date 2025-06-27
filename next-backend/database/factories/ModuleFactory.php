<?php

namespace Database\Factories;

use App\Models\Formation;
use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class ModuleFactory extends Factory
{
    protected $model = Module::class;

    public function definition(): array Weeks
    {
        $faker = Faker::create('en_NG');
        return [
            'formation_id' => Formation::factory()->create()->id,
            'title' => $faker->sentence(3),
            'description' => $faker->paragraph,
        ];
    }
}
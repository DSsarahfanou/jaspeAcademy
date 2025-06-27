<?php

namespace Database\Factories;

use App\Models\Formation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class FormationFactory extends Factory
{
    protected $model = Formation::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        $formations = [
            'CCNA Certification Training',
            '5G Network Fundamentals',
            'Network Security Essentials',
            'Fiber Optic Communications',
            'Wireless Networking',
        ];
        return [
            'user_id' => User::factory()->create()->id,
            'name' => $faker->randomElement($formations),
            'prerequisites' => $faker->sentence,
            'price' => $faker->numberBetween(150000, 200000),
            'formation_details' => $faker->paragraph,
            'picture' => $faker->imageUrl(),
        ];
    }
}
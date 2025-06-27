<?php

namespace Database\Factories;

use App\Models\Equipment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class EquipmentFactory extends Factory
{
    protected $model = Equipment::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'name' => $faker->randomElement([
                'Cisco Router 2900 Series',
                'Fiber Optic Splicer',
                'Network Switch 24-Port',
                'Wireless Access Point',
            ]),
            'price' => $faker->numberBetween(150000, 500000),
            'status' => $faker->randomElement(['available', 'unavailable']),
            'description' => $faker->sentence,
            'details' => $faker->paragraph,
            'picture' => $faker->imageUrl(),
        ];
    }
}
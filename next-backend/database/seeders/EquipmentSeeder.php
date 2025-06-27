<?php

namespace Database\Seeders;

use App\Models\Equipment;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $equipments = [
            [
                'name' => 'Cisco Router 2900 Series',
                'price' => 500000,
                'status' => true,
                'description' => 'High-performance router for enterprise networks.',
                'details' => $faker->paragraph,
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => 'Fiber Optic Splicer',
                'price' => 300000,
                'status' => true,
                'description' => 'Device for splicing fiber optic cables.',
                'details' => $faker->paragraph,
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => 'Network Switch 24-Port',
                'price' => 250000,
                'status' => true,
                'description' => 'Managed switch for network connectivity.',
                'details' => $faker->paragraph,
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => 'Wireless Access Point',
                'price' => 150000,
                'status' => true,
                'description' => 'High-speed wireless access point.',
                'details' => $faker->paragraph,
                'picture' => $faker->imageUrl(),
            ],
        ];

        foreach ($equipments as $equipment) {
            Equipment::create($equipment);
        }
    }
}
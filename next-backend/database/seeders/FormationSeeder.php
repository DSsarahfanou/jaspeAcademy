<?php

namespace Database\Seeders;

use App\Models\Formation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FormationSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $teachers = User::role('teacher')->get();

        $formations = [
            [
                'name' => 'CCNA Certification Training',
                'prerequisites' => 'Basic computer knowledge',
                'price' => 150000,
                'formation_details' => 'Comprehensive training for Cisco Certified Network Associate certification.',
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => '5G Network Fundamentals',
                'prerequisites' => 'Understanding of 4G networks',
                'price' => 200000,
                'formation_details' => 'Introduction to 5G technology and its applications.',
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => 'Network Security Essentials',
                'prerequisites' => 'Basic networking knowledge',
                'price' => 180000,
                'formation_details' => 'Learn to secure networks against cyber threats.',
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => 'Fiber Optic Communications',
                'prerequisites' => 'Basic telecommunications knowledge',
                'price' => 170000,
                'formation_details' => 'Master the principles of fiber optic technology.',
                'picture' => $faker->imageUrl(),
            ],
            [
                'name' => 'Wireless Networking',
                'prerequisites' => 'Networking fundamentals',
                'price' => 160000,
                'formation_details' => 'Explore Wi-Fi technologies and configurations.',
                'picture' => $faker->imageUrl(),
            ],
        ];

        foreach ($formations as $formationData) {
            Formation::create(array_merge($formationData, [
                'user_id' => $teachers->random()->id,
            ]));
        }
    }
}
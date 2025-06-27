<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');

        // Create roles
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'teacher']);
        Role::create(['name' => 'student']);

        // Admin
        $admin = User::create([
            'name' => 'Chukwuemeka',
            'surname' => 'Okonkwo',
            'gender' => 'male',
            'picture' => $faker->imageUrl(),
            'birth_date' => $faker->dateTimeBetween('-40 years', '-25 years')->format('Y-m-d'),
            'address' => $faker->address,
            'phone' => $faker->phoneNumber,
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
        $admin->assignRole('admin');

        // Teachers
        for ($i = 0; $i < 5; $i++) {
            $teacher = User::create([
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'gender' => $faker->randomElement(['male', 'female']),
                'picture' => $faker->imageUrl(),
                'birth_date' => $faker->dateTimeBetween('-50 years', '-30 years')->format('Y-m-d'),
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'),
                'role' => 'teacher',
            ]);
            $teacher->assignRole('teacher');
        }

        // Students
        for ($i = 0; $i < 20; $i++) {
            $student = User::create([
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'gender' => $faker->randomElement(['male', 'female']),
                'picture' => $faker->imageUrl(),
                'birth_date' => $faker->dateTimeBetween('-30 years', '-18 years')->format('Y-m-d'),
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'),
                'role' => 'student',
            ]);
            $student->assignRole('student');
        }
    }
}
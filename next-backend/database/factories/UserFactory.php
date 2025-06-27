<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'name' => $faker->firstName,
            'surname' => $faker->lastName,
            'gender' => $faker->randomElement(['male', 'female']),
            'picture' => $faker->imageUrl(),
            'birth_date' => $faker->dateTimeBetween('-50 years', '-18 years')->format('Y-m-d'),
            'address' => $faker->address,
            'phone' => $faker->phoneNumber,
            'email' => $faker->unique()->safeEmail,
            'password' => bcrypt('password'),
            'role' => $faker->randomElement(['admin', 'teacher', 'student']),
        ];
    }
}
<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'student_id' => User::factory()->create(['user_type' => 'student'])->id,
            'sum' => $faker->numberBetween(150000, 500000),
            'path_facture' => $faker->filePath(),
            'order_status' => $faker->randomElement(['pending', 'completed', 'cancelled']),
        ];
    }
}
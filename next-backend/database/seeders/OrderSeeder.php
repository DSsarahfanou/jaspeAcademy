<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $students = User::role('student')->get();

        foreach ($students as $student) {
            Order::create([
                'student_id' => $student->id,
                'sum' => $faker->numberBetween(150000, 500000),
                'path_facture' => $faker->filePath(),       
                'order_status' => $faker->boolean(80), // 80% de chances que ce soit true (payé)
            ]);
        }
    }
}
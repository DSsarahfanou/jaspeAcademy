<?php

namespace Database\Factories;

use App\Models\EquipmentOrder;
use App\Models\Equipment;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class EquipmentOrderFactory extends Factory
{
    protected $model = EquipmentOrder::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'order_id' => Order::factory()->create()->id,
            'equipment_id' => Equipment::factory()->create()->id,
            'quantity' => $faker->numberBetween(1, 5),
        ];
    }
}
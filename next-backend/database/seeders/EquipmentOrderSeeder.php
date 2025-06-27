<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\Order;
use App\Models\EquipmentOrder;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class EquipmentOrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $orders = Order::all();
        $equipments = Equipment::all();

        foreach ($orders as $order) {
            $randomEquipments = $equipments->random(rand(1, 2));
            foreach ($randomEquipments as $equipment) {
                EquipmentOrder::create([
                    'order_id' => $order->id,
                    'equipment_id' => $equipment->id,
                    'quantity' => $faker->numberBetween(1, 5),
                ]);
            }
        }
    }
}
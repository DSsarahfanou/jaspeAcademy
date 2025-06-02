<?php


// OrderDetailSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        DB::table('order_details')->insert([
            [
                'order_id' => 1,
                'equipment_id' => 1, // Dell XPS 13
                'formation_id' => null,
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'equipment_id' => 2, // MacBook Pro
                'formation_id' => null,
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 3,
                'equipment_id' => null,
                'formation_id' => 1, // Formation Développement Web
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1,
                'equipment_id' => 4, // Écran 4K Samsung
                'formation_id' => null,
                'quantity' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2,
                'equipment_id' => 3, // Tablette Wacom
                'formation_id' => null,
                'quantity' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

?>
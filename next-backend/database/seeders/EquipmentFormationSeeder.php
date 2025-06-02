<?php


// EquipmentFormationSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentFormationSeeder extends Seeder
{
    public function run()
    {
        DB::table('equipments_formations')->insert([
            // Équipements pour Formation 1 (Développement Web)
            [
                'equipment_id' => 1, // Dell XPS 13
                'formation_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 4, // Écran 4K
                'formation_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 6, // Caméra Logitech
                'formation_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Équipements pour Formation 2 (Laravel/PHP)
            [
                'equipment_id' => 1, // Dell XPS 13
                'formation_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 2, // MacBook Pro
                'formation_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 4, // Écran 4K
                'formation_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Équipements pour Formation 3 (React.js)
            [
                'equipment_id' => 1, // Dell XPS 13
                'formation_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 2, // MacBook Pro
                'formation_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 5, // Casque Sony
                'formation_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Équipements pour Formation 4 (Design)
            [
                'equipment_id' => 2, // MacBook Pro (meilleur pour design)
                'formation_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 3, // Tablette Wacom
                'formation_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'equipment_id' => 4, // Écran 4K
                'formation_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}


?>
<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\Formation;
use Illuminate\Database\Seeder;

class EquipmentFormationSeeder extends Seeder
{
    /**
     * Exécuter le seeder.
     */
    public function run(): void
    {
        $formations = Formation::all();
        $equipments = Equipment::all();

        foreach ($formations as $formation) {
            $formation->equipments()->attach($equipments->random(2)->pluck('id')->toArray());
        }
    }
}
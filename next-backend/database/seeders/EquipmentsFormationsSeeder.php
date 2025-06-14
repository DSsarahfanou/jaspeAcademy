<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EquipmentsFormationsSeeder extends Seeder
{
    public function run()
    {
        // Vider la table avant d'insérer
        Schema::disableForeignKeyConstraints();
        DB::table('equipments_formations')->truncate();
        Schema::enableForeignKeyConstraints();

        // Données d'exemple (ids fictifs à adapter selon ta base réelle)
        $data = [
            // Formation 1 : Développement web
            ['formation_id' => 1, 'equipment_id' => 1],
            ['formation_id' => 1, 'equipment_id' => 2],

            // Formation 2 : Les bases du backend
            ['formation_id' => 2, 'equipment_id' => 2],
            ['formation_id' => 2, 'equipment_id' => 3],

            // Formation 3 : Graphisme
            ['formation_id' => 3, 'equipment_id' => 4],
            ['formation_id' => 3, 'equipment_id' => 5],

            // Formation 4 : Photoshop
            ['formation_id' => 4, 'equipment_id' => 4],
            ['formation_id' => 4, 'equipment_id' => 6],
        ];

        DB::table('equipments_formations')->insert($data);
    }
}

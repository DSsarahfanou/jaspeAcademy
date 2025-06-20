<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            UserSeeder::class,
            FormationSeeder::class,
            ModuleSeeder::class,
            LessonSeeder::class,
            EquipmentSeeder::class,
            OrderSeeder::class,
            OrderDetailSeeder::class,
            RequestCourseSeeder::class,
            EquipmentFormationSeeder::class,
            EquipmentsFormationsSeeder::class,
            FormationStudentSeeder::class,
        ]);
    }
}

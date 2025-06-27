<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            FormationSeeder::class,
            ModuleSeeder::class,
            LessonSeeder::class,
            EquipmentSeeder::class,
            EquipmentFormationSeeder::class,
            FormationStudentSeeder::class,
            OrderSeeder::class,
            EquipmentOrderSeeder::class,
            QuizSeeder::class,
            QuestionSeeder::class,
            OptionSeeder::class,
        ]);
    }
}
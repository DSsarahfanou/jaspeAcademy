<?php 

// FormationSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormationSeeder extends Seeder
{
    public function run()
    {
        DB::table('formations')->insert([
            [
                'prerequisites' => 'Niveau débutant, aucune expérience requise',
                'price' => 50000,
                'formation_details' => 'Formation complète en développement web moderne avec HTML, CSS, JavaScript et introduction aux frameworks.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'prerequisites' => 'Connaissances de base en programmation',
                'price' => 75000,
                'formation_details' => 'Maîtrisez Laravel et PHP pour développer des applications web robustes et sécurisées.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'prerequisites' => 'Expérience en HTML/CSS recommandée',
                'price' => 60000,
                'formation_details' => 'Apprenez React.js et créez des interfaces utilisateur modernes et interactives.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'prerequisites' => 'Aucun prérequis',
                'price' => 40000,
                'formation_details' => 'Introduction au design graphique avec Photoshop et Illustrator.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}



?>
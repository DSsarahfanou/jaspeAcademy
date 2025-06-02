<?php

// ModuleSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleSeeder extends Seeder
{
    public function run()
    {
        DB::table('modules')->insert([
            // Modules pour Formation 1 (Développement Web)
            [
                'formation_id' => 1,
                'title' => 'Introduction au HTML',
                'description' => 'Bases du langage HTML et structure des pages web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => 1,
                'title' => 'CSS et Design',
                'description' => 'Stylisation des pages web avec CSS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => 1,
                'title' => 'JavaScript Fondamentaux',
                'description' => 'Programmation JavaScript côté client',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Modules pour Formation 2 (Laravel/PHP)
            [
                'formation_id' => 2,
                'title' => 'PHP Avancé',
                'description' => 'Concepts avancés de PHP orienté objet',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => 2,
                'title' => 'Laravel Framework',
                'description' => 'Développement avec le framework Laravel',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => 2,
                'title' => 'Base de données et Eloquent',
                'description' => 'Gestion des données avec Eloquent ORM',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Modules pour Formation 3 (React.js)
            [
                'formation_id' => 3,
                'title' => 'React Basics',
                'description' => 'Composants et JSX en React',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => 3,
                'title' => 'State Management',
                'description' => 'Gestion d\'état avec hooks et Redux',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Modules pour Formation 4 (Design)
            [
                'formation_id' => 4,
                'title' => 'Photoshop Essentials',
                'description' => 'Retouche photo et création graphique',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'formation_id' => 4,
                'title' => 'Illustrator Vector',
                'description' => 'Création de logos et illustrations vectorielles',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
?>
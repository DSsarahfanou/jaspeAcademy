<?php


// LessonSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonSeeder extends Seeder
{
    public function run()
    {
        DB::table('lessons')->insert([
            // Leçons pour Module 1 (HTML)
            [
                'module_id' => 1,
                'title' => 'Structure HTML de base',
                'contents' => 'Introduction aux balises HTML essentielles : html, head, body, titre, paragraphes...',
                'video' => 'videos/html/lesson1.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_id' => 1,
                'title' => 'Formulaires HTML',
                'contents' => 'Création de formulaires interactifs avec input, textarea, select...',
                'video' => 'videos/html/lesson2.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Leçons pour Module 2 (CSS)
            [
                'module_id' => 2,
                'title' => 'Sélecteurs CSS',
                'contents' => 'Comprendre les différents types de sélecteurs CSS et leur priorité',
                'video' => 'videos/css/lesson1.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_id' => 2,
                'title' => 'Flexbox et Grid',
                'contents' => 'Mise en page moderne avec Flexbox et CSS Grid',
                'video' => 'videos/css/lesson2.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Leçons pour Module 3 (JavaScript)
            [
                'module_id' => 3,
                'title' => 'Variables et fonctions',
                'contents' => 'Déclaration de variables et création de fonctions en JavaScript',
                'video' => 'videos/js/lesson1.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_id' => 3,
                'title' => 'DOM Manipulation',
                'contents' => 'Interaction avec les éléments HTML via JavaScript',
                'video' => 'videos/js/lesson2.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Leçons pour Module 4 (PHP Avancé)
            [
                'module_id' => 4,
                'title' => 'Classes et Objets',
                'contents' => 'Programmation orientée objet en PHP : classes, propriétés, méthodes',
                'video' => 'videos/php/lesson1.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Leçons pour Module 5 (Laravel)
            [
                'module_id' => 5,
                'title' => 'Routes et Contrôleurs',
                'contents' => 'Configuration des routes et création de contrôleurs Laravel',
                'video' => 'videos/laravel/lesson1.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_id' => 5,
                'title' => 'Models et Relations',
                'contents' => 'Création de modèles Eloquent et définition des relations',
                'video' => 'videos/laravel/lesson2.mp4',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}



?>
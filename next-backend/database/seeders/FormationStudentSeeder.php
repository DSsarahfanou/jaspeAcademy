<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Formation;
use App\Models\User;
use App\Models\FormationStudent;

class FormationStudentSeeder extends Seeder
{
    public function run(): void
    {
        $studentIds = [1, 6, 9, 10, 14, 18, 20];
        
        // Récupère toutes les formations existantes
        $formations = Formation::all();

        foreach ($studentIds as $studentId) {
            // Chaque étudiant suivra 1 à 3 formations aléatoires
            $formationsToAttach = $formations->random(rand(1, min(3, $formations->count())));

            foreach ($formationsToAttach as $formation) {
                // Évite les doublons si le seeder est relancé
                FormationStudent::firstOrCreate([
                    'formation_id' => $formation->id,
                    'student_id' => $studentId,
                ]);
            }
        }
    }
}

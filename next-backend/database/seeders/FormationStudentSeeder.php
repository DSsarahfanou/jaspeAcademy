<?php

namespace Database\Seeders;

use App\Models\Formation;
use App\Models\User;
use App\Models\FormationStudent;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FormationStudentSeeder extends Seeder
{
    /**
     * Exécuter le seeder.
     */
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $students = User::role('student')->get();
        $formations = Formation::all();

        foreach ($students as $student) {
            $randomFormations = $formations->random(rand(1, 3));
            foreach ($randomFormations as $formation) {
                FormationStudent::create([
                    'formation_id' => $formation->id,
                    'student_id' => $student->id,
                    'progression' => $faker->numberBetween(0, 100),
                    'score' => $faker->numberBetween(50, 100),
                    'attestation' => $faker->boolean,
                    'path_paiement' => $faker->filePath(),
                    'request_internership' => $faker->boolean(30) ? '/storage/internship_requests/request_' . $faker->uuid . '.pdf' : null, // 30% de chance d'avoir un PDF
                    'request_status' => $faker->randomElement(['pending', 'approved', 'rejected', null]),
                ]);
            }
        }
    }
}
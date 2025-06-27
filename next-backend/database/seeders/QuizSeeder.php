<?php

namespace Database\Seeders;

use App\Models\Formation;
use App\Models\Quiz;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $formations = Formation::all();

        foreach ($formations as $formation) {
            for ($i = 1; $i <= 2; $i++) {
                Quiz::create([
                    'formation_id' => $formation->id,
                    'title' => "Quiz {$i} for {$formation->name}",
                ]);
            }
        }
    }
}
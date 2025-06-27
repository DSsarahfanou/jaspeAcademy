<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $quizzes = Quiz::all();

        foreach ($quizzes as $quiz) {
            for ($i = 1; $i <= 5; $i++) {
                Question::create([
                    'quiz_id' => $quiz->id,
                    'title' => $faker->sentence(6),
                    'point' => $faker->numberBetween(0, 20),

                ]);
            }
        }
    }
}
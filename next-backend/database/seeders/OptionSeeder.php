<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Option;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OptionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $questions = Question::all();

        foreach ($questions as $question) {
            for ($i = 1; $i <= 4; $i++) {
                Option::create([
                    'question_id' => $question->id,
                    'title' => $faker->word,
                    'answer' => $i === 1, // One correct answer per question
                ]);
            }
        }
    }
}
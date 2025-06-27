<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class QuestionFactory extends Factory
{
    protected $model = Question::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'quiz_id' => Quiz::factory()->create()->id,
            'title' => $faker->sentence(6),
        ];
    }
}
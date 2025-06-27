<?php

namespace Database\Factories;

use App\Models\Quiz;
use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class QuizFactory extends Factory
{
    protected $model = Quiz::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'formation_id' => Formation::factory()->create()->id,
            'title' => $faker->sentence(4),
        ];
    }
}
<?php

namespace Database\Factories;

use App\Models\Option;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class OptionFactory extends Factory
{
    protected $model = Option::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'question_id' => Question::factory()->create()->id,
            'title' => $faker->word,
            'answer' => $faker->boolean(25), // 25% chance of being correct
        ];
    }
}
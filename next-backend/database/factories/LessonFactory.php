<?php

namespace Database\Factories;

use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'module_id' => Module::factory()->create()->id,
            'title' => $faker->sentence(4),
            'contents' => $faker->paragraphs(3, true),
        ];
    }
}
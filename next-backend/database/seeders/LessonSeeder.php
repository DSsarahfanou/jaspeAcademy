<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('en_NG');
        $modules = Module::all();

        foreach ($modules as $module) {
            for ($i = 1; $i <= 3; $i++) {
                Lesson::create([
                    'module_id' => $module->id,
                    'title' => "Lesson {$i}: {$module->title}",
                    'contents' => $faker->paragraphs(3, true),
                ]);
            }
        }
    }
}
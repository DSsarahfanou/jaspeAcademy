<?php

namespace Database\Factories;

use App\Models\FormationStudent;
use App\Models\Formation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

class FormationStudentFactory extends Factory
{
    protected $model = FormationStudent::class;

    public function definition(): array
    {
        $faker = Faker::create('en_NG');
        return [
            'formation_id' => Formation::factory()->create()->id,
            'student_id' => User::factory()->create(['user_type' => 'student'])->id,
            'status' => $faker->randomElement(['enrolled', 'in_progress', 'completed']),
            'progression' => $faker->numberBetween(0, 100),
            'score' => $faker->numberBetween(50, 100),
            'attestation' => $faker->boolean,
            'path_paiement' => $faker->filePath(),
            'request_internership' => $faker->boolean(30) ? '/storage/internship_requests/request_' . $faker->uuid . '.pdf' : null, // 30% de chance d'avoir un PDF
            'request_status' => $faker->randomElement(['pending', 'approved', 'rejected', null]),
  
        ];
    }
}
<?php

namespace Database\Factories;

use App\Models\EquipmentFormation;
use App\Models\Equipment;
use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipmentFormationFactory extends Factory
{
    protected $model = EquipmentFormation::class;

    public function definition(): array
    {
        return [
            'formation_id' => Formation::factory()->create()->id,
            'equipment_id' => Equipment::factory()->create()->id,
        ];
    }
}
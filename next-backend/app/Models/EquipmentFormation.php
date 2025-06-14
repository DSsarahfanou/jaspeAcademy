<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EquipmentFormation extends Model
{
    use HasFactory;

    protected $table = 'equipments_formations';

    protected $fillable = [
        'formation_id',
        'equipment_id',
    ];

    /**
     * Une relation vers la formation liée.
     */
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    /**
     * Une relation vers l’équipement lié.
     */
    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}

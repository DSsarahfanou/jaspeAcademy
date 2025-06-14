<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Equipments_Formations extends Model
{

    use HasFactory;

    protected $table = 'equipment_formation';

    protected $fillable = [
        'formation_id',
        'equipment_id',
    ];
    //
    public function orders()
    {
        return
            $this->belongsToMany(Order::class);
    }

    //Les formations associés au pivot

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    // Les equipemants associés au pivot
    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}

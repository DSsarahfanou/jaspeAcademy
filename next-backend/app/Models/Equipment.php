<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity',
        'price',
        'status',
    ];
    //
    public function formations()
    {
        return $this->belongsToMany(Formation::class, 'equipments_formations', 'equipment_id', 'formation_id');
    }
}

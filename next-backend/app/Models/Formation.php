<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Formation extends Model
{

    use HasFactory;

    protected $fillable = [
        'prerequisites',
        'price',
        'formation_details',
    ];
    public function students()
    {
        return
            $this->belongsToMany(Student::class);
    }

    public function teachers()
    {
        return
            $this->belongsToMany(Teacher::class);
    }


    public function equipments()
    {
        return
            $this->belongsToMany(Equipment::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
    public function equipment()
    {
        return $this->belongsToMany(Equipment::class, 'equipment_formation', 'formation_id', 'equipment_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

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
        return $this->belongsToMany(Equipment::class, 'equipments_formations');
    }
}





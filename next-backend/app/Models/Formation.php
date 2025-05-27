<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Formation extends Model
{
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
}

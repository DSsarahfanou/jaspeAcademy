<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormationStudent extends Model
{
    protected $fillable = [
        'formation_id',
        'student_id',
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class, 'formation_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}

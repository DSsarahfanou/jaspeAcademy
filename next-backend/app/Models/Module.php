<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id',
        'title',
        'description',
    ];

    /**
     * Get the formation that owns the module.
     */
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    //relation: un module contient plusieurs lesson

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
}

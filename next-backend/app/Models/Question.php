<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory;

        protected $fillable = [
        'quiz_id',
        'title',
    ];


    // Début :
    // Ajout de la relation entre Question et Quiz : 
    // Signification :  Un quiz contient zero ou plusieurs questions. 
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
    //Fin



    // Début :
    // Ajout de la relation entre  Question et Options: 
    // Signification :  Un question contient zero ou plusieurs options. 
    public function options()
    {
        return $this->hasMany(Option::class);
    }
    //Fin
}

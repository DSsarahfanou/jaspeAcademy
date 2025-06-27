<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

        protected $fillable = [
        'formation_id',
        'title',
    ];


    // Début :
    // Ajout de la relation entre Formation et Quiz : 
    // Signification :  Une formation contient zero ou plusieurs quizzes. 
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
    //Fin



    // Début :
    // Ajout de la relation entre  Quiz et Question : 
    // Signification :  Un quiz contient zero ou plusieurs questions. 
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    //Fin
}

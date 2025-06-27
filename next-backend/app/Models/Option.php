<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    /** @use HasFactory<\Database\Factories\OptionFactory> */
    use HasFactory;

    protected $fillable = [
        'question_id',
        'title',
        'answer',
    ];



    // Début :
    // Ajout de la relation entre  Question et Options: 
    // Signification :  Un question contient zero ou plusieurs options. 
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
    //Fin
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    /** @use HasFactory<\Database\Factories\MeetingFactory> */
    use HasFactory;

        protected $fillable = [
        'formation_id',
        'link',
        'status',
        'date',
    ];


    // Début :
    // Ajout de la relation entre  FormationStudent et Meetings: 
    // Signification :  Une FormationStudent contient zero ou plusieurs Meetings. 
    public function formationStudent()
    {
        return $this->hasMany(Meeting::class);
    }
    //Fin
}

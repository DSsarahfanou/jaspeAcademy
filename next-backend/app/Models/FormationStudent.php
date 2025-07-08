<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormationStudent extends Model
{
    protected $fillable = [
        'formation_id',
        'student_id',
        'progression',
        'completed_lessons',
        'score',
        'attestation',
        'path_paiement',
        'request_internership',
        'request_status',

    ];

         protected $casts = [
        'completed_lessons' => 'array', // Laravel traite automatiquement le JSON comme un tableau
    ];

        public function formation()
        {
            return $this->belongsTo(Formation::class, 'formation_id');
        }

        public function student()
        {
            return $this->belongsTo(User::class, 'student_id');
        }

        // Début :
        // Ajout de la relation entre  FormationStudent et Meetings: 
        // Signification :  Une FormationStudent contient zero ou plusieurs Meetings. 
        public function meetings()
        {
            return $this->hasMany(Meeting::class);
        }
        //Fin

    }



    
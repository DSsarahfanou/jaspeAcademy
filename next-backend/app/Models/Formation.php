<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Formation extends Model
{
    // Début
    // L'ajout des attributs dans le $fillable permet de spécifier les champs de la migration
    // dasn lesquels on peut faire le CRUD 
    // liée au Model actuel .
    use HasFactory;

    protected $fillable = [
        'prerequisites',
        'price',
        'formation_details',
    ];

    // Fin


    // Début : 
    // Tu as déjà créée ces relations. Je n'ai pas étudié la valabilité de leur présence
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

    //Fin


    // Début :
    // Ajout de la relation entre Formation et Module : 
    // Signification :  Une formation contient zero ou plusieurs modules. 
    public function modules()
    {
        return $this->hasMany(Module::class);
    }
    //Fin

    // Début :
    // Ajout de la relation entre Formation et Equipement : 
    // Signification :  Une formation peut concerner une ou plusieurs équipements. 

    public function equipment()
    {
        return $this->belongsToMany(Equipment::class, 'equipment_formation', 'formation_id', 'equipment_id');
    }
    // Fin : 
}

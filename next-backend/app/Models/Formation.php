<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;

class Formation extends Model
{
    // Début
    // L'ajout des attributs dans le $fillable permet de spécifier les champs de la migration
    // dasn lesquels on peut faire le CRUD 
    // liée au Model actuel .
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'prerequisites',
        'price',
        'formation_details',
        'picture', 
    ];

    // Fin


    public function students()
    {
        return
            $this->belongsToMany(Student::class);
    }



    public function teachers()
    {
        return $this->belongsTo(User::class, 'user_id');
    }



    /**
     * L'enseignant (teacher) qui anime la formation.
     */
    // public function teacher(): BelongsTo
    // {
    //     return $this->belongsTo(User::class, 'user_id'); // 'user_id' est la clé étrangère dans la table `formations`
    //         ->whereHas('roles', fn($query) => $query->where('name', 'teacher'));
    //         // Optionnel : s'assurer que le user a bien le rôle "teacher"
    // }

    /**
     * Les étudiants (students) qui suivent la formation.
     */
    // public function students(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'formation_student', 'formation_id', 'user_id')
    //         ->whereHas('roles', fn($query) => $query->where('name', 'student'))
    //         ->withPivot('progress', 'enrolled_at'); // Exemple de champs supplémentaires
    // }

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

    public function equipments()
    {
        return $this->belongsToMany(Equipment::class, 'equipments_formations', 'formation_id', 'equipment_id');
    }
    
    
    // Fin : 



    // Début :
    // Ajout de la relation entre Formation et Quiz : 
    // Signification :  Une formation contient zero ou plusieurs quizzes. 
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
    //Fin
}





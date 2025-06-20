<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name', 
        'surname',
        'gender',
        'picture',
        'birth_date',
        'address',
        'phone',
        'email',
        'password', 
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    //     public function userable(): MorphTo
    // {
    //     return $this->morphTo();
    // }
    // public function getProfileAttribute()
    // {
    //     return $this->userable;
    // }




    public function studentFormations()
    {
        // Pour les users de type student
        return $this->belongsToMany(Formation::class, 'formation_students', 'student_id', 'formation_id');
    }

    public function teacherFormations()
    {
        // Pour les users de type teacher
        return $this->hasMany(Formation::class, 'teacher_id');
    }



    // public function formations()
    // {
    //     return $this->hasMany(Formation::class, 'user_id');
    // }



    public function profile()
    {
        switch($this->user_type) {
            case 'student': return $this->hasOne(Student::class, 'user_id');
            case 'teacher': return $this->hasOne(Teacher::class, 'user_id');
            case 'admin': return $this->hasOne(Admin::class, 'user_id');
            default: return null;
        }
    }

    // public function getPictureUrlAttribute()
    // {
    //     return $this->picture ? asset('storage/' . $this->picture) : null;
    // }


    public function getProfileAttribute()
    {
        return $this->profile();
    }
}

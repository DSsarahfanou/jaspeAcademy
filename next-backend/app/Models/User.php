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
        'address',
        'picture',
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

    public function formations()
    {
        return $this->belongsToMany(Formation::class);
    }

    public function profile()
    {
        switch($this->user_type) {
            case 'student': return $this->hasOne(Student::class, 'user_id');
            case 'teacher': return $this->hasOne(Teacher::class, 'user_id');
            case 'admin': return $this->hasOne(Admin::class, 'user_id');
            default: return null;
        }
    }


    public function hasPermissionAdmin()
    {
        return $this->role == 'admin';
    }

    public function hasPermissionTeacher()
    {
        return $this->role == 'teacher';
    }

    public function hasPermissionStudent()
    {
        return $this->role == 'student';
    }



    public function getProfileAttribute()
    {
        return $this->profile();
    }
}

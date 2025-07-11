<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Meeting.php

class Meeting extends Model
{
    protected $fillable = [
        'formation_id',
        'teacher_id',
        'progression_level',
        'scheduled_at',
        'room_link',
    ];

    public function formation() {
        return $this->belongsTo(Formation::class);
    }

    public function teacher() {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function students() {
        return $this->belongsToMany(User::class, 'meeting_student', 'meeting_id', 'student_id')
                    ->withPivot('has_attended')
                    ->withTimestamps();
    }
}


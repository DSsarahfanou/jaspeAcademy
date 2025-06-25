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
}

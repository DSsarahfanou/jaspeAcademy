<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestCourse extends Model
{
    // 
    protected $fillable = [
        'path_pdf',
        'status',
    ];
}

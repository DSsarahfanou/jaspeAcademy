<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    //
    use HasFactory;
    protected $table = 'equipments';



    protected $fillable = [
        'name',
        'quantity',
        'price',
        'status',
        'description',
        'details',
        'image',
    ];
    public function formations()
    {

        return $this->belongsToMany(Formation::class, 'equipments_formations');
    }
}

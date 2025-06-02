<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'sum',
        'path_facture',
        'order_status',
    ];

    public function equipments_formations()
    {
        return $this->belongsToMany(Equipments_Formations::class);
    }
}

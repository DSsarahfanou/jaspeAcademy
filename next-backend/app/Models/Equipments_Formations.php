<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipments_Formations extends Model
{
    //
    public function orders()
    {
        return
            $this->belongsToMany(Order::class);
    }
}

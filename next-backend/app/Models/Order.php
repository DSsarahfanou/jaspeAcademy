<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    public function equipments_formations()
    {
        return
            $this->belongsToMany(Equipments_Formations::class);
    }
}

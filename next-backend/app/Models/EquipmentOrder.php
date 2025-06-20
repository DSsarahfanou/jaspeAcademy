<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentOrder extends Model
{
    //
            protected $fillable = [
            'order_id',
            'equipment_id',
            'quantity',
    ];

    public function equiment()
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}

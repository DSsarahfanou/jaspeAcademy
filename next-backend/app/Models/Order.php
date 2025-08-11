<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'sum',
        'path_facture',
        'order_status',
    ];

    // public function equipments_orders()
    // {
    //     return $this->belongsToMany(EquipmentFormation::class, 'equipment_orders', 'equipment_id', 'order_id');
    // }

    // Order.php
        public function equipment_orders()
        {
            return $this->hasMany(EquipmentOrder::class, 'order_id');
        }

        // Order.php
        public function student()
        {
            return $this->belongsTo(User::class, 'student_id');
        }


}
 
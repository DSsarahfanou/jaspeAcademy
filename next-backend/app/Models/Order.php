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

    public function equipments_orders()
    {
        return $this->belongsToMany(EquipmentFormation::class, 'equipment_orders', 'equipment_id', 'order_id');
    }
}
 
<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Equipment extends Model
{
    use HasFactory;
    protected $table = 'equipments';

    protected $fillable = [
    'name',
    'quantity',
    'price',
    'status',
    'description',
    'details',
    'picture',
    ];


    // Traduction de la relation : Un equipemant  fait partir de zero ou plusieurs formations
    public function formations()
    {
        return $this->belongsToMany(Formation::class, 'equipments_formations', 'equipment_id', 'formation_id');
    }

    
    public function equipments_formations()
    {
        return $this->belongsToMany(EquipmentFormation::class, 'equipment_orders', 'equipment_id', 'order_id');
    }



    public function equipments_orders()
    {
        return $this->belongsToMany(EquipmentFormation::class, 'equipment_orders', 'equipment_id', 'order_id');
    }

}

<?php

// EquipmentSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentSeeder extends Seeder
{
    public function run()
    {
        DB::table('equipments')->insert([
            [
                'name' => 'Ordinateur Portable Dell XPS 13',
                'picture' => 'images/equipments/pc.jpg',
                'quantity' => 15,
                'price' => 800000,
                'status' => true,
                'description' => 'Ordinateur portable haute performance pour développement',
                'details' => 'Intel Core i7, 16GB RAM, 512GB SSD, écran 13.3" Full HD',
                'image' => 'images/equipments/dell-xps13.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MacBook Pro 14"',
                'picture' => 'images/equipments/pc2.jpg',
                'quantity' => 8,
                'price' => 1200000,
                'status' => true,
                'description' => 'MacBook Pro pour développement iOS et design',
                'details' => 'Apple M2 Pro, 16GB RAM, 1TB SSD, écran Retina 14.2"',
                'image' => 'images/equipments/macbook-pro.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tablette Graphique Wacom',
                'picture' => 'images/equipments/pc3.jpg',
                'quantity' => 20,
                'price' => 150000,
                'status' => true,
                'description' => 'Tablette graphique pour design et illustration',
                'details' => 'Wacom Intuos Pro Medium, stylet inclus, surface de travail 224x148mm',
                'image' => 'images/equipments/wacom-intuos.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Écran 4K Samsung',
                'picture' => 'images/equipments/pc4.jpg',
                'quantity' => 12,
                'price' => 300000,
                'status' => true,
                'description' => 'Moniteur 4K pour développement et design',
                'details' => '27 pouces, résolution 3840x2160, USB-C, réglable en hauteur',
                'image' => 'images/equipments/samsung-4k.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Casque Audio Sony WH-1000XM4',
                'picture' => 'images/equipments/pc5.jpg',
                'quantity' => 25,
                'price' => 80000,
                'status' => true,
                'description' => 'Casque noise-cancelling pour concentration',
                'details' => 'Réduction de bruit active, autonomie 30h, Bluetooth 5.0',
                'image' => 'images/equipments/sony-headphones.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Caméra Logitech C920',
                'picture' => 'images/equipments/pc6.jpg',
                'quantity' => 30,
                'price' => 45000,
                'status' => false,
                'description' => 'Webcam HD pour cours en ligne',
                'details' => 'Full HD 1080p, autofocus, microphone intégré',
                'image' => 'images/equipments/logitech-c920.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

?>
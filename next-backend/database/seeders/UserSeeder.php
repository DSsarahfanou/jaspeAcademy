<?php


// UserSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Jean',
                'surname' => 'Dupont',
                'gender' => 'M',
                'picture' => 'images/users/jean_dupont.jpg',
                'birth_date' => '1990-05-15',
                'address' => '123 Rue de la Paix, Cotonou, Bénin',
                'phone' => '+22996123456',
                'email' => 'jean.dupont@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'student',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Marie',
                'surname' => 'Martin',
                'gender' => 'F',
                'picture' => 'images/users/marie_martin.jpg',
                'birth_date' => '1988-12-03',
                'address' => '456 Avenue de l\'Indépendance, Porto-Novo, Bénin',
                'phone' => '+22997234567',
                'email' => 'marie.martin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pierre',
                'surname' => 'Dubois',
                'gender' => 'M',
                'picture' => null,
                'birth_date' => '1995-08-22',
                'address' => '789 Boulevard Saint-Michel, Parakou, Bénin',
                'phone' => '+22998345678',
                'email' => 'pierre.dubois@example.com',
                'email_verified_at' => null, // Email non vérifié
                'password' => Hash::make('password123'),
                'role' => 'student',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fatou',
                'surname' => 'Kone',
                'gender' => 'F',
                'picture' => 'images/users/fatou_kone.jpg',
                'birth_date' => '1992-03-10',
                'address' => '321 Rue des Cocotiers, Ouidah, Bénin',
                'phone' => '+22999456789',
                'email' => 'fatou.kone@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kofi',
                'surname' => 'Adjovi',
                'gender' => 'M',
                'picture' => 'images/users/kofi_adjovi.jpg',
                'birth_date' => '1987-11-18',
                'address' => '654 Quartier Zongo, Natitingou, Bénin',
                'phone' => '+22990567890',
                'email' => 'kofi.adjovi@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'teacher',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Aïcha',
                'surname' => 'Biokou',
                'gender' => 'F',
                'picture' => null,
                'birth_date' => '1993-07-05',
                'address' => '987 Rue de la République, Abomey, Bénin',
                'phone' => '+22991678901',
                'email' => 'aicha.biokou@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'student',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Admin',
                'surname' => 'System',
                'gender' => 'M',
                'picture' => 'images/users/admin.jpg',
                'birth_date' => '1985-01-01',
                'address' => '000 Centre Administratif, Cotonou, Bénin',
                'phone' => '+22900000000',
                'email' => 'admin@system.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'role' => 'super_admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

?>
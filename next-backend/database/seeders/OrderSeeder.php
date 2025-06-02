<?php
// OrderSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run()
    {
        DB::table('orders')->insert([
            [
                'sum' => 1100000, // Dell XPS 13 + Écran 4K
                'user_id' => 1,
                'path_facture' => 'invoices/order_001.pdf',
                'order_status' => 1, // 1 = confirmé, 0 = en attente
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sum' => 1500000, // MacBook Pro + 2 Tablettes Wacom
                'user_id' => 2,
                'path_facture' => 'invoices/order_002.pdf',
                'order_status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sum' => 50000, // Formation Développement Web
                'user_id' => 3,
                'path_facture' => 'invoices/order_003.pdf',
                'order_status' => 0, // En attente de paiement
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

?>
<?php
// RequestCourseSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequestCourseSeeder extends Seeder
{
    public function run()
    {
        DB::table('request_courses')->insert([
            [
                'user_id' => 1,
                'path_pdf' => 'requests/request_001.pdf',
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'path_pdf' => 'requests/request_002.pdf',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'path_pdf' => 'requests/request_003.pdf',
                'status' => 'rejected',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}

?>
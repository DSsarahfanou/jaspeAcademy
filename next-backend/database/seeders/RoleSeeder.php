<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $admin = Role::create(['name' => 'admin']);
        $student = Role::create(['name' => 'student']);
        $teacher = Role::create(['name' => 'teacher']);

        $view = Permission::create(['name' => 'view dashboard']);

        $admin->givePermissionTo([$view]);
    }
}

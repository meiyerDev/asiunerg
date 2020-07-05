<?php

use App\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();
        DB::table('permissions')->delete();
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        /* Usuarios */
        Permission::create(['name' => 'user.index']);
        Permission::create(['name' => 'user.store']);
        Permission::create(['name' => 'user.show']);
        Permission::create(['name' => 'user.update']);
        Permission::create(['name' => 'user.destroy']);

        /* Teacher */
        Permission::create(['name' => 'teacher.index']);
        Permission::create(['name' => 'teacher.store']);
        Permission::create(['name' => 'teacher.show']);
        Permission::create(['name' => 'teacher.update']);
        Permission::create(['name' => 'teacher.destroy']);

		/* Role */
        $teacher = Role::create(['name' => 'Teacher']);
        $student = Role::create(['name' => 'Student']);
    }
}

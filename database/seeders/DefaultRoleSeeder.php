<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
class DefaultRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name'=> 'Team Member']);
        // project
        Permission::create([
            'name' => 'project:read',
            'group'=> 'project'
        ]);
        Permission::create([
            'name' => 'project:create',
            'group'=> 'project'
        ]);
        Permission::create([
            'name' => 'project:edit',
            'group'=> 'project'
        ]);
        Permission::create([
            'name' => 'project:delete',
            'group'=> 'project'
        ]);
        // Task
        Permission::create([
            'name' => 'task:read',
            'group'=> 'task'
        ]);
        Permission::create([
            'name' => 'task:create',
            'group'=> 'task'
        ]);
        Permission::create([
            'name' => 'task:edit',
            'group'=> 'task'
        ]);
        Permission::create([
            'name' => 'task:delete',
            'group'=> 'task'
        ]);
        // Team Members
        Permission::create([
            'name' => 'task:manage',
            'group'=> 'team-member'
        ]);
    }
}

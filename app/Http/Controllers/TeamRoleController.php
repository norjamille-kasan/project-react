<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TeamRoleController extends Controller
{
    public function index(Team $team)
    {
        abort_unless($team->id, session('scope_team_id'),404);

        return Inertia::render('TeamSetting/Roles',[
            'permissions'=> fn() => Permission::get(),
            'roles'=> fn() => Role::whereTeamId($team->id)->get()
        ]);
    }

    public function store( Request $request)
    {
        $request->validate([
            'team_id'=>['required'],
            'name'=>['required'],
            'permissions.*' => ['required']
        ]);

        $role = Role::create(['name'=> $request->name,'team_id'=> $request->team_id]);

        $role->givePermissionTo(...$request->permissions);

        return back();
    }
}

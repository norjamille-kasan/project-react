<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class TeamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Team $team)
    {
        abort_unless($team->id, session('scope_team_id'),404);

        return Inertia::render('TeamSetting/Members',[
            'team'=> $team,
            'members'=> fn() => $team->users()->withPivot('is_active')->latest()->simplePaginate(20)->through(fn($user)=> [
                'id'=> $user->id,
                'name'=> $user->name,
                'email'=> $user->email,
                'is_active' => $user->pivot->is_active
            ]),
            'roles'=> fn()=> Role::whereTeamId(session(['scope_team_id']))->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Action\SwitchTeamAction;
use App\Models\Team;
use Illuminate\Http\Request;

class SwitchTeamController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Team $team)
    {
        $request->user()->switchTeam($team->id);
        session(['scope_team_id' => $team->id]);
        return back();
    }
}

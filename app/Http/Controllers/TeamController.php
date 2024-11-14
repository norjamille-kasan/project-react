<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function update(Request $request,Team $team)
    {
        // TODO  need policyt
        $team->update( $request->validate([
            'name'=> ['required']
        ]));

        return back();
    }
}

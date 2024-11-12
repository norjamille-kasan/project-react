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
    public function __invoke(Request $request,Team $team,SwitchTeamAction $action)
    {
        try {
            $action->handle($team,$request->user());
            return back();
        } catch (\Throwable $th) {
            return back()->with('exception', $th);
        }
    }
}

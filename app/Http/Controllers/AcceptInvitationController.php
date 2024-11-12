<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInvitationRequest;
use App\Models\TeamInvitation;
use Illuminate\Http\Request;

class AcceptInvitationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(AcceptInvitationRequest $request,string $token)
    {
        $teamInvitation = TeamInvitation::whereToken($token)->firstOrFail();

        $invitedUser = $request->ensureInvitationIsForCurrentUser($teamInvitation->email);

        $request->user()->joined_teams()->updateExistingPivot(session('scope_team_id'),['is_selected'=>false]);

        $request->user()->joined_teams()->attach($teamInvitation->team,['is_selected'=>true]);

        session(['scope_team_id'=> $teamInvitation->team_id]);

        defer(function () use($teamInvitation){
            return $teamInvitation->update([
                'status'=> 'accepted'
            ]);
        });
      

        return redirect('/dashboard');
    }
}

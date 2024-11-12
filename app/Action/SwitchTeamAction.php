<?php

namespace App\Action;

use App\Models\Team;
use App\Models\User;

class SwitchTeamAction
{   
    public function handle(Team $team,User $user)
    {
       $this->ensureUserIsMember($team->id,$user);

        $user->joined_teams()->updateExistingPivot(session('scope_team_id'),['is_selected'=>false]);

        $user->joined_teams()->updateExistingPivot($team,['is_selected'=>true]);

        session(['scope_team_id'=> $team->id]);

    }

    public function ensureUserIsMember(int $teamId,User $user)
    {
        $team = $user->joined_teams()->find($teamId);

        throw_unless($team,"You're not part of the team");

        return true;
    }
}

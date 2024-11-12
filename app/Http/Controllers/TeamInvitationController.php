<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\TeamInvitationEmail;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class TeamInvitationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email'=> ['required']
        ]);

        $user = User::whereEmail($request->email)->first();

        if (!$user) {
            return back()->withErrors([
                'email'=> "User not found. Please ask them to register first"
            ]);
        }

        $existingInvitation =  $request->user()->team_invitations()->whereEmail($request->email)->first();

        if ($existingInvitation && $existingInvitation->created_at->isToday()) {
            return back()->withErrors([
                'email'=> "You've already sent an invitation to this email"
            ]);
        }

        $invitation = $request->user()->team_invitations()->create([
            'team_id'=> session('scope_team_id'),
            'email'=> $request->email,
            'token'=> Str::random(20),
        ]);

        $user->notify(new TeamInvitationEmail($invitation->token,$invitation->team->name));

        return back();
    }
}

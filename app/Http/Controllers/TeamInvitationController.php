<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\TeamInvitationEmail;
use Illuminate\Support\Facades\Notification;
use Mpociot\Teamwork\Facades\Teamwork;

class TeamInvitationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required']
        ]);

        $team = $request->user()->currentTeam;
        if (!Teamwork::hasPendingInvite($request->email, $team)) {
            Teamwork::inviteToTeam($request->email, $team, function ($invite) use($team) {
                Notification::route('mail', $invite->email)->notify(new TeamInvitationEmail($invite->accept_token,$team->name));
            });
        } else {
            return back()->withErrors(['email'=> 'Email is already invited']);
        }
        return back();
    }
}

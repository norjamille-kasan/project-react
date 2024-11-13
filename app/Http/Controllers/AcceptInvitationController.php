<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInvitationRequest;
use App\Models\TeamInvitation;
use Illuminate\Http\Request;
use Mpociot\Teamwork\Facades\Teamwork;

class AcceptInvitationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request,string $token)
    {
        $invite = Teamwork::getInviteFromAcceptToken( $token ); // Returns a TeamworkInvite model or null
        abort_unless($invite,404);
        Teamwork::acceptInvite($invite);
        auth()->user()->assignRole('Team Member');
        return redirect('/dashboard');
    }
}

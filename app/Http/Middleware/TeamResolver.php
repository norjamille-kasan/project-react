<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class TeamResolver
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $this->ensureTeamIsSet();
        $this->ensureUserTeamsIsShared();

        return $next($request);
    }

    public function ensureTeamIsSet()
    {
        if (!session('scope_team_id')) {
            session(['scope_team_id'=> auth()->user()->currentTeam->id]);
         }
    }

    public function ensureUserTeamsIsShared()
    {
        Inertia::share('teams',function(){
            $list = auth()->user()->teams;
            return [
                'list'=> $list,
                'current'=> $list->find(session('scope_team_id')),
            ];
        });
    }
}

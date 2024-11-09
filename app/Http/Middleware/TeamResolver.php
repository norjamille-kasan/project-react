<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserJoinedTeamResource;
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
        if (!session('scope_team_id')) {
           $selectedTeam = $request->user()->joined_teams()->wherePivot('is_selected',true)->first();
           session(['scope_team_id'=> $selectedTeam->id]);
        }
        
        Inertia::share('teams',function(){
            $list = auth()->user()->joined_teams()->get();
            return [
                'list'=> $list,
                'current'=> $list->where('id',session('scope_team_id'))->first(),
            ];
        });
        return $next($request);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Project/Index', [
            'projects' => fn () => Project::latest()->simplePaginate(16)->withQueryString(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
        ]);
        $request->user()->authored_projects()->create([
            'name' => $request->name,
            'team_id' => session('scope_team_id'),
        ]);

        return to_route('projects.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $project->update($request->validate([
            'name' => ['required'],
        ]));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
       if(auth()->user()->cannot("delete",$project)){
            abort(403);
       }

       $project->delete();

       return back();
    }
}

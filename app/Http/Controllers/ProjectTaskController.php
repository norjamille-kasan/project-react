<?php

namespace App\Http\Controllers;

use App\Enum\TaskStatus;
use App\Models\Project;
use App\Models\ProjectLabel;
use App\TaskPriorityLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        return Inertia::render('Task/Index',[
            'project'=> $project,
            'project_labels' => fn() => ProjectLabel::get(),
            'tasks'=> fn () => $project->tasks()->with(['project_label'])->latest()->simplePaginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Project $project)
    {
        return Inertia::render('Task/Create',[
            'project'=> $project
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,Project $project)
    {
        $request->validate([
            'title'=>['required'],
            'description'=> ['nullable'],
            'label_id'=> ['required','exists:project_labels,id'],
            'status'=> ['required'],
            'date_start'=>['nullable','date','before_or_equal:due_date'],
            'due_date'=>['nullable','date','after_or_equal:date_start'],
            'priority_level'=> ['required',Rule::enum(TaskPriorityLevel::class)]
        ]);

        $request->user()->authored_tasks()->create([
            'ref'=> Str::uuid(),
            'project_id'=> $project->id,
            'title'=> $request->title,
            'description'=> $request->description,
            'project_label_id'=> $request->label_id,
            'status'=> $request->status,
            'date_start'=> $request->date_start,
            'due_date'=> $request->due_date,
            'priority_level'=> $request->priority_level,
        ]);

        return back();
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

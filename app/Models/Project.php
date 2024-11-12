<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    public function scopeCurrentTeam(Builder $query): void
    {
        $query->whereTeamId(session('scope_team_id'));
    }
 
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function project_labels()
    {
        return $this->hasMany(ProjectLabel::class);
    }
}

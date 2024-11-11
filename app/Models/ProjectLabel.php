<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectLabel extends Model
{
    protected $guarded = [];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}

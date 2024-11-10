<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

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

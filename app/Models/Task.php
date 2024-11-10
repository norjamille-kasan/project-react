<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = [];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }


    public function author()
    {
        return $this->belongsTo(User::class,'author_id');
    }
}

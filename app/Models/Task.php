<?php

namespace App\Models;

use App\Enum\TaskStatus;
use App\TaskPriorityLevel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
class Task extends Model
{
    protected $guarded = [];
    protected $appends = ['status_label','status_color'];

    protected function statusLabel(): Attribute
    {
        return new Attribute(
            get: fn () => $this->status->label()
        );
    }

    protected function statusColor(): Attribute
    {
        return new Attribute(
            get: fn () => $this->status->color()
        );
    }
    protected function casts(): array
    {
        return [
            'status' => TaskStatus::class,
            'priority_level'=> TaskPriorityLevel::class
        ];
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }


    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function project_label()
    {
        return $this->belongsTo(ProjectLabel::class);
    }
}

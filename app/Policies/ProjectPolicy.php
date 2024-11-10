<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function delete(User $user,Project $project): bool
    {
        return $user->id === $project->author_id;
    }
}

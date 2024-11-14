<?php

namespace App\Serices;

use App\Models\Team;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class TeamService
{
    public function __construct(public Team $team)
    {}

   
}

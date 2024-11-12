<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $guarded = [];

    public function owner()
    {
        return $this->belongsTo(User::class,'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class)->withPivot(['is_selected','is_active']);
    }

    public function invitations()
    {
        return $this->hasMany(TeamInvitation::class);
    }
}

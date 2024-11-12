<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function owned_teams()
    {
        return $this->hasMany(Team::class,'owner_id');
    }

    public function joined_teams()
    {
        return $this->belongsToMany(Team::class)->withPivot(['is_selected','is_active']);
    }

    public function authored_projects()
    {
        return $this->hasMany(Project::class,'author_id');
    }

    public function authored_tasks()
    {
        return $this->hasMany(Task::class,'author_id');
    }

    public function team_invitations()
    {
        return $this->hasMany(TeamInvitation::class);
    }
    // metods

 
}

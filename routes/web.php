<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth','verified','team_resolver'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource('projects',\App\Http\Controllers\ProjectController::class);
    Route::resource('projects.tasks',\App\Http\Controllers\ProjectTaskController::class);

    Route::controller(\App\Http\Controllers\TeamMemberController::class)->group(function(){
        Route::get('/team-members/{team}','index')->name('team-members.index');
    });

    // INVITATION
    Route::controller(\App\Http\Controllers\TeamInvitationController::class)->group(function(){
        Route::post('/team-invitation','store')->name('team-invitation.store');
    });

    Route::get('/accept-invitation/{token}',\App\Http\Controllers\AcceptInvitationController::class);
    // INVITATION END

});



require __DIR__.'/auth.php';

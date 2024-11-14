<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('TeamSetting/Index');
    }
}

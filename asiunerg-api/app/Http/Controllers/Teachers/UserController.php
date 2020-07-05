<?php

namespace App\Http\Controllers\Teachers;

use App\User;
use App\Pedoxa\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\Teacher\Profile;

class UserController extends Controller
{
    public function getProfile(Request $request)
    {
    	$teacher = $request->user()->teacher;

    	return Profile::make($teacher);	
    }

    public function changeAvatar(Request $request)
    {
        $user = User::find(Auth::id());
        $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');

        return response()->json([
            'avatar' => $user->getFirstMediaUrl('avatars')
        ], 201);
    }

    public function getPeriodActive()
    {
        $project =  Project::all()->last();

        return response()->json([
            'data' => [
                'period' => $project->lapso_academico
            ]
        ], 200);
    }
}

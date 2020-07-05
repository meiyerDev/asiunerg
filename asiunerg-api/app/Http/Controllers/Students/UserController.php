<?php

namespace App\Http\Controllers\Students;

use App\User;
use App\Pedoxa\Project;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\StudentProfileResource;

class UserController extends Controller
{
    public function getProfile(Request $request)
    {
        $student = $request->user()->student;

        return StudentProfileResource::make($student);
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

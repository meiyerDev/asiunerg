<?php

namespace App\Http\Controllers\Teachers;

use App\Http\Controllers\Controller;
use App\Models\Georeference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Pedoxa\Teacher;

class GeoreferencesController extends Controller
{
    public function store(Request $request)
    {
        $teacher = Teacher::where('identity', Auth::user()->identity)->first();
        if (! empty($teacher) )
        {
            Georeference::create([
                'teacher_id' => $teacher->id,
                'identifier' => 'AIS',
                'position' => $request->position
            ]);
        }

        return \response()->json([
            'message' => 'Informado'
        ], 201);
    }
}

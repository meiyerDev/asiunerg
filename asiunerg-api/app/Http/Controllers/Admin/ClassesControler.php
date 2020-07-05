<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Student\Classes;
use App\Http\Controllers\Controller;
use App\ClassData;
use App\Pedoxa\Project;

class ClassesControler extends Controller
{
  public function index()
  {
    return view('classes.index');
  }

  public function getClass()
  {
    $project = Project::all()->last();
    $classData = ClassData::where('project_id', $project->id)->get();

    return Classes::collection($classData);
  }
}

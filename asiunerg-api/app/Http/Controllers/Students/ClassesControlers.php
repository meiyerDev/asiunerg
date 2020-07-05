<?php

namespace App\Http\Controllers\Students;

use App\Http\Resources\Student\Classes;
use App\Http\Controllers\Controller;
use App\Pedoxa\MeetSectionView;
use Illuminate\Http\Request;
use App\ClassData;
use App\Pedoxa\Project;

class ClassesControlers extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllClasses(Request $request)
    {
        $user = $request->user();
        $project = Project::all()->last();
        $sections = $user->student->inscriptions->pluck('section_id');
        $meetSections = MeetSectionView::whereIn('Seccion_id',$sections)
                                        ->get()
                                        ->pluck('EncuentrosSeccion_id')
                                        ->toArray();

        $classData = ClassData::whereIn('meet_section_id',$meetSections)->where('project_id', $project->id)->paginate(10);

        return Classes::collection($classData);
    }

    public function getClass($id)
    {
        $classData = ClassData::find(decrypt($id));

        return Classes::make($classData);
    }
}

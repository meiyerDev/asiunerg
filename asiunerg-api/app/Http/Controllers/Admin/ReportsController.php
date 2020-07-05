<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use App\Models\AbsenceTeacher;
use App\Pedoxa\Project;
use App\Pedoxa\Teacher;
use App\Pedoxa\Section;
use App\Pedoxa\Department;
use App\Pedoxa\Matter;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Database\Eloquent\Builder;

class ReportsController extends Controller
{
    public function index()
    {
        return view('reports.index');
    }

    public function report(Request $request)
    {
        $request->validate([
            'type_report' => 'required',
            'identity' => 'required_if:type_report,1',
            'department' => 'required_if:type_report,2',
            'matter' => 'required_if:type_report,3',
        ]);

        $type_report = $request->type_report;
        $project = Project::all()->last();

        if ($type_report == 1) {
            $teacher = Teacher::where('cedula', $request->identity)->first();
            $absences = Absence::whereHasMorph(
                'absence',
                'App\Models\AbsenceTeacher',
                function (Builder $query) use ($teacher, $project)
                {
                    $query->where('teacher_id', $teacher->id)
                        ->where('project_id', $project->id);
                }
            )->where('asistent','absent')->orderBy('asistent_date','DESC')->get();
    
            $pdf = PDF::loadView('reports.teacher', [
                'teacher' => $teacher,
                'absences' => $absences
            ]);
            return $pdf->download($teacher->cedula.'_ausencia_reporte_asiunerg.pdf');
        }elseif ($type_report == 2) {
            $department = Department::find($request->department);
            $matters = $department->matters->pluck('id');
            $sections = Section::whereIn('materia_id',$matters)->where('proyecto_id', $project->id)->pluck('id');
            $absences = Absence::whereHasMorph(
                'absence',
                'App\Models\AbsenceTeacher',
                function (Builder $query) use ($sections, $project)
                {
                    $query->whereIn('section_id', $sections)
                        ->where('project_id', $project->id);
                }
            )->where('asistent','absent')->orderBy('asistent_date','DESC')->get();

            $pdf = PDF::loadView('reports.department', [
                'department' => $department,
                'absences' => $absences,
                'count_sections' => $sections->count(),
                'count_matters' => $matters->count()
            ])->setPaper('a4', 'landscape');
            $name = \str_replace(' ', '_', $department->nombre);

            return $pdf->download($name.'_ausencia_reporte_asiunerg.pdf');
        }elseif($type_report == 3) {
            $matters = Matter::where('codigo',$request->matter)->get();
            $sections = Section::whereIn('materia_id',$matters->pluck('id'))->where('proyecto_id', $project->id)->pluck('id');
            $absences = Absence::whereHasMorph(
                'absence',
                'App\Models\AbsenceTeacher',
                function (Builder $query) use ($sections, $project)
                {
                    $query->whereIn('section_id', $sections)
                        ->where('project_id', $project->id);
                }
            )->where('asistent','absent')->orderBy('asistent_date','DESC')->get();

            $pdf = PDF::loadView('reports.matters', [
                'matters' => $matters,
                'absences' => $absences,
                'count_sections' => $sections->count(),
                'count_matters' => $matters->count()
            ])->setPaper('a4', 'landscape');
            
            $name = \str_replace(' ', '_', $matters->last()->nombre);

            return $pdf->download($name.'_ausencia_reporte_asiunerg.pdf');
        }
    }

    public function test()
    {
        $project = Project::all()->last();
        $matters = Matter::where('codigo','IME720')->get();
        $sections = Section::whereIn('materia_id',$matters->pluck('id'))->where('proyecto_id', $project->id)->pluck('id');
        $absences = Absence::whereHasMorph(
            'absence',
            'App\Models\AbsenceTeacher',
            function (Builder $query) use ($sections, $project)
            {
                $query->whereIn('section_id', $sections)
                    ->where('project_id', $project->id);
            }
        )->where('asistent','absent')->orderBy('asistent_date','DESC')->get();

        $pdf = PDF::loadView('reports.matters', [
            'matters' => $matters,
            'absences' => $absences,
            'count_sections' => $sections->count(),
            'count_matters' => $matters->count()
        ])->setPaper('a4', 'landscape');
        return $pdf->stream('invoice.pdf');
    }
}

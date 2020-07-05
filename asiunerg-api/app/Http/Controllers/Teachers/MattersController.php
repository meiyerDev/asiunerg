<?php

namespace App\Http\Controllers\Teachers;

use App\Http\Resources\Teacher\{StudentForMatter};
use App\Http\Resources\TeacherMatterAssign;
use Illuminate\Database\Eloquent\Builder;
use App\Pedoxa\{Section, SummaryView, Project};
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\{Student, AbsenceStudent};
use App\ClassData;

class MattersController extends Controller
{
    public function getMatterAssign(Request $request)
    {
        $matterAssign = $request->user()->load('teacher.sections.matter');
        return TeacherMatterAssign::make($matterAssign);
    }

    public function showStudents($id)
    {
        $section = Section::findOrFail(decrypt($id))->load('students');

        return StudentForMatter::make($section);
    }

    public function storeStudentClass(Request $request, $id)
    {
        $section = Section::findOrFail(decrypt($id));

        /* Obtener Proyecto activo */
        $project = Project::all()->last();

        /* Obtener usuario sesionado */
        $user = Auth::user();

        /* Capturar la fecha y hora actual, con idioma español */
        $date = \Carbon\Carbon::now()->subHour(4)->locale('es_VE.utf8'); // OJO CON LA FUNCION SUBHOUR

        /* Buscar en la BD-PEDOXA los registros en v_resumen que cumplan con las clausulas where */
        $summaryMeet = SummaryView::select('Seccion_id', 'EncuentrosSeccion_id', 'Dia_numero', 'Hora_inicio', 'Hora_fin')
            ->where('Seccion_id', $section->id)
            // ->where('Dia_numero',$date->dayOfWeek)
            // ->where('Dia_numero', 1)
            // ->whereNotNull('Dia_numero')
            ->first();


        /* Validar la posibilidad de informar asistencia */
        if (empty($summaryMeet)) {
            return response()->json([
                'message' => __('No puedes informar una asistencia a una clase que no ha iniciado.')
            ], 400);
        }

        // /* Crear instacia Carbon para la hora de inicio del encuentro */
        // $startHourMeet = \Carbon\Carbon::createFromTimeString($summaryMeet->Hora_inicio);
        // $finishHourMeet = \Carbon\Carbon::createFromTimeString($summaryMeet->Hora_fin);

        // if (!$date->isBetween($startHourMeet,$finishHourMeet))
        // {
        //     return response()->json([
        //         'message' => __('No puedes informar una asistencia a una clase que no ha iniciado.')
        //     ],400);
        // }

        $presents = $this->createStudentAbsence($request->students_present, $section, $summaryMeet, $project, 'present');

        if ($request->store_absences) {
            $request->validate([
                'theme' => 'required',
                'observation' => 'required'
            ]);

            $absences = $this->createStudentAbsence($request->students_present, $section, $summaryMeet, $project, 'absent');

            $classData = ClassData::firstOrCreate([
                'theme' => $request->theme,
                'observation' => $request->observation,
                'meet_section_id' => $summaryMeet->EncuentrosSeccion_id,
                'project_id' => $project->id,
            ]);

            $students = AbsenceStudent::whereHas('absences', function (Builder $query) use ($summaryMeet, $project) {
                $query->where('asistent_date', \Carbon\Carbon::now()->format('Y-m-d'))
                    ->where('meet_section_id', $summaryMeet->EncuentrosSeccion_id)
                    ->where('project_id', $project->id);
            })->update([
                'class_data_id' => $classData->id
            ]);

            $absenceTeacher = $user->teacher->absenceTeachers()->create([
                'user_id' => $user->id,
                'section_id' => $section->id,
                'created_by_teacher' => 1,
            ]);
            $absenceTeacher = $absenceTeacher->absence()->create([
                'meet_section_id' => $summaryMeet->EncuentrosSeccion_id,
                'asistent' => 'present',
                'asistent_date' => \Carbon\Carbon::now()->format('Y-m-d'),
                'created_at' => \Carbon\Carbon::now(),
                'project_id' => $project->id,
            ]);

            return response()->json([
                'students' => $students,
                'data' => $absenceTeacher
            ], 201);
        }

        return response()->json([
            'present' => $request->students_present,
            'data' => $presents
        ], 201);
    }

    public function createStudentAbsence($students, $section, $summaryMeet, $project, $type)
    {
        $presents = [];
        foreach ($students as $present) {
            $student = Student::findOrFail($present);

            $inscription = $student->inscriptions->where('section_id', $section->id)->first();

            $presentStudent = $student->absenceStudents()->firstOrCreate([
                'user_id' => $student->user->id,
                'inscription_id' => $inscription->id,
                'created_by_teacher' => 1,
            ]);
            $presents[] = $presentStudent->absences()->firstOrCreate([
                'meet_section_id' => $summaryMeet->EncuentrosSeccion_id,
                'asistent' => $type,
                'asistent_date' => \Carbon\Carbon::now()->format('Y-m-d'),
                'project_id' => $project->id,
            ], [
                'created_at' => \Carbon\Carbon::now(),
            ]);
        }

        return collect($presents);
    }
}

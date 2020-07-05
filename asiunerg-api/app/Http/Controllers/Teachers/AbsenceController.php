<?php

namespace App\Http\Controllers\Teachers;


use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Teacher\{
	ResponseFormAbsence,
	MatterToAbsence,
	AbsenceDeleted,
	Absences,
};
use Illuminate\Http\Request;
use App\Pedoxa\SummaryView;
use App\Pedoxa\Project;
use App\Models\{
	Absence,
	AbsenceTeacher
};

class AbsenceController extends Controller
{
	public function index()
	{
		$user = Auth::user();
		$absence = Absence::whereHasMorph('absence', 'App\Models\AbsenceTeacher', function (builder $query) use ($user) {
			$query->where('teacher_id', $user->teacher->id);
		})->where('asistent', 'absent')->orderBy('asistent_date', 'DESC')->paginate(10);

		return Absences::collection($absence);
	}

	public function getMattersAbsence(Request $request)
	{
		$user = $request->user();
		$mattersToAbsence = $user->teacher->load('sections.matter');

		return MatterToAbsence::make($mattersToAbsence);
	}

	public function store(Request $request)
	{
		$request->validate([
			'typeAbsence'	=> ['required'],
			'section'		=> ['nullable', 'array'],
			'day'			=> ['nullable', 'date', 'after_or_equal:today'],
			'reason'		=> ['required'],
			'observation'	=> ['required'],
		]);

		/* Obtener usuario sesionado */
		$user = Auth::user();

		/* Obtener Proyecto activo */
		$project = Project::all()->last();

		/* Capturar la fecha y hora actual, con idioma español */
		// $locale = setlocale(LC_ALL, 'es_VE.utf8');
		$date = \Carbon\Carbon::now()->subHour(4)->locale('es_VE.utf8'); // OJO CON LA FUNCION SUBHOUR

		/* lógica si se este informando una inasistencia por materia o grupo de materias */
		if ($request->input('typeAbsence') == 1) {
			/* Capturar el numero de la semana actual */
			$day = $date->dayOfWeek;

			/* Prevenir que si es fin de semana se capture como 1 (Para mejorar las reglas de condición mas adelante) */
			$dayClass = ($day > 5) ? 1 : $day;

			/* Buscar en la BD-PEDOXA los registros en v_resumen que cumplan con las clausulas where */
			$summaryMeets = SummaryView::select('Seccion_id', 'EncuentrosSeccion_id', 'Dia_numero', 'Hora_inicio', 'Hora_fin')
				->whereIn('Seccion_id', $request->input('section'))
				->whereNotNull('Dia_numero')
				->get();
			/* Lógica aplicada para informar la ausencia de cada sección-materia */
			$absence = [];
			foreach ($request->input('section') as $section) {
				/* Busqueda aplicada al resultado de la consulta anterior de la BD-PEDOXA */
				$summaryMeet = $summaryMeets->where('Seccion_id', $section);


				/* Obteniendo solo los dias de encuentro de la sección en cuestión */
				$days = $summaryMeet->pluck('Dia_numero');

				/* Condiciones dependiendo del día en que se realiza el informe de ausencia */
				if ((count($days) === 1) || ($dayClass < $days[0])) {
					/* Cálculo del proximo encuentro de clase a partir del número de día */
					$dateNextMeet = $this->getNextDateMeet($days[0], $day, $date);
					/* Obtener instancia de objeto de v_resumen correspondiente al dia de encuentro */
					$summaryMeetClass = $summaryMeet->first();
				} elseif (($dayClass > $days[0]) && ($dayClass < $days[1])) {
					/* Cálculo del proximo encuentro de clase a partir del número de día */
					$dateNextMeet = $this->getNextDateMeet($days[1], $day, $date);
					/* Obtener instancia de objeto de v_resumen correspondiente al dia de encuentro */
					$summaryMeetClass = $summaryMeet->last();
				} elseif ((count($days) === 2) && ($dayClass > $days[1])) {
					/* Cálculo del proximo encuentro de clase a partir del número de día */
					$dateNextMeet = $this->getNextDateMeet($days[0], $day, $date);
					/* Obtener instancia de objeto de v_resumen correspondiente al dia de encuentro */
					$summaryMeetClass = $summaryMeet->last();
				} elseif (($dayClass === $days[0]) || ($dayClass === $days[1])) {
					/* Obtener instancia de objeto dependiendo del dia en que se hará el informe de ausencia */
					$summaryMeetClass = ($dayClass === $days[0]) ? $summaryMeet->first() : $summaryMeet->last();

					/* Crear instacia Carbon para la hora de inicio del encuentro */
					// $startHourMeet = \Carbon\Carbon::createFromTimeString($summaryMeetClass->Hora_inicio);
					$finishHourMeet = \Carbon\Carbon::createFromTimeString($summaryMeetClass->Hora_fin);

					/* Verificar que el informe de ausencia sea antes de la hora del encuentro */
					if ($date->lessThan($finishHourMeet)) {
						$dateNextMeet = $date;
					} else {
						return response()->json([
							'message' => __('No puedes informar ausencia a una clase que ya ha finalizado.')
						], 422);
					}
				}

				$section = $user->teacher->sections()->where('seccions.id', $summaryMeetClass->Seccion_id)->first();

				/* Consultar que el encuentro no esté marcado como inasistente*/
				$exists = $user->teacher->absences()
					->where('absence_type', 'profesor')
					->where('meet_section_id', $summaryMeetClass->EncuentrosSeccion_id)
					->where('asistent_date', $dateNextMeet->format('Y-m-d'))
                    ->where('project_id',$project->id)
					->exists();
				/* Validar en base a la consulta */
				if (!$exists) {
					$absenceTeacher = $user->teacher->absenceTeachers()->create([
						'user_id' => $user->id,
						'section_id' => $section->id,
						'created_by_teacher' => 1,
					]);
					$absence[] = $absenceTeacher->absence()->create([
						'meet_section_id' => $summaryMeetClass->EncuentrosSeccion_id,
						'asistent' => 'absent',
						'asistent_date' => $dateNextMeet,
						'project_id' => $project->id,
						'created_at' => \Carbon\Carbon::now(),
					]);
				}
			}

			/* Guardando el response */
			$response = $absence;

		/* Logica si es una inasistencia por dia */
		} elseif ($request->input('typeAbsence') == 2) {
			/* Obtener día proporcionado por usuario el cual será informado como ausente */
			$absenceDay = $request->input('day');
			/* Crear fecha de tipo objeto Carbon en base al día suministrado */
			$dayMeets = \Carbon\Carbon::createFromFormat('d-m-Y', $absenceDay);
			/* Obtener el numero de la fecha creada */
			$dayNumber = $dayMeets->dayOfWeek;

			/* Obtener las secciones asignadas del usuario */
			$sectionsAssigned = $user->teacher->sections()->where('proyecto_id', 9)->pluck('seccions.id')->toArray();

			/*
            * Obtener los datos de v_resumen (DB PEDOXA) en base a 
            * las secciones asignadas del usuario y la fecha suministrada por el mismo
            */
			$summaryMeets = SummaryView::select('Seccion_id', 'EncuentrosSeccion_id', 'Dia_numero')
				->whereIn('Seccion_id', $sectionsAssigned)
				->where('Dia_numero', $dayNumber)
				->get();

			/* Creamos un Array para contener los datos proximos a guardar en la DB */
			$absence = [];
			foreach ($summaryMeets as $summaryMeetClass) {
				$section = $user->teacher->sections()->where('seccions.id', $summaryMeetClass->Seccion_id)->first();

				/* Consultar que el encuentro no esté marcado como inasistente*/
				$exists = $user->teacher->absences()
				->where('absence_type', 'profesor')
				->where('meet_section_id', $summaryMeetClass->EncuentrosSeccion_id)
				->where('asistent_date', $dayMeets->format('Y-m-d'))
				->where('project_id',$project->id)
				->exists();
				/* Validar en base a la consulta */
				if (!$exists) {
					/* Se guardan los datos */
					$absenceTeacher = $user->teacher->absenceTeachers()->create([
						'user_id' => $user->id,
						'section_id' => $section->id,
						'created_by_teacher' => 1,
					]);
					$absence[] = $absenceTeacher->absence()->create([
						'meet_section_id' => $summaryMeetClass->EncuentrosSeccion_id,
						'asistent' => 'absent',
						'project_id' => $project->id,
						'asistent_date' => $dayMeets,
						'created_at' => \Carbon\Carbon::now(),
					]);
				}
			}
			/* Guardando el response */
			$response = $absence;
		}

		return ResponseFormAbsence::make($response, 201);
	}

	public function destroy(Absence $absence)
	{
		$response = AbsenceDeleted::make($absence);
		$absence->absence->delete();
		$absence->delete();

		return response()->json([
			'message' => __('Informe de inasistencia eliminado con éxito.'),
			'data' => $response
		], 200);
	}
}

<?php

namespace App\Http\Resources\Teacher;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use App\Pedoxa\SummaryView;

class StudentForMatter extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $date = \Carbon\Carbon::now()->subHour(4)->locale('es_VE.utf8'); // OJO CON LA FUNCION SUBHOUR
        
        /* Buscar en la BD-PEDOXA los registros en v_resumen que cumplan con las clausulas where */
        $summaryMeet = SummaryView::select('Seccion_id','EncuentrosSeccion_id','Dia_numero','Hora_inicio','Hora_fin')
            ->where('Seccion_id',$this->resource->id)
            ->where('Dia_numero',$date->dayOfWeek)
            ->whereNotNull('Dia_numero')
            ->first();
        
        if( empty($summaryMeet) ) 
        {
            $isMarkable = false;
        }
        else
        {
            /* Crear instacia Carbon para la hora de inicio del encuentro */
            $startHourMeet = \Carbon\Carbon::createFromTimeString($summaryMeet->Hora_inicio);
            $finishHourMeet = \Carbon\Carbon::createFromTimeString($summaryMeet->Hora_fin);

            $isMarkable = $date->isBetween($startHourMeet,$finishHourMeet);

            if ($isMarkable)
            {
                $georeference = $summaryMeet->section->teachers->where('cedula',Auth::user()->identity)->first()->georeferences;
                if ($georeference->isEmpty()) {
                    $isMarkable = false;
                }else{
                    $isMarkable = $georeference->last()->position == 1 ? true : false;
                }
            }
        }

        $students = $this->resource->students;
        
        $student_response = [];
        foreach ($students as $key => $student)
        {
            $student_response[] = [
                'num' => $key+1,
                'id' => $student->id,
                'identity' => $student->identity,
                'complete_name' => explode(' ',$student->name)[0]." ".explode(' ',$student->lastname)[0],
                'name' => $student->name,
                'lastname' => $student->lastname,
                'avatar' => $student->user->getFirstMediaUrl('avatars'),
                'present' => $student->absences()->where('absence_type','estudiante')->where('asistent','absent')->where('asistent_date','2020-06-21')->exists(),
            ];
        }
        return [
            'students' => $student_response,
            // 'is_markable' => $isMarkable,
            'is_markable' => true
        ];
    }
}

<?php

namespace App\Http\Resources\Teacher;

use App\Pedoxa\Project;
use Illuminate\Http\Resources\Json\JsonResource;

class MatterToAbsence extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        /* Obtener del PEDOXA el id del ultimo periodo registrado */
        $project = Project::all()->last();

        /* buscamos las materias del profesor para ese periodo */
        $sections = $this->resource->sections->where('proyecto_id', '=', $project->id);
        
        /* generamos los datos para enviar al Frontend */
        $matterSections = [];
        $carbon = \Carbon\Carbon::now(); // Fecha actual
        foreach ($sections as $section) {
            /* obtenemos las inasistencias de esa seccion para el profesor */
            $absences = $section->absences->where('absence_type','profesor');
            if ( ($absences->count() > 0) && ($absences->last()->asistent === 'absent') ) 
            {
                $absence = $absences->last();

                if ( $carbon->greaterThan($absence->asistent_date) )
                {
                    $matterSections[] = [
                        'value' => $section->id,
                        'label' => $section->matter->nombre." - Sección ".$section->nombre
                    ];
                }
            }
            else
            {
                $matterSections[] = [
                    'value' => $section->id,
                    'label' => $section->matter->nombre." - Sección ".$section->nombre
                ];
            }
        }
        return [
            'matters' => $matterSections
        ];
    }
}

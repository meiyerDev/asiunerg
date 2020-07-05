<?php

namespace App\Http\Resources;

use App\Pedoxa\Project;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherMatterAssign extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        /* Generamos la estructura de los datos del Profesor a enviar al frontend*/
        $userTeacher = [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
        ];

        /* Obtener del PEDOXA el id del ultimo periodo registrado */
        $project = Project::all()->last();

        /* buscamos las materias del profesor para ese periodo */
        $sections = $this->resource->teacher->sections->where('proyecto_id', '=', $project->id);
        /* generamos los datos para enviar al Frontend */
        $matterAssign = [];
        foreach ($sections as $section) {
            $matterAssign[] = [
                'id' => encrypt($section->id),
                'code' => $section->matter->codigo,
                'name' => $section->matter->nombre,
                'name_avr' => $section->matter->avr,
                'section' => $section->nombre,
            ];
        }

        return [
            'teacher' => $userTeacher,
            'matters' => $matterAssign
        ];
    }
}

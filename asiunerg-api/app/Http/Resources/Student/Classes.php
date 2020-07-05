<?php

namespace App\Http\Resources\Student;

use Illuminate\Http\Resources\Json\JsonResource;

class Classes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $teacher = $this->meetSectionView->teachers->first();
        return [
            'id' => $this->id,
            'teacher' => [
                'name' => $teacher->nombres,
                'lastname' => $teacher->apellidos,
            ],
            'matter' => [
                'name' => $this->meetSectionView->Materia_nombre,
                'name_avr' => $this->meetSectionView->Materia_avr,
                'code' => $this->meetSectionView->Materia_codigo,
                'section' => $this->meetSectionView->Seccion_nombre
            ],
            'theme' => $this->theme,
            'observation' => $this->observation,
            'created_at' => $this->created_at->format('Y-m-d')
        ];
    }
}

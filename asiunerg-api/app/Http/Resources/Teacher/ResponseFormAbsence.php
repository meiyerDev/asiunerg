<?php

namespace App\Http\Resources\Teacher;

use Illuminate\Http\Resources\Json\JsonResource;

class ResponseFormAbsence extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $matters = [];
        $absences = [];
        $carbon = new \Carbon\Carbon;
        $now = $carbon->now();
        foreach ($this->resource as $absence) {
            $absences[] = [
                'id' => $absence->id,
                'code' => $absence->absence->section->matter->codigo,
                'name' => $absence->absence->section->matter->nombre,
                'name_avr' => $absence->absence->section->matter->avr,
                'section' => $absence->absence->section->nombre,
                'date_absence' => $absence->asistent_date->format('d-m-Y'),
                'date_created' => $absence->created_at->format('d-m-Y'),
                'show_trash' => $now->lessThan($absence->asistent_date),
            ];
            $matters[] = $absence->meetSection()->first()->seccion_id;
        }

        return [
            'absences' => $absences,
            'matters' => $matters
        ];
    }
}

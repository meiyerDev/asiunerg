<?php

namespace App\Http\Resources\Teacher;

use Illuminate\Http\Resources\Json\JsonResource;

class Absences extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $carbon = \Carbon\Carbon::now();
        return [
            'id' => $this->id,
            'code' => $this->absence->section->matter->codigo,
            'name' => $this->absence->section->matter->nombre,
            'name_avr' => $this->absence->section->matter->avr,
            'section' => $this->absence->section->nombre,
            'date_absence' => $this->asistent_date->format('d-m-Y'),
            'date_created' => $this->created_at->format('d-m-Y'),
            'show_trash' => $carbon->lessThan($this->asistent_date),
        ];
    }
}

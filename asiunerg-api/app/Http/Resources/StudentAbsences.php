<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\ClassData;

class StudentAbsences extends JsonResource
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
            'code' => $this->absence->inscription->section->matter->codigo,
            'name' => $this->absence->inscription->section->matter->nombre,
            'name_avr' => $this->absence->inscription->section->matter->avr,
            'section' => $this->absence->inscription->section->nombre,
            'date_absence' => $this->asistent_date->format('d-m-Y'),
            'date_created' => $this->created_at->format('d-m-Y'),
            'show_trash' => $carbon->lessThan($this->asistent_date),
            'show_class' => $this->absence->classData()->exists(),
            'class_id' => $this->when($this->absence->classData()->exists(), encrypt($this->absence->class_data_id))
        ];
    }
}

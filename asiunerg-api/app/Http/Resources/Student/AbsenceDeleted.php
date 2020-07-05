<?php

namespace App\Http\Resources\Student;

use Illuminate\Http\Resources\Json\JsonResource;

class AbsenceDeleted extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $inscription = $this->resource->absence->inscription;
        return [
            'value' => $inscription->section->id,
            'label' => $inscription->section->matter->nombre,
        ];
    }
}

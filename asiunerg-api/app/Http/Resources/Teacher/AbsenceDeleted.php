<?php

namespace App\Http\Resources\Teacher;

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
        $sectionAssing = $this->resource->absence->section;
        return [
            'label' => $sectionAssing->matter->nombre." - Sección ".$sectionAssing->nombre,
            'value' => $sectionAssing->id
        ];
    }
}

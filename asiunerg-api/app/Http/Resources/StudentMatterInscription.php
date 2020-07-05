<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentMatterInscription extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $matterInscription = [];
        foreach ($this->where('active',true) as $inscription) {
            $matterInscription[] = [
                'code' => $inscription->section->matter->codigo,
                'name' => $inscription->section->matter->nombre,
                'name_avr' => $inscription->section->matter->avr,
                'section' => $inscription->section->nombre,
            ];
        }
        return $matterInscription;
    }
}

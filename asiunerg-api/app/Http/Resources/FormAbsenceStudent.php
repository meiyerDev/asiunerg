<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FormAbsenceStudent extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $matterSections = [];
        $carbon = \Carbon\Carbon::now();
        
        foreach ($this->resource as $inscription) {
            $absences = $inscription->absences->where('absence_type','estudiante');
            if( ($absences->count() > 0) && ($absences->last()->asistent === 'absent') )
            {
                $absence = $absences->last();
                if($carbon->greaterThan($absence->asistent_date))
                {
                    $matterSections[] = [
                        'value' => $inscription->section->id,
                        'label' => $inscription->section->matter->nombre
                    ];
                }
            }
            else
            {
                $matterSections[] = [
                    'value' => $inscription->section->id,
                    'label' => $inscription->section->matter->nombre
                ];
            }
        }

        return [
            'inscriptions' => $matterSections
        ];
    }
}

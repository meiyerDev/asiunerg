<?php

namespace App\Http\Resources\Student;

use Illuminate\Http\Resources\Json\JsonResource;

class TeacherAbsences extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->absence->id,
            'code' => $this->absence->section->matter->codigo,
            'name' => $this->absence->teacher->nombres." ".$this->absence->teacher->apellidos,
            $this->mergeWhen(!empty($this->absence->user),[
                'avatar' => $this->absence->user->getFirstMediaUrl('avatars'),
            ]),
            'matter' => $this->absence->section->matter->nombre,
            'date_asistent' => $this->asistent_date->format('d-m-Y'),
            // 'date_created' => $this->created_at->format('d-m-Y'),
            'reason' => 'Auto averiado'
        ];
    }
}

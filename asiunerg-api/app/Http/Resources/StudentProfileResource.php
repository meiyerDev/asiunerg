<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = $this->resource->user()->first();
        return [
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'identity' => $user->identity,
                'avatar' => $user->getFirstMediaUrl('avatars'),
            ],
            'student' => [
                'id'        => $this->resource->id,
                'identity'  => $this->resource->identity,
                'name'      => ucwords($this->resource->name),
                'lastname'  => ucwords($this->resource->lastname),
            ],
            'inscriptions_count' => $this->resource->inscriptions()->count(),
            'presents_count' => $this->resource->absences()->where('absence_type','estudiante')->where('asistent','present')->count(),
            'absents_count' => $this->resource->absences()->where('absence_type','estudiante')->where('asistent','absent')->count(),
        ];
    }
}

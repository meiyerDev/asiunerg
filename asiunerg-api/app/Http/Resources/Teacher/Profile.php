<?php

namespace App\Http\Resources\Teacher;

use Illuminate\Http\Resources\Json\JsonResource;

class Profile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = $this->user()->first();
        return [
            'user' => [
                'email' => $user->email,
                'avatar' => $user->getFirstMediaUrl('avatars'),
            ],
            'teacher' => [
                // 'identity'  => $this->cedula,
                'name'      => ucwords($this->nombres),
                'lastname'  => ucwords($this->apellidos),
                'phone'     => $this->telf_movil,
                'email'     => $this->email
            ],
            // 'inscriptions_count' => $this->inscriptions()->count(),
            'presents_count' => $this->absences()->where('absence_type','profesor')->where('asistent','present')->count(),
            'absents_count' => $this->absences()->where('absence_type','profesor')->where('asistent','absent')->count(),
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbsenceTeacher extends Model
{
    protected $connection = 'mysql';

    protected $fillable = [
		'user_id',
		'teacher_id',
        'section_id'
    ];

    public function user()
    {
    	return $this->belongsTo(\App\User::class);
    }

    public function absence()
    {
        return $this->morphOne('App\Models\Absence', 'absence');
    }

    public function section()
    {
        return $this->belongsTo(\App\Pedoxa\Section::class, 'section_id', 'id');
    }

    public function teacher()
    {
        return $this->belongsTo(\App\Pedoxa\Teacher::class, 'teacher_id', 'id');
    }
}

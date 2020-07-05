<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AbsenceStudent extends Model
{
	// use SoftDeletes;
    
    protected $connection = 'mysql';

    protected $fillable = [
		'user_id',
        'student_id',
        'inscription_id',
		'class_data_id',
        'created_by_teacher',
    ];

    public function inscription()
    {
        return $this->belongsTo(\App\Inscription::class);
    }

	public function classData()
    {
    	return $this->belongsTo(\App\ClassData::class);
    }

    public function user()
    {
        return $this->belongsTo(App\User::class);
    }

    public function absences()
    {
        return $this->morphOne('App\Models\Absence', 'absence');
    }
}

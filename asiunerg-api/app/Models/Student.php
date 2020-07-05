<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Student extends Model
{
    use SoftDeletes, Notifiable;
    
    protected $connection = 'mysql';

    protected $fillable = [
    	'identity',
    	'name',
    	'lastname',
    	'email',
    ];

    public function inscriptions()
    {
    	return $this->hasMany(\App\Inscription::class);
    }

    public function absenceStudents()
    {
        return $this->hasMany(AbsenceStudent::class);
    }

    public function absences()
    {
        return $this->hasManyThrough(
            'App\Models\Absence',
            'App\Models\AbsenceStudent',
            'student_id',
            'absence_id',
            'id',
            'id',
        );
    }
    
    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }
}

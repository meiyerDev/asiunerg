<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inscription extends Model
{
    use SoftDeletes;
    
    protected $connection = 'mysql';

    protected $fillable = [
		'section_id',
        'user_id',
		'student_id',
		'active',
    ];

    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    public function student()
    {
        return $this->belongsTo(Models\Student::class);
    }

    public function section()
    {
        return $this->belongsTo(Pedoxa\Section::class,'section_id','id');
    }

    public function absences()
    {
        return $this->hasManyThrough(
            'App\Models\Absence',
            'App\Models\AbsenceStudent',
            'inscription_id',
            'absence_id',
            'id',
            'id',
        );
    }
}

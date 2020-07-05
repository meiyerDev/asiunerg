<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    /**
     * The database connection used by the model.
     *
     * @var string
     */
    protected $connection = 'pedoxa';

    /**
     * The database table used by the model.
     *
     * @var string
     */
	protected $table = 'seccions';

	public function project()
	{
		return $this->belongsTo(Project::class,'proyecto_id','id');
	}

	public function meetSectionViews()
	{
		return $this->hasMany(MeetSectionView::class,'Seccion_id');
	}

	public function meetSection()
	{
		return $this->hasMany(MeetSection::class,'seccion_id');
	}

	public function teachers()
	{
		return $this->belongsToMany(Teacher::class,
			'docentes_seccions','seccion_id','docente_id'
		);
	}

	public function matter()
	{
		return $this->belongsTo(Matter::class,'materia_id','id');
	}

	public function absences()
    {
        return $this->hasManyThrough(
            'App\Models\Absence',
            'App\Models\AbsenceTeacher',
            'section_id',
            'absence_id',
            'id',
            'id',
        );
    }

    public function inscriptions()
    {
    	return $this->hasMany(\App\Inscription::class, 'section_id', 'id')
    		->where('active',1);
    }

    public function students()
    {
    	return $this->belongsToMany(\App\Models\Student::class,
    		'inscriptions', 'section_id', 'student_id'
    	)->withPivot('user_id','active')->wherePivot('active',1);
	}
	
	public function summaryViews()
	{
		return $this->hasMany(SummaryView::class, 'Seccion_id', 'id');
	}

	public function absenceTeachers()
	{
		return $this->hasMany(\App\Models\AbsenceTeacher::class, 'section_id', 'id');
	}
}

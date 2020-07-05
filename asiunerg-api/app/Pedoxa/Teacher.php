<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
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
	protected $table = 'docentes';

	// protected $fillable = [
	// 	'cedula','nombres','apellidos','telf_movil','telf_local','email',
	// ];

	public function user()
	{
		return $this->hasOne(\App\User::class,'identity','cedula');
	}

    public function sections()
    {
        return $this->belongsToMany(Section::class,
            'docentes_seccions','docente_id','seccion_id'
        );
    }

    public function absenceTeachers()
    {
        return $this->hasMany(\App\Models\AbsenceTeacher::class);
    }

    public function absences()
    {
        return $this->hasManyThrough(
            'App\Models\Absence',
            'App\Models\AbsenceTeacher',
            'teacher_id',
            'absence_id',
            'id',
            'id',
        );
    }

    public function georeferences()
    {
        return $this->hasMany(\App\Models\Georeference::class, 'teacher_id','id');
    }
}

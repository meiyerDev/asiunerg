<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Matter extends Model
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
	protected $table = 'materias';

    public function section()
    {
        return $this->hasMany(Section::class, 'materia_id', 'id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'departamento_id', 'id');
    }
}

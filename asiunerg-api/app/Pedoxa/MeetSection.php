<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class MeetSection extends Model
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
	protected $table = 'encuentros_seccions';

	public function section()
	{
		return $this->belongsTo(Section::class,'seccion_id','id');
	}

    public function absences()
    {
        return $this->hasMany(\App\Models\Absence::class,'meet_section_id','id');
    }
}

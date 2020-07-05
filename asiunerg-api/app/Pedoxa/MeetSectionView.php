<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class MeetSectionView extends Model
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
	protected $table = 'v_encuentros_seccions';

	public function section()
	{
		return $this->belongsTo(Section::class,'Seccion_id','id');
	}

    public function teachers()
    {
        return $this->section->teachers();
    }

    public function matter()
    {
        return $this->section->matter();
    }
}

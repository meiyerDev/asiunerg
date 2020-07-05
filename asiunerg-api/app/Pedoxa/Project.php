<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
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
	protected $table = 'proyectos';

	public function sections()
	{
		return $this->hasMany(Section::class,'proyecto_id','id');
	}

    public function meetSectionViews()
    {
        return $this->hasMany(MeetSectionView::class,'Proyecto_id','id');
    }
}

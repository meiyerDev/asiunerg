<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassData extends Model
{
	use SoftDeletes;
	
    protected $connection = 'mysql';
    
    protected $fillable = [
      'meet_section_id',
      'theme',
      'observation',
      'project_id',
    ];

    public function meetSectionView()
    {
    	return $this->belongsTo(\App\Pedoxa\MeetSectionView::class, 'meet_section_id','EncuentrosSeccion_id');
    }
}

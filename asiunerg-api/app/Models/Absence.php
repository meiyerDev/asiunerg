<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Absence extends Model
{
    use SoftDeletes;
    
    protected $connection = 'mysql';

    protected $fillable = [
        'absence_id',
        'absence_type',
		'meet_section_id',
		'asistent',
		'asistent_date',
    ];

    protected $dates = [
        'asistent_date'
    ];

    public function meetSection()
    {
    	return $this->belongsTo(\App\Pedoxa\MeetSection::class,'meet_section_id','id');
    }

    public function absence()
    {
        return $this->morphTo();
    }
}

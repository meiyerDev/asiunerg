<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Georeference extends Model
{
    protected $connection = 'mysql';

    protected $fillable = [
        'teacher_id', 'identifier', 'position'
    ];

    public function teacher()
    {
        return $this->belongsTo(\App\Pedoxa\Teacher::class, 'teacher_id', 'id');
    }
}

<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class SummaryView extends Model
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
    protected $table = 'v_resumen';
    
    public function section()
    {
        return $this->belongsTo(Section::class, 'Seccion_id', 'id');
    }
}

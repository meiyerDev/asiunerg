<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
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
    protected $table = 'departamentos';
    
    function matters() {
        return $this->hasMany(Matter::class, 'departamento_id', 'id');
    }
    
    public function direction()
    {
        return $this->belongsTo(Direction::class, 'direccion_id', 'id');
    }
}

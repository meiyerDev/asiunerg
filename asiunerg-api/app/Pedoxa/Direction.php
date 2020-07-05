<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
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
    protected $table = 'direccions';

    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id', 'id');
    }
}

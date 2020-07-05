<?php

namespace App\Pedoxa;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
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
    protected $table = 'areas';
}

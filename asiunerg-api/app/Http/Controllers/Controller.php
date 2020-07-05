<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /*
    |
    | Métodos para calcular el proximo encuentro 
    | de clase a partir del número de día
    |
    */
    public function getNextDateMeet($dayMeet, $today, $carbonDate)
    {
        /* Cálculo de dias (en base al dayMeet) a sumarle a la fecha actual */
        $dateClass = ($dayMeet + 7) - $today;
        $day = $carbonDate->addDay($dateClass)->englishDayOfWeek;

        /* Obtenemos la proxima fecha de encuentro */
        $dateNextMeet = new \Carbon\Carbon("next $day");
        
        return $dateNextMeet;
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;

class RedirectRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if(Auth::check()){
            if(Auth::user()->hasAnyRole(['Admin','Root']))
            {
                return redirect('/admin'.RouteServiceProvider::HOME);
            }
            // elseif (Auth::user()->hasRole('Student'))
            // {
            //     return redirect()->away(RouteServiceProvider::STUDENT);
            // }
            // elseif (Auth::user()->hasRole('Teacher'))
            // {
            //     return redirect()->away(RouteServiceProvider::TEACHER);
            // }
        }
        return $next($request);
    }
}

<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API-STUDENT routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "student" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function() {
	Route::get('/profile', 'UserController@getProfile');

	/* UPDATE PROFILE */
	Route::post('/cambiar/avatar', 'UserController@changeAvatar');
	/* UPDATE PROFILE */
	
	/* INASISTENCIAS */
	Route::get('/inasistencias', 'AbsenceController@index');
	Route::get('/inasistencias/materias', 'AbsenceController@getMattersAbsence');
	Route::post('/inasistencias/nueva', 'AbsenceController@storeStudent');
	Route::delete('/inasistencias/{absence}', 'AbsenceController@destroy');
	Route::get('/inasistencias/profesores', 'AbsenceController@getTeachersAbsences');
	/* INASISTENCIAS */

    /* MATERIAS */
	Route::get('/materias', 'InscriptionController@getMatterInscription');
	Route::post('/inscribir/materias', 'InscriptionController@store');
	Route::get('/inscribir/materias', 'InscriptionController@store');
    /* MATERIAS */

    /* CLASES */
    Route::get('/clases/materias', 'ClassesControlers@getAllClasses');
    Route::get('/clases/materia/{id}', 'ClassesControlers@getClass');
	/* CLASES */
	
	/* PERIOD ACTIVE */
	Route::get('/activos/periodo', 'UserController@getPeriodActive');
	/* PERIOD ACTIVE */
});


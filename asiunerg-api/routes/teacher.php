<?php 
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API-STUDENT routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "teacher" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function() {
	Route::get('/profile', 'UserController@getProfile');
	Route::get('/materias/asignadas', 'MattersController@getMatterAssign');
	Route::post('/region', 'GeoreferencesController@store');

	/* UPDATE PROFILE */
	Route::post('/cambiar/avatar', 'UserController@changeAvatar');
	/* UPDATE PROFILE */
	
	/* INASISTENCIAS */
	Route::get('/inasistencias', 'AbsenceController@index');
	Route::get('/inasistencias/materias', 'AbsenceController@getMattersAbsence');
	Route::post('/inasistencias/nueva', 'AbsenceController@store');
	Route::delete('/inasistencias/{absence}', 'AbsenceController@destroy');
	/* INASISTENCIAS */

	/* CLASES */
	Route::group(['prefix' => 'clases'], function() {
	    Route::get('/materia/{id}', 'MattersController@showStudents');
	    Route::post('/materia/{id}/estudiantes', 'MattersController@storeStudentClass');
	    Route::post('/materia/{id}/finalizar', 'MattersController@storeStudentClass');
	});

	/* PERIOD ACTIVE */
	Route::get('/activos/periodo', 'UserController@getPeriodActive');
	/* PERIOD ACTIVE */
});

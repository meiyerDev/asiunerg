<?php 
use Illuminate\Support\Facades\Route;

Route::get('/inicio', 'HomeController@index')->name('home');

Route::resource('users', 'UsersController');

Route::resource('profesores', 'TeachersController');
Route::post('profesores/nuevo/excel', 'TeachersController@storeExcel');
Route::get('profesores/{profesore}/materias/asignadas', 'TeachersController@getMatterAssign');

Route::resource('estudiantes', 'StudentsController');
Route::post('estudiantes/nuevo/excel', 'StudentsController@storeExcel');
Route::get('estudiantes/{estudiante}/materias/inscritas', 'StudentsController@getMatterInscription');

Route::get('/profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);

Route::get('clases', 'ClassesControler@index')->name('classes.index');
Route::get('clases/listado', 'ClassesControler@getClass');

Route::get('/reportes/test', 'ReportsController@test');
Route::get('/reportes', 'ReportsController@index')->name('reports.index');
Route::post('/reportes/descargar', 'ReportsController@report');

Route::group(['prefix' => 'tools'], function () {
    Route::get('departamentos', 'ToolsController@getDepartments');
});
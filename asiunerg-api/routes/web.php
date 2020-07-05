<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'welcome')->middleware('auth:admin');

Route::post('/acceder', 'Admin\Auth\LoginController@login');
Route::get('/acceder', 'Admin\Auth\LoginController@showLoginForm')->name('login');
Route::post('/salir', 'Admin\Auth\LoginController@logout')->name('logout');

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response($request->user(), 200);
});

Route::middleware('auth:sanctum')->post('/sanctum/logout', 'AuthMovil\LoginController@logoutToken');

Route::post('/sanctum/token', 'AuthMovil\LoginController@loginToken');
// Route::get('/sanctum/token', 'AuthMovil\LoginController@loginToken');

Route::middleware('auth:sanctum')->get('/auth', 'AuthMovil\LoginController@isAuth');
Route::middleware('auth:sanctum')->post('/user/role', 'AuthMovil\LoginController@getRole');
Route::post('/register', 'AuthMovil\RegisterController@register');
Route::post('/login', 'AuthMovil\LoginController@login');
Route::post('/logout', 'AuthMovil\LoginController@logout');
Route::middleware('auth:sanctum')->get('/test', 'AuthMovil\LoginController@test');

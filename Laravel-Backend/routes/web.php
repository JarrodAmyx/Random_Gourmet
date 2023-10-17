<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/stuff', function () {
    die('hello');
    return view('angular.index');
})->where('any', '.*');

Route::get('/', function () {
    return view('angular.index');
})->where('any', '.*');

Route::get('/data', [ApiController::class, 'getData']);


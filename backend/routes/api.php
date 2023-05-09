<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TablasGeneralesController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/valores-defecto', [TablasGeneralesController::class, 'getvaloresdefecto']);
Route::put('/valores-defecto/{id}', [TablasGeneralesController::class, 'actualizarValoresDefecto']);


Route::get('/pasajeros-comerciales', [TablasGeneralesController::class, 'getpasajeroscomerciales']);
Route::post('/pasajeros-comerciales', [TablasGeneralesController::class, 'guardarPasajerosComerciales']);
Route::put('/pasajeros-comerciales/{id}', [TablasGeneralesController::class, 'actualizarPasajerosComerciales']);


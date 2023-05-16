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

Route::get('/aviacion-carga', [TablasGeneralesController::class, 'getaviacioncarga']);
Route::post('/aviacion-carga', [TablasGeneralesController::class, 'guardarAviacionCarga']);
Route::put('/aviacion-carga/{id}', [TablasGeneralesController::class, 'actualizarAviacionCarga']);

Route::get('/aviacion-general', [TablasGeneralesController::class, 'getaviaciongeneral']);
Route::post('/aviacion-general', [TablasGeneralesController::class, 'guardarAviacionGeneral']);
Route::put('/aviacion-general/{id}', [TablasGeneralesController::class, 'actualizarAviacionGeneral']);


Route::get('/calidad-servicio', [TablasGeneralesController::class, 'getcalidadservicio']);
Route::post('/calidad-servicio', [TablasGeneralesController::class, 'guardarCalidadServicio']);
Route::put('/calidad-servicio/{id}', [TablasGeneralesController::class, 'actualizarCalidadServicio']);

Route::get('/encuesta-satisfaccion', [TablasGeneralesController::class, 'getencuestasatisfaccion']);
Route::post('/encuesta-satisfaccion', [TablasGeneralesController::class, 'guardarEncuestaSatisfaccion']);
Route::put('/encuesta-satisfaccion/{id}', [TablasGeneralesController::class, 'actualizarEncuestaSatisfaccion']);

Route::get('/informacion-vuelos', [TablasGeneralesController::class, 'getinformacionvuelos']);
Route::post('/informacion-vuelos', [TablasGeneralesController::class, 'guardarInformacionVuelos']);
Route::put('/informacion-vuelos/{id}', [TablasGeneralesController::class, 'actualizarInformacionVuelos']);

Route::get('/infraestructura', [TablasGeneralesController::class, 'getinfraestructura']);
Route::post('/iinfraestructura', [TablasGeneralesController::class, 'guardarInfraestructura']);
Route::put('/infraestructura/{id}', [TablasGeneralesController::class, 'actualizarInfraestructura']);

Route::get('/ingresos', [TablasGeneralesController::class, 'getingresos']);
Route::post('/ingresos', [TablasGeneralesController::class, 'guardarIngresos']);
Route::put('/ingresos/{id}', [TablasGeneralesController::class, 'actualizarIngresos']);

Route::get('/egresos', [TablasGeneralesController::class, 'getegresos']);
Route::post('/egresos', [TablasGeneralesController::class, 'guardarEgresos']);
Route::put('/egresos/{id}', [TablasGeneralesController::class, 'actualizarEgresos']);

Route::get('/locales-comerciales', [TablasGeneralesController::class, 'getLocalesComerciales']);
Route::put('/locales-comerciales/{id}', [TablasGeneralesController::class, 'actualizarLocalesComerciales']);

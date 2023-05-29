<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TablasGeneralesController;
use App\Http\Controllers\ListasEditarController;
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
Route::post('/infraestructura', [TablasGeneralesController::class, 'guardarInfraestructura']);
Route::put('/infraestructura/{id}', [TablasGeneralesController::class, 'actualizarInfraestructura']);

Route::get('/ingresos', [TablasGeneralesController::class, 'getingresos']);
Route::post('/ingresos', [TablasGeneralesController::class, 'guardarIngresos']);
Route::put('/ingresos/{id}', [TablasGeneralesController::class, 'actualizarIngresos']);

Route::get('/egresos', [TablasGeneralesController::class, 'getegresos']);
Route::post('/egresos', [TablasGeneralesController::class, 'guardarEgresos']);
Route::put('/egresos/{id}', [TablasGeneralesController::class, 'actualizarEgresos']);

Route::get('/locales-comerciales', [TablasGeneralesController::class, 'getLocalesComerciales']);
Route::put('/locales-comerciales/{id}', [TablasGeneralesController::class, 'actualizarLocalesComerciales']);

Route::get('/aerolineas', [TablasGeneralesController::class, 'getAerolineas']);
Route::put('/aerolineas/{id}', [TablasGeneralesController::class, 'actualizarAerolineas']);

Route::get('/ocupacion-carga-filtro', [TablasGeneralesController::class, 'getOcupacionCarga']);
Route::post('/ocupacion-carga', [TablasGeneralesController::class, 'guardarOcupacionCarga']);
Route::put('/ocupacion-carga/{id}', [TablasGeneralesController::class, 'actualizarOcupacionCarga']);

Route::get('/ocupacion-pasajeros-filtro', [TablasGeneralesController::class, 'getOcupacionPasajeros']);
Route::post('/ocupacion-pasajeros', [TablasGeneralesController::class, 'guardarOcupacionPasajeros']);
Route::put('/ocupacion-pasajeros/{id}', [TablasGeneralesController::class, 'actualizarOcupacionPasajeros']);

/* Listas */
Route::get('/lst-infraestructura', [ListasEditarController::class, 'getLstInfraestructura']);
Route::get('/lst-informacion-vuelos', [ListasEditarController::class, 'getLstInfoVuelos']);
Route::get('/lst-atencion-personalizada', [ListasEditarController::class, 'getLstAtencionPersonalizada']);
Route::get('/lst-locales-comerciales', [ListasEditarController::class, 'getLstLocalesComerciales']);
Route::get('/lst-aerolineas', [ListasEditarController::class, 'getLstAerolinea']);
Route::get('/lst-ingresos', [ListasEditarController::class, 'getLstIngresos']);
Route::get('/lst-egresos', [ListasEditarController::class, 'getLstEgresos']);
Route::get('/lst-encuesta-calidad', [ListasEditarController::class, 'getLstEncuestaCalidad']);
Route::get('/lst-aviacion-comercial', [ListasEditarController::class, 'getLstAviacionComercialPasajeros']);
Route::get('/lst-aviacion-general', [ListasEditarController::class, 'getLstAviacionGeneralPasajeros']);
Route::get('/lst-aviacion-carga', [ListasEditarController::class, 'getLstAviacioCarga']);

Route::get('/ocupacion-pasajeros', [ListasEditarController::class, 'getOcupacionPasajeros']);
Route::get('/ocupacion-carga', [ListasEditarController::class, 'getOcupacionCarga']);

<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\PasajerosComerciales;
use App\Models\AviacionCarga;
use App\Models\CalidadServicio;
use App\Models\EncuestaSatisfaccion;
use App\Models\InformacionVuelos;
use App\Models\Infraestructura;
use App\Models\PasajerosGenerales;
use App\Models\Egresos;
use App\Models\Ingresos;
use App\Models\LocalesComerciales;
use App\Models\Aerolineas;
use App\Models\OcupacionCarga;
use App\Models\OcupacionPasajeros;
use App\Http\Controllers\Normalize\ValidateRoule;
use App\Http\Controllers\Normalize\NormalizeResult;

class ListasEditarController extends Controller
{
    /**
     *
     * Mostramos el listado de los regitros solicitados.
     * @return \Illuminate\Http\Response
     *
     */

    public function getLstInfraestructura()
    {
        $data = Infraestructura::all(["idInfraestructura", "fecha", "date"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstInfoVuelos()
    {
        $data = InformacionVuelos::all(["idVuelos", "fecha", "date"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstAtencionPersonalizada()
    {
        $data = CalidadServicio::all(["idServicio", "fecha", "date"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstLocalesComerciales()
    {
        $data = LocalesComerciales::all(["idLocales", "giros"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstAerolinea()
    {
        $data = Aerolineas::all(["idAerolineas", "aerolinea"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstIngresos()
    {
        $data = Ingresos::all(["idIngresos", "fecha", "date"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstEgresos()
    {
        $data = Egresos::all(["idEgresos", "fecha", "date"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstEncuestaCalidad()
    {
        $data = EncuestaSatisfaccion::all(["idCalidad", "formatoFecha", "fecha"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstAviacionComercialPasajeros()
    {
        $data = PasajerosComerciales::all(["id", "formatoFecha", "valor", "fecha"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstAviacionGeneralPasajeros()
    {
        $data = PasajerosGenerales::all(["idGeneralPasajeros", "formatoFecha", "valor", "fecha"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getLstAviacioCarga()
    {
        $data = AviacionCarga::all(["idCarga", "formatoFecha", "carga", "fecha"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getOcupacionCarga()
    {
        $data = OcupacionCarga::all(["idOcupacion", "formatoFecha", "cargaKg", "fecha"]);

        return NormalizeResult::index($data->toArray());
    }

    public function getOcupacionPasajeros()
    {
        $data = OcupacionPasajeros::all(["idOcupacion", "formatoFecha", "numPasajeros", "fecha"]);

        return NormalizeResult::index($data->toArray());
    }
}

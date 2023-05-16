<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\PasajerosComerciales;
use App\Models\ValoresDefecto;
use App\Models\AviacionCarga;
use App\Models\CalidadServicio;
use App\Models\EncuestaSatisfaccion;
use App\Models\InformacionVuelos;
use App\Models\Infraesctructura;
use App\Models\PasajerosGenerales;
use App\Models\Egresos;
use App\Models\Ingresos;
use App\Models\LocalesComerciales;
use App\Http\Controllers\Normalize\ValidateRoule;
use App\Http\Controllers\Normalize\NormalizeResult;

class TablasGeneralesController extends Controller
{
    public function getvaloresdefecto()
    {
        $data = ValoresDefecto::all();

        return NormalizeResult::index($data->toArray());
    }

    public function actualizarValoresDefecto(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'fechaFinal' => ['required', 'string'],
            'fechaInicial' => ['required', 'string'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = ValoresDefecto::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     *
     * Mostramos el listado de los regitros solicitados.
     * @return \Illuminate\Http\Response
     *
     */
    public function getpasajeroscomerciales(Request $request)
    {
        $data = DB::connection('mysql')->table('pasajeos_comerciales')
            ->selectRaw("
            pasajeos_comerciales.id,
            pasajeos_comerciales.fechaFormart,
            pasajeos_comerciales.fecha,
            pasajeos_comerciales.valor
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('pasajeos_comerciales.fecha', '>=', "$request->fechaDesde");
            })->when($request->fechaHasta, function ($query) use ($request) {
                $query->whereDate('pasajeos_comerciales.fecha', '<=', "$request->fechaHasta");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarPasajerosComerciales(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'fechaFormart' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'valor' => ['required', 'integer'],
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = PasajerosComerciales::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarPasajerosComerciales(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'fechaFormart' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'valor' => ['required', 'integer'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = PasajerosComerciales::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Aviacion carga
     *
     */

    public function getaviacioncarga(Request $request)
    {
        $data = DB::connection('mysql')->table('aviacioncarga')
            ->selectRaw("
            aviacioncarga.idCarga,
            aviacioncarga.formatoFecha,
            aviacioncarga.fecha,
            aviacioncarga.carga
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('aviacioncarga.fecha', '>=', "$request->fechaDesde");
            })->when($request->fechaHasta, function ($query) use ($request) {
                $query->whereDate('aviacioncarga.fecha', '<=', "$request->fechaHasta");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarAviacionCarga(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'formatoFecha' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'carga' => ['required', 'integer'],
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = AviacionCarga::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarAviacionCarga(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'formatoFecha' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'carga' => ['required', 'integer'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = AviacionCarga::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Aviacion general
     *
     */

    public function getaviaciongeneral(Request $request)
    {
        $data = DB::connection('mysql')->table('pasajerosgeneral')
            ->selectRaw("
            pasajerosgeneral.idGeneralPasajeros,
            pasajerosgeneral.formatoFecha,
            pasajerosgeneral.fecha,
            pasajerosgeneral.valor
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('pasajerosgeneral.fecha', '>=', "$request->fechaDesde");
            })->when($request->fechaHasta, function ($query) use ($request) {
                $query->whereDate('pasajerosgeneral.fecha', '<=', "$request->fechaHasta");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarAviacionGeneral(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'formatoFecha' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'valor' => ['required', 'integer'],
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = PasajerosGenerales::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarAviacionGeneral(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'formatoFecha' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'valor' => ['required', 'integer'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = PasajerosGenerales::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Calidad del servicio
     *
     */

    public function getcalidadservicio(Request $request)
    {
        $data = DB::connection('mysql')->table('calidadservicio')
            ->selectRaw("
            calidadservicio.idServicio,
            calidadservicio.fecha,
            calidadservicio.date,
            calidadservicio.valor
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('calidadservicio.date', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarCalidadServicio(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'date' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'valor' => ['required', 'integer'],
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = CalidadServicio::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarCalidadServicio(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'date' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'valor' => ['required', 'integer'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = CalidadServicio::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Encuesta de satisfaccion
     *
     */

    public function getencuestasatisfaccion(Request $request)
    {
        $data = DB::connection('mysql')->table('encuestacalidad')
            ->selectRaw("
            encuestacalidad.idCalidad,
            encuestacalidad.formatoFecha,
            encuestacalidad.fecha,
            encuestacalidad.seguridad,
            encuestacalidad.limpieza,
            encuestacalidad.tiemDeEsper,
            encuestacalidad.infoVuelos,
            encuestacalidad.senializacion,
            encuestacalidad.atencionCliente,
            encuestacalidad.infraestructura,
            encuestacalidad.servComerciales,
            encuestacalidad.conectividadVial,
            encuestacalidad.satisfaGral
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('encuestacalidad.fecha', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarEncuestaSatisfaccion(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'date' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'seguridad' => ['required', 'integer'],
                'limpieza' => ['required', 'integer'],
                'tiemDeEsper' => ['required', 'integer'],
                'infoVuelos' => ['required', 'integer'],
                'senializacion' => ['required', 'integer'],
                'atencionCliente' => ['required', 'integer'],
                'infraestructura' => ['required', 'integer'],
                'servComerciales' => ['required', 'integer'],
                'conectividadGral' => ['required', 'integer'],
                'satisfaGral' => ['required', 'integer']
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = EncuestaSatisfaccion::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarEncuestaSatisfaccion(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'date' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'seguridad' => ['required', 'integer'],
            'limpieza' => ['required', 'integer'],
            'tiemDeEsper' => ['required', 'integer'],
            'infoVuelos' => ['required', 'integer'],
            'senializacion' => ['required', 'integer'],
            'atencionCliente' => ['required', 'integer'],
            'infraestructura' => ['required', 'integer'],
            'servComerciales' => ['required', 'integer'],
            'conectividadGral' => ['required', 'integer'],
            'satisfaGral' => ['required', 'integer']
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = EncuestaSatisfaccion::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Informacion de vuelos
     *
     */

    public function getinformacionvuelos(Request $request)
    {
        $data = DB::connection('mysql')->table('infovuelos')
            ->selectRaw("
            infovuelos.idVuelos,
            infovuelos.fecha,
            infovuelos.date,
            infovuelos.valor
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('infovuelos.date', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarInformacionVuelos(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'date' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'valor' => ['required', 'integer'],
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = InformacionVuelos::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarInformacionVuelos(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'date' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'valor' => ['required', 'integer'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = InformacionVuelos::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Infraestructura
     *
     */

    public function getinfraestructura(Request $request)
    {
        $data = DB::connection('mysql')->table('infraestructura')
            ->selectRaw("
            infraestructura.idInfraestructura,
            infraestructura.fecha,
            infraestructura.date,
            infraestructura.valor
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('infraestructura.date', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarInfraestructura(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'date' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'valor' => ['required', 'integer'],
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = Infraesctructura::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarInfraestructura(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'date' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'valor' => ['required', 'integer'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = Infraesctructura::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Ingresos
     *
     */

    public function getingresos(Request $request)
    {
        $data = DB::connection('mysql')->table('ingresos')
            ->selectRaw("
            ingresos.idIngresos,
            ingresos.fecha,
            ingresos.date,
            ingresos.participaciones,
            ingresos.ventaBienes,
            ingresos.ingresosFinancieros,
            ingresos.otros
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('ingresos.date', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarIngresos(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'date' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'participaciones' => ['required', 'integer'],
                'ventaBienes' => ['required', 'integer'],
                'ingresosFinancieros' => ['required', 'integer'],
                'otros' => ['required', 'integer']
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = Ingresos::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarIngresos(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'date' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'participaciones' => ['required', 'integer'],
            'ventaBienes' => ['required', 'integer'],
            'ingresosFinancieros' => ['required', 'integer'],
            'otros' => ['required', 'integer']
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = Ingresos::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Egresos
     *
     */

    public function getegresos(Request $request)
    {
        $data = DB::connection('mysql')->table('egresos')
            ->selectRaw("
            egresos.idEgresos,
            egresos.fecha,
            egresos.date,
            egresos.servGenerales,
            egresos.serPersonales,
            egresos.materiales,
            egresos.estimaciones,
            egresos.otros
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('egresos.date', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);

        return NormalizeResult::index($data->toArray());
    }

    public function guardarEgresos(Request $data)
    {
        try {
            $existeTransaccion = DB::transactionLevel() ? true : false;
            $existeTransaccion ?: DB::beginTransaction();
            $request = $data->toArray();
            $valida = ValidateRoule::valida($request, [
                'date' => ['required', 'string'],
                'fecha' => ['required', 'string'],
                'servGenerales' => ['required', 'integer'],
                'serPersonales' => ['required', 'integer'],
                'materiales' => ['required', 'integer'],
                'estimaciones' => ['required', 'integer'],
                'otros' => ['required', 'integer']
            ]);
            if ($valida["status"] == "error") {
                return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
            }

            $documentoImagenes = Egresos::create($request);


            $documentoImagenes = $documentoImagenes->toArray();

            $existeTransaccion ?: DB::commit();
            return NormalizeResult::index([$documentoImagenes], 201);
        } catch (Exception $e) {
            Log::alert($e);
            $existeTransaccion ?: DB::rollBack();
            return NormalizeResult::error($e->getMessage(), [], 500);
        }
    }

    public function actualizarEgresos(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'date' => ['required', 'string'],
            'fecha' => ['required', 'string'],
            'servGenerales' => ['required', 'integer'],
            'serPersonales' => ['required', 'integer'],
            'materiales' => ['required', 'integer'],
            'estimaciones' => ['required', 'integer'],
            'otros' => ['required', 'integer']
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = Egresos::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }

    /**
     * Apis Tabla Aerolineas
     *
     */

    /**
     * Apis Locales comerciales
     *
     */

    public function getLocalesComerciales(Request $request)
    {
        $data = DB::connection('mysql')->table('tablalocales')
            ->selectRaw("
            tablalocales.idLocales,
            tablalocales.giros,
            tablalocales.existentes,
            tablalocales.arrendados,
            tablalocales.operando,
            tablalocales.enAdaptacion,
            tablalocales.disponibles,
            tablalocales.empresas
            ")
            ->when($request->fechaDesde, function ($query) use ($request) {
                $query->whereDate('tablalocales.fecha', '=', "$request->fechaDesde");
            });

        $data = NormalizeResult::paginate($data, $request);
        return NormalizeResult::index($data->toArray());
    }

    public function actualizarLocalesComerciales(Request $request, $id)
    {
        $data = $request->toArray();
        $valida = ValidateRoule::valida($data, [
            'fechaFinal' => ['required', 'string'],
            'fechaInicial' => ['required', 'string'],
        ]);
        if ($valida["status"] == "error") {
            return NormalizeResult::error($valida["error_msg"], [], $valida["code"]);
        } else {
            $agenda = ValoresDefecto::findOrFail($id);
            $agenda->fill($data)->save();
            return NormalizeResult::index([$agenda], 200);
        }
    }
}

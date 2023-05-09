<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\PasajerosComerciales;
use App\Models\ValoresDefecto;
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


}

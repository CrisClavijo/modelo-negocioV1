<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class OcupacionPasajeros extends Authenticatable
{
    protected $table = 'pasajerosocupacion';
    protected $primaryKey = 'idOcupacion';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaRegistro";

    protected $casts = [
        'fecha' => 'string',
        'numPasajeros' => 'int',
        'estimado' => 'int',
        'formatoFecha' => 'string'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaRegistro'
    ];

    protected $fillable = [
        'formatoFecha',
        'fecha',
        'estimado',
        'numPasajeros'
    ];

}

<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class OcupacionCarga extends Authenticatable
{
    protected $table = 'cargaocupacion';
    protected $primaryKey = 'idOcupacion';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaRegistro";

    protected $casts = [
        'fecha' => 'string',
        'cargaKg' => 'int',
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
        'cargaKg',
        'estimado'
    ];

}

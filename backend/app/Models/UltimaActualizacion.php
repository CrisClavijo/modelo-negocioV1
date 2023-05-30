<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UltimaActualizacion extends Authenticatable
{
    protected $table = 'ultima_actualizacion';
    protected $primaryKey = 'idFechaActualizacion';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaCreacion";

    protected $casts = [
        'formatoFecha' => 'string',
        'corte' => 'string'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'formatoFecha',
        'corte'
    ];

}

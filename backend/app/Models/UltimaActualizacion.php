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
        'fecha' => 'string'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'fecha'
    ];

}

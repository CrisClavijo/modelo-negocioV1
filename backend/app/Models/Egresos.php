<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Egresos extends Authenticatable
{
    protected $table = 'egresos';
    protected $primaryKey = 'idEgresos';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaCreacion";

    protected $casts = [
        'date' => 'string',
        'fecha' => 'string',
        'servGenerales' => 'int',
        'serPersonales' => 'int',
        'materiales' => 'int',
        'estimaciones' => 'int',
        'otros' => 'int'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'date',
        'fecha',
        'servGenerales',
        'serPersonales',
        'materiales',
        'estimaciones',
        'otros'
    ];

}

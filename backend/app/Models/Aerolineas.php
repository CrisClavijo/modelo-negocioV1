<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Aerolineas extends Authenticatable
{
    protected $table = 'aerolineas';
    protected $primaryKey = 'idAerolineas';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaRegistro";

    protected $casts = [
        'aerolinea' => 'string',
        'fop' => 'int',
        'oper' => 'int'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaRegistro'
    ];

    protected $fillable = [
        'aerolinea',
        'fop',
        'oper'
    ];

}

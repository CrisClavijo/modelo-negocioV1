<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class LocalesComerciales extends Authenticatable
{
    protected $table = 'tablalocales';
    protected $primaryKey = 'idLocales';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaCreacion";

    protected $casts = [
        'giros' => 'string',
        'fecha' => 'string',
        'existentes' => 'int',
        'arrendados' => 'int',
        'operando' => 'int',
        'enAdaptacion' => 'int',
        'disponibles' => 'int',
        'empresas' => 'int'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'giros',
        'fecha',
        'existentes',
        'arrendados',
        'operando',
        'enAdaptacion',
        'disponibles',
        'empresas'
    ];

}

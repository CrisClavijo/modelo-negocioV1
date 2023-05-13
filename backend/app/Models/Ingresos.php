<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Ingresos extends Authenticatable
{
    protected $table = 'ingresos';
    protected $primaryKey = 'idIngresos';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaCreacion";

    protected $casts = [
        'date' => 'string',
        'fecha' => 'string',
        'participantes' => 'int',
        'ventaBienes' => 'int',
        'ingresosFinancieros' => 'int',
        'otros' => 'int'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'date',
        'fecha',
        'participantes',
        'ventaBienes',
        'ingresosFinancieros',
        'otros'
    ];

}

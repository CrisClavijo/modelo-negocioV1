<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Infraesctructura extends Authenticatable
{
    protected $table = 'infraestructura';
    protected $primaryKey = 'idInfraestructura';
    const UPDATED_AT = "fechaActualizacion";
    const CREATED_AT = "fechaCreacion";

    protected $casts = [
        'date' => 'string',
        'fecha' => 'string',
        'valor' => 'int'
    ];

    protected $dates = [
        'fechaActualizacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'date',
        'fecha',
        'valor',
    ];

}

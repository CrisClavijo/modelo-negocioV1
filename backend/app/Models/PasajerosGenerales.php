<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class PasajerosGenerales extends Authenticatable
{
    protected $table = 'pasajerosgeneral';
    protected $primaryKey = 'idGeneralPasajeros';
    const UPDATED_AT = "fechaModificacion";
    const CREATED_AT = "fechaRegistro";

    protected $casts = [
        'formatoFecha' => 'string',
        'fecha' => 'string',
        'valor' => 'int'
    ];

    protected $dates = [
        'fechaModificacion',
        'fechaRegistro'
    ];

    protected $fillable = [
        'formatoFecha',
        'fecha',
        'valor',
    ];

}

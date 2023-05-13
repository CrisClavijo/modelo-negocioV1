<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AviacionCarga extends Authenticatable
{
    protected $table = 'aviacioncarga';
    protected $primaryKey = 'idCarga';
    const UPDATED_AT = "fechaModificacion";
    const CREATED_AT = "fechaRegistro";

    protected $casts = [
        'formatoFecha' => 'string',
        'fecha' => 'string',
        'carga' => 'int'
    ];

    protected $dates = [
        'fechaModificacion',
        'fechaRegistro'
    ];

    protected $fillable = [
        'formatoFecha',
        'fecha',
        'carga',
    ];

}

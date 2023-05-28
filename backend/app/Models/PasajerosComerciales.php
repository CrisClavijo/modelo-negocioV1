<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PasajerosComerciales extends Authenticatable
{
    protected $table = 'pasajeos_comerciales';
    protected $primaryKey = 'id';
    const UPDATED_AT = "fecha_actualizacion";
    const CREATED_AT = "fecha_creacion";

    protected $casts = [
        'fecha' => 'string',
        'formatoFecha' => 'string',
        'valor' => 'int'
    ];

    protected $dates = [
        'fechaDocumento',
        'fechaModificacion'
    ];

    protected $fillable = [
        'formatoFecha',
        'fecha',
        'valor',
    ];

}

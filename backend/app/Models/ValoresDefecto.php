<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ValoresDefecto extends Authenticatable
{
    protected $table = 'valores_defecto';
    protected $primaryKey = 'idValoresDefecto';
    const UPDATED_AT = "fechaModificacion";
    const CREATED_AT = "fechaRegistro";

    protected $casts = [
        'nombre' => 'string',
        'fechaInicial' => 'string',
        'fechaFinal' => 'string',
    ];

    protected $dates = [
        'fechaDocumento',
        'fechaModificacion'
    ];

    protected $fillable = [
        'nombre',
        'fechaInicial',
        'fechaFinal'
    ];

}

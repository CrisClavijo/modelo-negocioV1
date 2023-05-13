<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class EncuestaSatisfaccion extends Authenticatable
{
    protected $table = 'encuestacalidad';
    protected $primaryKey = 'idCalidad';
    const UPDATED_AT = "fechaModificacion";
    const CREATED_AT = "fechaCreacion";

    protected $casts = [
        'seguridad' => 'int',
        'limpieza' => 'int',
        'tiemDeEsper' => 'int',
        'infoVuelos' => 'int',
        'senializacion' => 'int',
        'atencionCliente' => 'int',
        'infraestructura' => 'int',
        'servComerciales' => 'int',
        'satisfaGral' => 'int',
        'fecha' => 'int',
        'date' => 'string',
    ];

    protected $dates = [
        'fechaModificacion',
        'fechaCreacion'
    ];

    protected $fillable = [
        'seguridad',
        'limpieza',
        'tiemDeEsper',
        'infoVuelos',
        'senializacion',
        'atencionCliente',
        'infraestructura',
        'servComerciales',
        'satisfaGral',
        'fecha',
        'date',
    ];

}

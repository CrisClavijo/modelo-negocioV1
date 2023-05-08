<?php

namespace App\Http\Controllers\Normalize;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

abstract class ValidateRoule
{
    public static function valida($data, $roules)
    {
        $response = [];
        $valida = Validator::make($data, $roules);
        $errors = (new ValidationException($valida))->errors();
        $errorMessage = "";
        if ($valida->fails()) {
            $response["status"] = "error";
            foreach ($errors as $field) {
                $errorMessage .= implode(', ', $field) . ' ';
            }
            $response["error_msg"] = $errorMessage;
            $response["code"] = 422;
            return $response;
        }
        $response["status"] = "success";
        $response["error_msg"] = "";
        $response["code"] = 200;
        return $response;
    }

    /**
     * Devuelve un arreglo con los campos requeridos segun la tabla de la base de datos
     * @param String $table_schema Nombre de la tabla de la base de datos
     * @return array ['Descripcion' => ['required', 'string', 'max:100']]
     */
    public static function getValidationRules($table_schema)
    {
        $columns = DB::select(" SELECT  TABLE_NAME,
                                        COLUMN_NAME,
                                        IS_NULLABLE,
                                        DATA_TYPE,
                                        CASE  WHEN CHARACTER_MAXIMUM_LENGTH IS NULL THEN NUMERIC_PRECISION
                                              ELSE CHARACTER_MAXIMUM_LENGTH
                                        END AS LENGTH_TYPE,
                                        CHARACTER_MAXIMUM_LENGTH ,
                                        NUMERIC_PRECISION
                                 FROM   information_schema.columns
                                 WHERE table_schema = 'htsj_mediacion'
                                 AND table_name = '{$table_schema}'
                                 AND  COLUMN_KEY != 'PRI'
                              ");

        $array_validate = [];

        foreach ($columns as $key => $value) {
            $type =  ValidateRoule::array_list_type_rules($value->DATA_TYPE);
            $max_value = !empty($value->LENGTH_TYPE) ?  "max:{$value->LENGTH_TYPE}" : '';
            $is_required = $value->IS_NULLABLE == 'NO' ? 'required' : '';


            $array_validate[$value->COLUMN_NAME] = [
                $is_required,
                $type,
                $max_value

            ];

            // Filtramos para eliminar los elementos del arreglo que esten vacios
            $array_validate[$value->COLUMN_NAME] = array_filter($array_validate[$value->COLUMN_NAME]);
            // Para volver a reindexar las keys del arreglo ej: de [2,4,5] a [0,1,2]
            sort($array_validate[$value->COLUMN_NAME]);
        }

        return $array_validate;
    }

    public static function array_list_type_rules($key)
    {
        $list = [
            'tinyint'       => 'integer',
            'bigint'        => 'integer',
            'int'           => 'integer',
            'varchar'       => 'string',
            'char'          => 'string',
            'date'          => 'date',
            'datetime'      => '',
            'mediumtext'    => '',
            'time'          => ''
        ];

        return isset($list[$key]) ? $list[$key] : $key;
    }
}

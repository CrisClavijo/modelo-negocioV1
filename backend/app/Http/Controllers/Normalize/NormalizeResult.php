<?php

namespace App\Http\Controllers\Normalize;

abstract class NormalizeResult
{
    public static function index($result, int $code = 200)
    {
        if (is_array($result)) {
            if (isset($result['current_page'])) {
                $response = array_merge($result, ['status' => 'success', 'data' => $result['data']]);
            } else {
                $response = [
                    'status' => 'success',
                    'total' => sizeof($result),
                    'data' => $result
                ];
            }
        } else {
            $response = [
                'status' => 'success',
                'total' => 0,
                'data' => []
            ];
        }

        $response = response()->json($response, $code);

        return $response;
    }

    public static function error(string $error, array $data = [], int $code = 500)
    {
        $response = [
            'status' => 'error',
            'code' => $code,
            'error_msg' => $error,
        ];

        if (!empty($data)) {
            $response['data'] = $data;
        }

        $response = response()->json($response, $code);
        return $response;
    }
    public static function message(string $type_status = 'success',string $message, array $data = [], int $code = 200)
    {
        $response = [
            'status' => $type_status,
            'code' => $code,
            'message' => $message,
            'data' => $data
        ];

        if (!empty($data)) {
            $response['data'] = $data;
        }

        $response = response()->json($response, $code);
        return $response;
    }

    public static function paginate($query, $request)
    {
        return $request->pageSize ? $query->paginate($request->pageSize) : $query->get();
    }
}

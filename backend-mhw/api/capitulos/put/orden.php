<?php
// backend-mhw/api/capitulos/put/orden.php

// Headers para CORS y tipo de contenido
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("X-Content-Type-Options: nosniff");

// Incluir archivos necesarios
require_once ('../../../config/db.php');
require_once ('../../../models/Capitulo.php');

// Obtener el contenido JSON de la solicitud
$json = file_get_contents('php://input');

// Verificar si se recibieron datos
if ($json === false) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Error al leer el cuerpo de la solicitud',
        'error' => 'No se pudo leer php://input'
    ]);
    exit;
}

// Verificar si el cuerpo está vacío
if (empty($json)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Cuerpo de la solicitud vacío',
        'error' => 'Se esperaba un JSON en el cuerpo de la solicitud'
    ]);
    exit;
}

// Decodificar el JSON
$data = json_decode($json);

// Verificar errores de decodificación
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Error al decodificar JSON',
        'error' => json_last_error_msg(),
        'received' => $json
    ]);
    exit;
}

// Validar datos requeridos
if (!isset($data->capituloId) || !isset($data->newOrder)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Datos incompletos o inválidos',
        'required_fields' => ['capituloId', 'newOrder'],
        'received' => $data
    ]);
    exit;
}

// Procesar la solicitud
try {
    // Validar tipos de datos
    if (!is_numeric($data->capituloId)) {
        throw new Exception("El campo capituloId debe ser numérico");
    }

    if (!is_array($data->newOrder)) {
        throw new Exception("El campo newOrder debe ser un array");
    }

    // Conectar a la base de datos
    $database = new Database();
    $db = $database->getConnection();
    
    // Crear instancia de Capitulo
    $capitulo = new Capitulo($db);

    // Asignar valores
    $capituloId = (int)$data->capituloId;
    $newOrder = $data->newOrder;

    // Validar que el capítulo exista
    if (!$capitulo->capituloExiste($capituloId)) {
        throw new Exception("El capítulo con ID $capituloId no existe");
    }

    // Validar el array de newOrder
    if (empty($newOrder)) {
        throw new Exception("El array newOrder no puede estar vacío");
    }

    // Validar que todos los elementos sean numéricos
    foreach ($newOrder as $item) {
        if (!is_numeric($item)) {
            throw new Exception("Todos los elementos de newOrder deben ser numéricos");
        }
    }

    // Lógica para actualizar el orden (implementar según tu estructura de base de datos)
    $resultado = $capitulo->actualizarOrdenImagenes($capituloId, $newOrder);

    if (!$resultado) {
        throw new Exception("No se pudo actualizar el orden de las imágenes");
    }

    // Respuesta exitosa
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Orden actualizado correctamente',
        'data' => [
            'capituloId' => $capituloId,
            'numImagenes' => count($newOrder),
            'newOrder' => $newOrder
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error de base de datos',
        'error' => $e->getMessage(),
        'errorCode' => $e->getCode()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Error en la solicitud',
        'error' => $e->getMessage()
    ]);
}
?>
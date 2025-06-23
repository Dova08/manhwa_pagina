<?php
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require_once("../../../config/db.php");
require_once('../../../models/Manhwa.php');

try {
    $db = new Database();
    $conn = $db->connect();
    $manhwa = new Manhwa($conn);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['id'])) {
            $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
            if ($id === false || $id === null) {
                throw new Exception("ID inválido", 400);
            }

            $manhwaData = $manhwa->obtenerPorIdConCapitulos($id);
            
            if (!$manhwaData) {
                throw new Exception("Manhwa no encontrado", 404);
            }
            
            $response = [
                'success' => true,
                'data' => [
                    'id' => $manhwaData['id'],
                    'titulo' => $manhwaData['titulo'],
                    'autor' => $manhwaData['autor'],
                    'descripcion' => $manhwaData['descripcion'],
                    'estado' => $manhwaData['estado'],
                    'fecha_publicacion' => $manhwaData['fecha_publicacion'],
                    'portada_url' => $manhwaData['portada_url'],
                    'generos' => $manhwaData['generos'] ?? [],
                    'generos_ids' => $manhwaData['generos_ids'] ?? [],
                    'capitulos' => $manhwaData['capitulos'] ?? []
                ]
            ];
        } else {
            $search = $_GET['search'] ?? null;
            $generoId = isset($_GET['genero']) ? filter_input(INPUT_GET, 'genero', FILTER_VALIDATE_INT) : null;
            
            $manhwas = $manhwa->obtenerTodosConGeneros($search, $generoId);
            
            $response = [
                'success' => true,
                'data' => array_map(function($m) {
                    return [
                        'id' => $m['id'],
                        'titulo' => $m['titulo'],
                        'autor' => $m['autor'],
                        'descripcion' => $m['descripcion'],
                        'estado' => $m['estado'],
                        'fecha_publicacion' => $m['fecha_publicacion'],
                        'portada_url' => $m['portada_url'],
                        'generos' => $m['generos'] ?? [],
                        'generos_ids' => $m['generos_ids'] ?? []
                    ];
                }, $manhwas)
            ];
        }
        
        echo json_encode($response);
    } else {
        throw new Exception("Método no permitido", 405);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos',
        'error_details' => $e->getMessage() // Solo en desarrollo
    ]);
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
<?php
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once("../../../config/db.php");
require_once('../../../models/Manhwa.php');

$db = new Database();
$conn = $db->connect();
$manhwa = new Manhwa($conn);

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $search = $_GET['search'] ?? null;
        $generoId = $_GET['genero'] ?? null;
        
        $manhwas = $manhwa->obtenerTodosConGeneros($search, $generoId);
        
        // Prepara la respuesta en el formato esperado por React
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
                    'generos' => $m['generos'] ?? [], // Ya viene procesado del modelo
                    'generos_ids' => $m['generos_ids'] ?? []
                ];
            }, $manhwas)
        ];
        
        echo json_encode($response);
    } else {
        throw new Exception("Método no permitido", 405);
    }
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept");
    exit(0);
}
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

// Incluir las clases necesarias
require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../models/Manhwa.php'; // Asegúrate de que la ruta sea correcta
require_once __DIR__ . '/../../../models/Capitulo.php'; // Asegúrate de que la ruta sea correcta

$db = new Database();
$conn = $db->connect();
$manhwa = new Manhwa($conn);
$capitulo = new Capitulo($conn);

try {
    // FUNCIONES AUXILIARES
    function obtenerGeneros($conn, $manhwa_id) {
        $stmt = $conn->prepare("
            SELECT g.nombre
            FROM generos g
            INNER JOIN manhwa_genre mg ON g.id = mg.genero_id
            WHERE mg.manhwa_id = ?
        ");
        $stmt->execute([$manhwa_id]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    function contarCapitulos($conn, $manhwa_id) {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM capitulos WHERE manhwa_id = ?");
        $stmt->execute([$manhwa_id]);
        return (int) $stmt->fetchColumn();
    }

    // NUEVOS CAPÍTULOS
    $queryCapitulos = "
        SELECT c.id AS capitulo_id, c.numero, c.fecha_publicacion, c.titulo AS capitulo_titulo, 
               m.id AS manhwa_id, m.titulo AS manhwa_titulo, m.portada_url, m.estado
        FROM capitulos c
        INNER JOIN manhwas m ON c.manhwa_id = m.id
        ORDER BY c.fecha_publicacion DESC
        LIMIT 10
    ";
    
    $stmt = $conn->query($queryCapitulos);
    $capitulos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($capitulos as &$cap) {
        $cap['generos'] = obtenerGeneros($conn, $cap['manhwa_id']);
        $cap['total_capitulos'] = contarCapitulos($conn, $cap['manhwa_id']);
    }

    // NUEVOS MANHWAS
    $manhwas = $manhwa->obtenerTodosConGeneros(); // Usamos el método de la clase Manhwa
    
    // Ordenar por fecha de publicación descendente y limitar a 10
    usort($manhwas, function($a, $b) {
        return strtotime($b['fecha_publicacion']) - strtotime($a['fecha_publicacion']);
    });
    $manhwas = array_slice($manhwas, 0, 10);

    // Agregar conteo de capítulos a los manhwas
    foreach ($manhwas as &$m) {
        $m['total_capitulos'] = contarCapitulos($conn, $m['id']);
    }

    echo json_encode([
        "nuevos_capitulos" => $capitulos,
        "nuevos_manhwas" => $manhwas
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al conectar a la base de datos: " . $e->getMessage()]);
}
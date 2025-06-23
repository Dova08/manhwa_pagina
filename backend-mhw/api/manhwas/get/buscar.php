<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Para manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../../../config/db.php';
require_once __DIR__ . '/../../../models/Manhwa.php';

$db = new Database();
$conn = $db->connect();
$manhwa = new Manhwa($conn);

try {
    $query = $_GET['q'] ?? '';
    $query = trim($query);
    
    if (empty($query)) {
        http_response_code(400);
        echo json_encode(["error" => "Query parameter is required"]);
        exit;
    }

    // Búsqueda mejorada con parámetros únicos
    $sql = "SELECT * FROM manhwas 
            WHERE titulo = :exact
            OR titulo LIKE :start 
            OR titulo LIKE :contain
            ORDER BY 
                CASE 
                    WHEN titulo = :exact2 THEN 0
                    WHEN titulo LIKE :start2 THEN 1 
                    ELSE 2 
                END
            LIMIT 20";
    
    $stmt = $conn->prepare($sql);
    
    $exact = $query;
    $start = "$query%";
    $contain = "%$query%";
    
    // Vincular parámetros (nota que usamos nombres diferentes para los parámetros duplicados)
    $stmt->bindParam(':exact', $exact);
    $stmt->bindParam(':start', $start);
    $stmt->bindParam(':contain', $contain);
    $stmt->bindParam(':exact2', $exact);
    $stmt->bindParam(':start2', $start);
    
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results ?: []);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
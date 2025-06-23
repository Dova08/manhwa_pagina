<?php
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once(__DIR__ . '/../../../config/db.php');
require_once(__DIR__ . '/../../../config/cors.php');

// 1. Validar que el ID existe
if (empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "ID no especificado",
        "hint" => "Agrega ?id=5 al final de la URL"
    ]);
    exit;
}

// 2. Conectar a la base de datos
$db = new Database();
$conn = $db->getConnection();

// 3. Buscar el capítulo con información del manhwa
$stmt = $conn->prepare("
    SELECT c.*, m.titulo AS manhwa_titulo 
    FROM capitulos c
    JOIN manhwas m ON c.manhwa_id = m.id
    WHERE c.id = ?
");
$stmt->execute([$_GET['id']]);
$capitulo = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$capitulo) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Capítulo no encontrado"]);
    exit;
}

// 4. Obtener las imágenes del capítulo
$imagenes = json_decode($capitulo['imagenes'], true);

if (empty($imagenes)) {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "No hay imágenes disponibles para este capítulo"]);
    exit;
}

// 5. Función para extraer el número de la imagen para ordenar
function extractImageNumber($imageUrl) {
    // Extraer el número del formato "1-683f9e0ed1224-1.jpg"
    $parts = explode('/', $imageUrl);
    $filename = end($parts);
    $numberPart = explode('-', $filename)[0];
    return (int)$numberPart;
}

// 6. Ordenar las imágenes por su número
usort($imagenes, function($a, $b) {
    return extractImageNumber($a) - extractImageNumber($b);
});

// 7. Devolver la respuesta con las imágenes ordenadas
echo json_encode([
    "success" => true,
    "data" => [
        "titulo" => $capitulo['manhwa_titulo'] . " - Capítulo " . $capitulo['numero'],
        "numero" => $capitulo['numero'],
        "imagenes" => $imagenes,
        "total_imagenes" => count($imagenes),
        "fecha_publicacion" => $capitulo['fecha_publicacion']
    ]
]);
?>
<?php
require_once("../../../config/db.php");
require_once("../../../config/cors.php");

$db = new Database();
$conn = $db->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $sql = "UPDATE manhwas SET titulo = ?, autor = ?, descripcion = ?, imagen_portada = ?, fecha_creacion = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute([
        $data['titulo'], $data['autor'], $data['descripcion'],
        $data['imagen_portada'], $data['fecha_creacion'], $data['id']
    ]);
    echo json_encode(["success" => $result]);
} else {
    echo json_encode(["error" => "ID no especificado"]);
}
?>

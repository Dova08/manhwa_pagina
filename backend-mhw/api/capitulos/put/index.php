<?php
require_once("../../../config/db.php");
require_once("../../../config/cors.php");

$db = new Database();
$conn = $db->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $sql = "UPDATE capitulos SET manhwa_id = ?, numero = ?, titulo = ?, fecha_publicacion = ?, contenido = ?, pdf_path = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute([
        $data['manhwa_id'], $data['numero'], $data['titulo'],
        $data['fecha_publicacion'], $data['contenido'], $data['pdf_path'], $data['id']
    ]);
    echo json_encode(["success" => $result]);
} else {
    echo json_encode(["error" => "ID no especificado"]);
}
?>

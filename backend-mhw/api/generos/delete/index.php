<?php
require_once("../../../config/db.php");
require_once("../../../config/cors.php");

$db = new Database();
$conn = $db->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $stmt = $conn->prepare("DELETE FROM generos WHERE id = ?");
    $result = $stmt->execute([$data['id']]);
    echo json_encode(["success" => $result]);
} else {
    echo json_encode(["error" => "ID no especificado"]);
}
?>

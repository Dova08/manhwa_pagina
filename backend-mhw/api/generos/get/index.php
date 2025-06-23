<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
require_once("../../../config/db.php");

$db = new Database();
$conn = $db->getConnection();

$stmt = $conn->prepare("SELECT * FROM generos");
$stmt->execute();

$generos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($generos);
?>

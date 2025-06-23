<?php
header("Content-Type: application/json");
require_once("../../../config/db.php");
header("Access-Control-Allow-Origin: *");

$db = new Database();
$conn = $db->connect();

$stmt = $conn->prepare("SELECT * FROM manhwas");
$stmt->execute();

$manhwas = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($manhwas);
?>

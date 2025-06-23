<?php
class ManhwaGenero {
    private $db; // PDO

    public function __construct(PDO $db) { // Type-hint para PDO
        $this->db = $db;
    }

    // Obtener todos los géneros de un manhwa
    public function getGenerosByManhwa($manhwa_id) {
        $query = "SELECT g.id, g.nombre 
                  FROM generos g 
                  JOIN manhwa_genre mg ON g.id = mg.genero_id 
                  WHERE mg.manhwa_id = ?";
        
        $stmt = $this->db->prepare($query);
        $stmt->execute([$manhwa_id]);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Añadir un género a un manhwa
    public function addGenero($manhwa_id, $genero_id) {
        // Verificar si la relación ya existe
        $checkQuery = "SELECT 1 FROM manhwa_genre WHERE manhwa_id = ? AND genero_id = ?";
        $checkStmt = $this->db->prepare($checkQuery);
        $checkStmt->execute([$manhwa_id, $genero_id]);
        
        if ($checkStmt->fetch()) {
            return true; // La relación ya existe
        }
        
        // Crear la relación
        $query = "INSERT INTO manhwa_genre (manhwa_id, genero_id) VALUES (?, ?)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$manhwa_id, $genero_id]);
    }

    // Eliminar un género de un manhwa
    public function removeGenero($manhwa_id, $genero_id) {
        $query = "DELETE FROM manhwa_genre WHERE manhwa_id = ? AND genero_id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$manhwa_id, $genero_id]);
    }
}
?>
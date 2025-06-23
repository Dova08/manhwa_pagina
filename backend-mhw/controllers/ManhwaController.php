<?php
require_once __DIR__ . '/../models/ManhwaGenero.php';

class ManhwaController {
    private $db; // Ahora esto será un objeto PDO directamente
    private $manhwaGenero;

    public function __construct(PDO $db) { // Type-hint para PDO
        $this->db = $db;
        $this->manhwaGenero = new ManhwaGenero($db);
    }

    // Obtener todos los manhwas
    public function getAll() {
        try {
            $query = "SELECT id, titulo, autor, descripcion, estado, fecha_publicacion, portada_url, created_at, updated_at 
                      FROM manhwas";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            
            $manhwas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($manhwas as &$manhwa) {
                $manhwa['generos'] = $this->manhwaGenero->getGenerosByManhwa($manhwa['id']);
            }
            
            return $manhwas;
        } catch (PDOException $e) {
            error_log("Error en ManhwaController::getAll(): " . $e->getMessage());
            return []; // O lanza la excepción según tu flujo
        }
    }

    // Obtener un manhwa por ID
    public function getOne($id) {
        $query = "SELECT id, titulo, autor, descripcion, estado, fecha_publicacion, portada_url, created_at, updated_at 
                  FROM manhwas WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$id]);
        
        $manhwa = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$manhwa) {
            return null;
        }
        
        $manhwa['generos'] = $this->manhwaGenero->getGenerosByManhwa($id);
        
        return $manhwa;
    }

    // Obtener manhwas por categoría/género
    public function getByCategory($category) {
        $query = "SELECT m.id, m.titulo, m.autor, m.descripcion, m.estado, m.fecha_publicacion, m.portada_url 
                  FROM manhwas m 
                  JOIN manhwa_genre mg ON m.id = mg.manhwa_id 
                  JOIN generos g ON mg.genero_id = g.id 
                  WHERE g.nombre = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$category]);
        
        $manhwas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($manhwas as &$manhwa) {
            $manhwa['generos'] = $this->manhwaGenero->getGenerosByManhwa($manhwa['id']);
        }
        
        return $manhwas;
    }

    // Crear un nuevo manhwa (con transacción)
    public function create($data) {
        $this->db->beginTransaction();
        
        try {
            // Insertar el manhwa básico
            $query = "INSERT INTO manhwas (titulo, autor, descripcion, estado, fecha_publicacion, portada_url) 
                      VALUES (:titulo, :autor, :descripcion, :estado, :fecha_publicacion, :portada_url)";
            
            $stmt = $this->db->prepare($query);
            $stmt->execute([
                ':titulo' => $data['titulo'],
                ':autor' => $data['autor'],
                ':descripcion' => $data['descripcion'] ?? null,
                ':estado' => $data['estado'] ?? 'En curso',
                ':fecha_publicacion' => $data['fecha_publicacion'] ?? date('Y-m-d'),
                ':portada_url' => $data['portada_url'] ?? null
            ]);
            
            $manhwa_id = $this->db->lastInsertId();
            
            // Asociar géneros
            if (!empty($data['generos'])) {
                foreach ($data['generos'] as $genero_id) {
                    if (!$this->manhwaGenero->addGenero($manhwa_id, $genero_id)) {
                        throw new Exception("Error al asociar género ID: $genero_id");
                    }
                }
            }
            
            $this->db->commit();
            
            return [
                'success' => true,
                'message' => 'Manhwa creado exitosamente',
                'id' => $manhwa_id,
                'portada_url' => $data['portada_url'] ?? null
            ];
            
        } catch (Exception $e) {
            $this->db->rollBack();
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    // Actualizar la URL de la portada
    public function updatePortada($manhwa_id, $portada_url) {
        $query = "UPDATE manhwas SET portada_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$portada_url, $manhwa_id]);
    }
}
?>
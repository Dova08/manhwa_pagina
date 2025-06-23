<?php
class Manhwa {
    private $conn;
    private $table = 'manhwas';

    public function __construct($db) {
        $this->conn = $db;
    }

    
    public function obtenerTodosConGeneros(?string $search = null, ?int $generoId = null): array {
        $query = "SELECT 
                    m.id, 
                    m.titulo, 
                    m.autor, 
                    m.descripcion, 
                    m.estado, 
                    m.fecha_publicacion, 
                    m.portada_url,
                    GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
                    GROUP_CONCAT(DISTINCT g.id SEPARATOR ', ') AS generos_ids
                  FROM {$this->table} m
                  LEFT JOIN manhwa_genre mg ON m.id = mg.manhwa_id
                  LEFT JOIN generos g ON mg.genero_id = g.id
                  WHERE 1=1";

        $params = [];

        
        
        if ($search) {
            $query .= " AND (m.titulo LIKE :search OR m.autor LIKE :search OR m.descripcion LIKE :search)";
            $params[':search'] = "%$search%";
        }
        
        if ($generoId) {
            $query .= " AND g.id = :genero_id";
            $params[':genero_id'] = $generoId;
        }
        
        $query .= " GROUP BY m.id ORDER BY m.titulo";
        
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        
        $manhwas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return array_map(function($manhwa) {
            $manhwa['generos'] = $manhwa['generos'] ? explode(', ', $manhwa['generos']) : [];
            $manhwa['generos_ids'] = $manhwa['generos_ids'] ? array_map('intval', explode(', ', $manhwa['generos_ids'])) : [];
            $manhwa['portada_url'] = $manhwa['portada_url'] ?: 'https://via.placeholder.com/300x400?text=No+Image';
            return $manhwa;
        }, $manhwas);
    }
  
    public function listarManhwas() {
        $query = "SELECT id, titulo FROM manhwas ORDER BY titulo";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorIdConCapitulos($id) {
        $sql = "SELECT m.*, 
                       GROUP_CONCAT(DISTINCT g.nombre) AS generos,
                       GROUP_CONCAT(DISTINCT g.id) AS generos_ids
                FROM manhwas m
                LEFT JOIN manhwa_genre mg ON m.id = mg.manhwa_id
                LEFT JOIN generos g ON g.id = mg.genero_id
                WHERE m.id = :id
                GROUP BY m.id";
    
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $manhwa = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if (!$manhwa) return false;
    
        // Obtener capítulos del manhwa
        $sqlCap = "SELECT id, manhwa_id, numero, titulo, fecha_publicacion, imagenes
                   FROM capitulos
                   WHERE manhwa_id = :id
                   ORDER BY numero ASC";
    
        $stmtCap = $this->conn->prepare($sqlCap);
        $stmtCap->bindParam(':id', $id, PDO::PARAM_INT);
        $stmtCap->execute();
        $capitulos = [];
    
        while ($row = $stmtCap->fetch(PDO::FETCH_ASSOC)) {
            $row['imagenes'] = json_decode($row['imagenes'], true); // <- ¡IMPORTANTE!
            $capitulos[] = $row;
        }
    
        return [
            'id' => $manhwa['id'],
            'titulo' => $manhwa['titulo'],
            'autor' => $manhwa['autor'],
            'descripcion' => $manhwa['descripcion'],
            'estado' => $manhwa['estado'],
            'fecha_publicacion' => $manhwa['fecha_publicacion'],
            'portada_url' => $manhwa['portada_url'],
            'generos' => explode(',', $manhwa['generos']),
            'generos_ids' => array_map('intval', explode(',', $manhwa['generos_ids'])),
            'capitulos' => $capitulos
        ];
    }
    
}
    

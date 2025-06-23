<?php
class Capitulo {
    private $conn;
    private $table = "capitulos";

    // Propiedades públicas para binding
    public $id;
    public $manhwa_id;
    public $numero;
    public $titulo;
    public $fecha_publicacion;
    public $contenido;
    public $imagenes;
    public $num_imagenes;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Verifica si un capítulo existe
    public function capituloExiste($id) {
        $query = "SELECT id FROM {$this->table} WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->rowCount() > 0;
    }

    // Obtener todos los capítulos con información del manhwa
    public function obtenerCapitulos($filtros = []) {
        $query = "SELECT c.*, m.titulo AS manhwa_titulo FROM capitulos c 
                  JOIN manhwas m ON c.manhwa_id = m.id";
        
        if (isset($filtros['manhwa_id'])) {
            $query .= " WHERE c.manhwa_id = :manhwa_id";
        }
        
        $stmt = $this->conn->prepare($query);
        
        if (isset($filtros['manhwa_id'])) {
            $stmt->bindValue(':manhwa_id', $filtros['manhwa_id'], PDO::PARAM_INT);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Obtener un capítulo específico por ID
    public function obtenerCapituloPorId($id) {
        $query = "SELECT c.*, m.titulo AS manhwa_titulo, m.portada_url 
                  FROM {$this->table} c
                  INNER JOIN manhwas m ON c.manhwa_id = m.id
                  WHERE c.id = :id LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un nuevo capítulo
    public function crearCapitulo($data) {
        $query = "INSERT INTO {$this->table} 
                 (manhwa_id, numero, titulo, fecha_publicacion, contenido, imagenes, num_imagenes)
                 VALUES (:manhwa_id, :numero, :titulo, :fecha_publicacion, :contenido, :imagenes, :num_imagenes)";
    
        $stmt = $this->conn->prepare($query);
    
        $fecha = $data['fecha_publicacion'] ?? date('Y-m-d');
        $contenido = $data['contenido'] ?? '';
        $imagenes = $data['imagenes'] ?? '[]';
        $numImagenes = $data['num_imagenes'] ?? 0;
    
        $stmt->bindParam(':manhwa_id', $data['manhwa_id'], PDO::PARAM_INT);
        $stmt->bindParam(':numero', $data['numero'], PDO::PARAM_STR);
        $stmt->bindParam(':titulo', $data['titulo'], PDO::PARAM_STR);
        $stmt->bindParam(':fecha_publicacion', $fecha, PDO::PARAM_STR);
        $stmt->bindParam(':contenido', $contenido, PDO::PARAM_STR);
        $stmt->bindParam(':imagenes', $imagenes, PDO::PARAM_STR);
        $stmt->bindParam(':num_imagenes', $numImagenes, PDO::PARAM_INT);
    
        return $stmt->execute();
    }

    /**
     * Actualiza el orden de las imágenes de un capítulo con transacción segura
     * @param int $capituloId ID del capítulo
     * @param array $newOrder Nuevo orden de las imágenes (array de URLs)
     * @return bool True si se actualizó correctamente
     */
    public function actualizarOrdenImagenes($capituloId, array $newOrder) {
        // Iniciar transacción para operación atómica
        $this->conn->beginTransaction();
        
        try {
            // Validar que el capítulo exista
            $capituloActual = $this->obtenerCapituloPorId($capituloId);
            if (!$capituloActual) {
                throw new Exception("El capítulo no existe");
            }

            // Validar que el nuevo orden tenga el mismo número de elementos
            $imagenesActuales = json_decode($capituloActual['imagenes'], true);
            if (count($newOrder) !== count($imagenesActuales)) {
                throw new Exception("El número de imágenes no coincide");
            }

            // Validar que todas las URLs existan en el capítulo actual
            $diferencias = array_diff($newOrder, $imagenesActuales);
            if (!empty($diferencias)) {
                throw new Exception("Algunas imágenes no pertenecen al capítulo");
            }

            // Validar que no haya URLs duplicadas en el nuevo orden
            if (count($newOrder) !== count(array_unique($newOrder))) {
                throw new Exception("No se permiten imágenes duplicadas en el orden");
            }

            // Actualizar en la base de datos
            $query = "UPDATE {$this->table} SET 
                     imagenes = :imagenes, 
                     num_imagenes = :num_imagenes,
                     updated_at = NOW()
                     WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);
            
            $imagenesJson = json_encode($newOrder);
            $numImagenes = count($newOrder);
            
            $stmt->bindParam(':imagenes', $imagenesJson);
            $stmt->bindParam(':num_imagenes', $numImagenes, PDO::PARAM_INT);
            $stmt->bindParam(':id', $capituloId, PDO::PARAM_INT);
            
            $resultado = $stmt->execute();
            
            if (!$resultado) {
                throw new Exception("Error al actualizar el orden en la base de datos");
            }
            
            // Confirmar la transacción
            $this->conn->commit();
            return true;
            
        } catch (Exception $e) {
            // Revertir la transacción en caso de error
            $this->conn->rollBack();
            error_log("Error al actualizar orden de imágenes: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Obtiene las imágenes de un capítulo en su orden actual
     * @param int $capituloId ID del capítulo
     * @return array|null Array de imágenes o null si no existe
     */
    public function obtenerImagenesCapitulo($capituloId) {
        $query = "SELECT imagenes FROM {$this->table} WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $capituloId, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? json_decode($result['imagenes'], true) : null;
    }

    /**
     * Agrega una nueva imagen al capítulo
     * @param int $capituloId ID del capítulo
     * @param string $imagenUrl URL de la imagen a agregar
     * @return bool True si se agregó correctamente
     */
    public function agregarImagen($capituloId, $imagenUrl) {
        $imagenes = $this->obtenerImagenesCapitulo($capituloId) ?? [];
        $imagenes[] = $imagenUrl;
        
        return $this->actualizarOrdenImagenes($capituloId, $imagenes);
    }

    /**
     * Elimina una imagen del capítulo
     * @param int $capituloId ID del capítulo
     * @param string $imagenUrl URL de la imagen a eliminar
     * @return bool True si se eliminó correctamente
     */
    public function eliminarImagen($capituloId, $imagenUrl) {
        $imagenes = $this->obtenerImagenesCapitulo($capituloId);
        if ($imagenes === null) return false;
        
        $nuevasImagenes = array_filter($imagenes, function($img) use ($imagenUrl) {
            return $img !== $imagenUrl;
        });
        
        return $this->actualizarOrdenImagenes($capituloId, array_values($nuevasImagenes));
    }
}
?>
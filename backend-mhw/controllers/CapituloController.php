<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/Capitulo.php';

class CapituloController {
    private $capitulo;

    public function __construct(PDO $pdoConnection) {
        $this->capitulo = new Capitulo($pdoConnection);
    }

    public function manejarSolicitud($metodo, $datos) {
        header('Content-Type: application/json');
        
        try {
            switch ($metodo) {
                case 'GET':
                    $this->manejarGet();
                    break;
                case 'POST':
                    $this->manejarPost();
                    break;
                default:
                    http_response_code(405);
                    echo json_encode([
                        "success" => false,
                        "mensaje" => "Método no permitido"
                    ]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "mensaje" => "Error de base de datos",
                "error" => $e->getMessage()
            ]);
            error_log("PDOException en CapituloController: " . $e->getMessage());
        }
    }
    
    private function manejarGet() {
        if (isset($_GET['id'])) {
            $capitulo = $this->capitulo->obtenerCapituloPorId($_GET['id']);
            
            if ($capitulo) {
                echo json_encode([
                    "success" => true,
                    "data" => $capitulo
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "mensaje" => "Capítulo no encontrado"
                ]);
            }
        } else {
            $filtros = [];
            
            if (isset($_GET['manhwa_id'])) {
                $filtros['manhwa_id'] = (int)$_GET['manhwa_id'];
            }
            
            // Usar obtenerCapitulos() con filtros o sin ellos
            $capitulos = $this->capitulo->obtenerCapitulos($filtros);
            echo json_encode([
                "success" => true,
                "data" => $capitulos
            ]);
        }
    }


    private function manejarPost() {
        if (!isset($_FILES['pdf'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "mensaje" => "No se envió ningún archivo PDF"
            ]);
            return;
        }

        $archivo = $_FILES['pdf'];
        
        // Validaciones adicionales
        if ($archivo['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "mensaje" => "Error al subir el archivo: " . $this->getUploadError($archivo['error'])
            ]);
            return;
        }

        // Validar tipo de archivo
        $mimeValidos = ['application/pdf', 'application/x-pdf'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $archivo['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mime, $mimeValidos)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "mensaje" => "Solo se permiten archivos PDF"
            ]);
            return;
        }

        $nombreSeguro = bin2hex(random_bytes(8)) . '_' . preg_replace('/[^a-zA-Z0-9\.\-]/', '_', $archivo['name']);
        $rutaDestino = __DIR__ . "/../public/upload/" . $nombreSeguro;

        if (!move_uploaded_file($archivo['tmp_name'], $rutaDestino)) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "mensaje" => "Error al mover el archivo"
            ]);
            return;
        }

        $data = [
            'manhwa_id' => filter_input(INPUT_POST, 'manhwa_id', FILTER_VALIDATE_INT),
            'numero' => filter_input(INPUT_POST, 'numero', FILTER_SANITIZE_STRING),
            'titulo' => filter_input(INPUT_POST, 'titulo', FILTER_SANITIZE_STRING),
            'fecha_publicacion' => filter_input(INPUT_POST, 'fecha_publicacion', FILTER_SANITIZE_STRING) ?? date('Y-m-d'),
            'contenido' => filter_input(INPUT_POST, 'contenido', FILTER_SANITIZE_STRING) ?? '',
            'pdf_path' => $rutaDestino
        ];

        if ($data['manhwa_id'] === false || $data['manhwa_id'] === null) {
            unlink($rutaDestino);
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "mensaje" => "ID de manhwa inválido"
            ]);
            return;
        }

        $resultado = $this->capitulo->crearCapitulo($data);
        
        if ($resultado['success']) {
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "mensaje" => "Capítulo creado correctamente",
                "data" => [
                    'id' => $resultado['id'],
                    'pdf_url' => '/upload/' . basename($rutaDestino) // Ruta pública
                ]
            ]);
        } else {
            unlink($rutaDestino);
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "mensaje" => $resultado['mensaje'] ?? "Error al guardar en la base de datos"
            ]);
        }
    }

    private function getUploadError($code) {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'El archivo excede el tamaño permitido',
            UPLOAD_ERR_FORM_SIZE => 'El archivo excede el tamaño permitido',
            UPLOAD_ERR_PARTIAL => 'El archivo solo se subió parcialmente',
            UPLOAD_ERR_NO_FILE => 'No se seleccionó ningún archivo',
            UPLOAD_ERR_NO_TMP_DIR => 'Falta la carpeta temporal',
            UPLOAD_ERR_CANT_WRITE => 'No se pudo escribir el archivo en disco',
            UPLOAD_ERR_EXTENSION => 'Una extensión de PHP detuvo la subida'
        ];
        return $errors[$code] ?? 'Error desconocido';
    }
}
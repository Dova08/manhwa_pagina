<?php
// Configuración de errores (mejorada)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');
ini_set('upload_max_filesize', '20M');
ini_set('post_max_size', '25M');
ini_set('max_execution_time', '300');
ini_set('max_input_time', '300');
ini_set('memory_limit', '256M');

// Configuración CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Manejo de solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // 1. Verificación de archivos requeridos
    $requiredFiles = [
    __DIR__ . '/../../../controllers/ManhwaController.php',
    __DIR__ . '/../../../models/ManhwaGenero.php',
    __DIR__ . '/../../../config/db.php'
    ];
    
    foreach ($requiredFiles as $file) {
        if (!file_exists($file)) {
            throw new Exception("Archivo requerido no encontrado: $file");
        }
        require_once $file;
    }

    // 2. Conexión a base de datos CORREGIDA
    $database = new Database();
    $pdoConnection = $database->connect();  // Obtenemos la conexión PDO
    
    if (!$pdoConnection) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Pasamos la conexión PDO al controlador
    $controller = new ManhwaController($pdoConnection);

    // Logging de solicitud
    error_log("Solicitud recibida: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI']);

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) {
                $result = $controller->getOne($_GET['id']);
            } elseif (isset($_GET['category'])) {
                $result = $controller->getByCategory($_GET['category']);
            } else {
                $result = $controller->getAll();
            }
            
            http_response_code(200);
            echo json_encode($result);
            break;

        case 'POST':
            $data = [];
            $portada_file = null;
            
            $base_url = "http://localhost:8060";
            $web_path = '/backend-mhw/public/uploads/portadas/';
            $upload_dir = __DIR__ . '/../../../public/uploads/portadas/';
            
            if (!empty($_FILES['portada'])) {
                if (!isset($_POST['data'])) {
                    throw new Exception('Datos JSON faltantes en la solicitud multipart');
                }
                $data = json_decode($_POST['data'], true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
                }
                $portada_file = $_FILES['portada'];
            } else {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
                }
            }
            
            // Validación de datos (se mantiene igual)
            // ... [todo el resto del código POST permanece igual] ...
            
                
                // Validación de datos
                if (empty($data['titulo']) || !is_string($data['titulo'])) {
                    throw new Exception('Título inválido o vacío');
                }
                if (empty($data['autor']) || !is_string($data['autor'])) {
                    throw new Exception('Autor inválido o vacío');
                }
                if (empty($data['generos']) || !is_array($data['generos'])) {
                    throw new Exception('Géneros inválidos - debe ser un array');
                }
            
                // Verificación de directorio
                if (!file_exists($upload_dir)) {
                    if (!mkdir($upload_dir, 0755, true)) {
                        throw new Exception('No se pudo crear el directorio de uploads');
                    }
                } elseif (!is_writable($upload_dir)) {
                    throw new Exception('El directorio de uploads no tiene permisos de escritura');
                }
            
                // Procesar la creación del manhwa (la transacción está dentro del controlador)
                $result = $controller->create([
                    'titulo' => $data['titulo'],
                    'autor' => $data['autor'],
                    'descripcion' => $data['descripcion'] ?? null,
                    'estado' => $data['estado'] ?? null,
                    'fecha_publicacion' => $data['fecha_publicacion'] ?? null,
                    'generos' => $data['generos'],
                    'portada_url' => $data['portada_url'] ?? null
                ]);
                
                if (!$result['success']) {
                    throw new Exception($result['message']);
                }
                
                $manhwa_id = $result['id'];
                $portada_url = $result['portada_url'] ?? null;
                
                // Manejo de imagen (si se envió como archivo)
              
                if ($portada_file && $portada_file['error'] === UPLOAD_ERR_OK) {
                    try {
                        // 1. Validación de tamaño (lo primero que se comprueba)
                        if ($portada_file['size'] > 20 * 1024 * 1024) {
                            throw new Exception('El archivo excede el límite de 20MB');
                        }
                        
                        // 2. Validación de tipo MIME
                        $valid_mime_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                        $file_info = finfo_open(FILEINFO_MIME_TYPE);
                        $mime_type = finfo_file($file_info, $portada_file["tmp_name"]);
                        finfo_close($file_info);
                        
                        if (!in_array($mime_type, $valid_mime_types)) {
                            throw new Exception('Tipo de archivo no permitido. Solo se aceptan JPEG, PNG, GIF y WebP.');
                        }

                        // 3. Validación de extensión
                        $imageFileType = strtolower(pathinfo($portada_file["name"], PATHINFO_EXTENSION));
                        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
                        if (!in_array($imageFileType, $allowedTypes)) {
                            throw new Exception('Solo se permiten archivos JPG, JPEG, PNG, GIF y WebP.');
                        }
                        
                        // 4. Generar nombre único seguro
                        $new_filename = 'manhwa_' . $manhwa_id . '_' . bin2hex(random_bytes(8)) . '.' . $imageFileType;
                        $target_file = $upload_dir . $new_filename;
                        
                        // 5. Copia segura del archivo
                        $in = fopen($portada_file["tmp_name"], "rb");
                        $out = fopen($target_file, "wb");
                        
                        if (!$in || !$out) {
                            throw new Exception('Error al abrir los archivos para escritura');
                        }
                        
                        // Copia por chunks (fragmentos)
                        while (!feof($in)) {
                            $chunk = fread($in, 8192);
                            if ($chunk === false) {
                                throw new Exception('Error al leer el archivo subido');
                            }
                            if (fwrite($out, $chunk) === false) {
                                throw new Exception('Error al escribir el archivo de destino');
                            }
                        }
                        
                        fclose($in);
                        fclose($out);
                        
                        // 6. Verificación de integridad
                        if (filesize($target_file) !== $portada_file['size']) {
                            unlink($target_file);
                            throw new Exception('Error en la transferencia del archivo - tamaño no coincide');
                        }
                        
                        // 7. Verificación de que es realmente una imagen
                        if (!@getimagesize($target_file)) {
                            unlink($target_file);
                            throw new Exception('El archivo no es una imagen válida');
                        }
                        
                        // 8. Actualizar la portada en la base de datos
                        $portada_url = $base_url . $web_path . $new_filename;
                        if (!$controller->updatePortada($manhwa_id, $portada_url)) {
                            unlink($target_file);
                            throw new Exception('Error al actualizar la portada en la base de datos');
                        }
                        
                    } catch (Exception $e) {
                        error_log("Error al procesar imagen: " . $e->getMessage());
                        $portada_url = null;
                    }
                }
                
                http_response_code(201);
                echo json_encode([
                    'success' => true,
                    'message' => 'Manhwa creado exitosamente',
                    'manhwa_id' => $manhwa_id,
                    'portada_url' => $portada_url
                ]);
                break;

        default:
            http_response_code(405);
            echo json_encode(["message" => "Método no permitido"]);
            break;
    }

} catch (Exception $e) {
    if (strpos($e->getMessage(), 'exceeds the maximum upload size') !== false || 
    strpos($e->getMessage(), 'post_max_size') !== false ||
    strpos($e->getMessage(), 'El archivo excede el límite de 20MB') !== false) {
    http_response_code(413);
    $message = 'El archivo es demasiado grande. Límite: 20MB';
} else {
    $error_code = strpos($e->getMessage(), 'no encontrado') !== false ? 404 : 500;
    http_response_code($error_code);
    $message = $e->getMessage();
}

$error_response = [
    'success' => false,
    'message' => $message,
    'error_type' => get_class($e)
];

echo json_encode($error_response);

error_log("[" . date('Y-m-d H:i:s') . "] Error en manhwas.php: " . $e->getMessage() . "\n" .
          "Trace: " . $e->getTraceAsString() . "\n" .
          "Request: " . print_r([
              'method' => $_SERVER['REQUEST_METHOD'],
              'uri' => $_SERVER['REQUEST_URI'],
              'post' => $_POST,
              'files' => $_FILES
          ], true) . "\n\n");

}
?>
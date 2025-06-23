<?php
require_once '../../../config/db.php';
require_once '../../../models/Capitulo.php';
require_once '../../../models/Manhwa.php';
require_once '../../../config/cors.php';

// Manejo de preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Manejo de GET para listar manhwas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db = new Database();
    $conn = $db->connect();
    $manhwa = new Manhwa($conn);
    
    try {
        $manhwas = $manhwa->listarManhwas();
        $response = array_map(function($m) {
            return [
                'id' => $m['id'],
                'titulo' => $m['titulo']
            ];
        }, $manhwas);
        
        echo json_encode($response);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener la lista de manhwas']);
    }
    exit;
}

// Manejo de POST para crear capítulo (código original)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificación de campos obligatorios
    if (empty($_POST['manhwa_id']) || empty($_POST['numero']) || empty($_POST['titulo']) || empty($_FILES['imagenes'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos obligatorios o están vacíos']);
        exit;
    }

    // Configuración de parámetros
    $manhwaId = $_POST['manhwa_id'];
    $MAX_FILE_SIZE = 10485760; // 10MB por imagen
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    $imagePaths = [];

    // Directorio base para subir imágenes
    $uploadBaseDir = __DIR__ . '/../../../public/uploads/images/' . $manhwaId . '/';
    $capituloDir = $uploadBaseDir . 'capitulo' . $_POST['numero'] . '/';

    // Crear directorios si no existen
    if (!is_dir($uploadBaseDir)) {
        mkdir($uploadBaseDir, 0777, true);
    }
    if (!is_dir($capituloDir)) {
        mkdir($capituloDir, 0777, true);
    }

    // Procesar múltiples imágenes
    if (is_array($_FILES['imagenes']['name'])) {
        // Subida múltiple
        $fileCount = count($_FILES['imagenes']['name']);
        
        for ($i = 0; $i < $fileCount; $i++) {
            // Verificar errores
            if ($_FILES['imagenes']['error'][$i] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode(['error' => 'Error al subir la imagen: ' . $_FILES['imagenes']['error'][$i]]);
                exit;
            }
            
            // Verificar tipo de archivo
            $fileType = mime_content_type($_FILES['imagenes']['tmp_name'][$i]);
            if (!in_array($fileType, $allowedTypes)) {
                http_response_code(400);
                echo json_encode(['error' => 'Tipo de archivo no permitido: ' . $fileType]);
                exit;
            }
            
            // Verificar tamaño
            if ($_FILES['imagenes']['size'][$i] > $MAX_FILE_SIZE) {
                http_response_code(413);
                echo json_encode(['error' => 'La imagen excede el límite de 10MB']);
                exit;
            }
            
            // Generar nombre único para la imagen
            $originalName = preg_replace("/[^a-zA-Z0-9_\.-]/", "", basename($_FILES['imagenes']['name'][$i]));
            $imageName = ($i + 1) . '-' . uniqid() . '-' . $originalName;
            $imagePath = $capituloDir . $imageName;
            
            // Mover el archivo
            if (!move_uploaded_file($_FILES['imagenes']['tmp_name'][$i], $imagePath)) {
                http_response_code(500);
                echo json_encode(['error' => 'Error al mover la imagen']);
                exit;
            }
            
            // Guardar la URL de la imagen
            $imagePaths[] = "http://localhost:8060/backend-mhw/public/uploads/images/$manhwaId/capitulo" . $_POST['numero'] . "/$imageName";
        }
    } else {
        // Subida única (para compatibilidad)
        if ($_FILES['imagenes']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['error' => 'Error al subir la imagen: ' . $_FILES['imagenes']['error']]);
            exit;
        }
        
        // Verificar tipo de archivo
        $fileType = mime_content_type($_FILES['imagenes']['tmp_name']);
        if (!in_array($fileType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['error' => 'Tipo de archivo no permitido: ' . $fileType]);
            exit;
        }
        
        // Verificar tamaño
        if ($_FILES['imagenes']['size'] > $MAX_FILE_SIZE) {
            http_response_code(413);
            echo json_encode(['error' => 'La imagen excede el límite de 10MB']);
            exit;
        }
        
        // Generar nombre único para la imagen
        $originalName = preg_replace("/[^a-zA-Z0-9_\.-]/", "", basename($_FILES['imagenes']['name']));
        $imageName = '1-' . uniqid() . '-' . $originalName;
        $imagePath = $capituloDir . $imageName;
        
        // Mover el archivo
        if (!move_uploaded_file($_FILES['imagenes']['tmp_name'], $imagePath)) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al mover la imagen']);
            exit;
        }
        
        // Guardar la URL de la imagen
        $imagePaths[] = "http://localhost:8060/backend-mhw/public/uploads/images/$manhwaId/capitulo" . $_POST['numero'] . "/$imageName";
    }

    // Conectar a la base de datos y guardar el capítulo
    $db = new Database();
    $conn = $db->connect();
    $capitulo = new Capitulo($conn);

    $data = [
        'manhwa_id' => $manhwaId,
        'numero' => $_POST['numero'],
        'titulo' => $_POST['titulo'],
        'imagenes' => json_encode($imagePaths),
        'num_imagenes' => count($imagePaths),
        'fecha_publicacion' => $_POST['fecha_publicacion'] ?? date('Y-m-d'),
        'contenido' => $_POST['contenido'] ?? ''
    ];

    if ($capitulo->crearCapitulo($data)) {
        echo json_encode([
            'mensaje' => 'Capítulo creado con éxito',
            'imagenes' => $imagePaths,
            'num_imagenes' => count($imagePaths)
        ]);
    } else {
        // Eliminar imágenes subidas si falla la creación en la BD
        foreach ($imagePaths as $imagePath) {
            $localPath = str_replace('http://localhost:8060/backend-mhw/public', __DIR__ . '/../../../public', $imagePath);
            if (file_exists($localPath)) {
                unlink($localPath);
            }
        }
        http_response_code(500);
        echo json_encode(['error' => 'No se pudo crear el capítulo']);
    }
    exit;
}

// Si no es GET ni POST
http_response_code(405);
echo json_encode(['error' => 'Método no permitido']);
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba de Permisos</title>
    <style>
        .resultado {
            padding: 20px;
            margin: 20px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
        }
        .exito {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <header>
        <h1>Prueba de Permisos de Escritura</h1>
    </header> 

    <main>
        <?php
        $dir = __DIR__ . '/uploads/portadas/';
        
        // Verificar si la carpeta existe
        if (!file_exists($dir)) {
            echo '<div class="resultado error">';
            echo 'Error: La carpeta no existe.<br>';
            echo 'Ruta: ' . htmlspecialchars($dir);
            echo '</div>';
            
            // Intentar crear la carpeta
            if (mkdir($dir, 0755, true)) {
                echo '<div class="resultado exito">';
                echo 'Carpeta creada automáticamente con permisos 755.<br>';
                echo 'Ahora verifica los permisos:';
                echo '</div>';
            } else {
                echo '<div class="resultado error">';
                echo 'No se pudo crear la carpeta automáticamente.<br>';
                echo 'Debes crearla manualmente con permisos adecuados.';
                echo '</div>';
                exit();
            }
        }
        
        // Verificar permisos
        if (is_writable($dir)) {
            echo '<div class="resultado exito">';
            echo '✓ La carpeta tiene permisos de escritura.<br>';
            echo 'Ruta: ' . htmlspecialchars($dir);
            echo '</div>';
            
            // Prueba adicional: intentar crear un archivo temporal
            $archivo_prueba = $dir . 'test_permission.tmp';
            if (file_put_contents($archivo_prueba, 'prueba') !== false) {
                unlink($archivo_prueba); // Eliminar el archivo de prueba
                echo '<div class="resultado exito">';
                echo '✓ Prueba de escritura completada con éxito.';
                echo '</div>';
            } else {
                echo '<div class="resultado error">';
                echo '! Advertencia: No se pudo escribir un archivo de prueba.';
                echo '</div>';
            }
        } else {
            echo '<div class="resultado error">';
            echo '✗ Error: La carpeta NO tiene permisos de escritura.<br>';
            echo 'Ruta: ' . htmlspecialchars($dir) . '<br><br>';
            echo '<strong>Solución:</strong><br>';
            echo '1. En Linux/macOS ejecuta:<br>';
            echo '<code>chmod -R 755 ' . htmlspecialchars($dir) . '</code><br><br>';
            echo '2. En Windows, haz clic derecho en la carpeta → Propiedades → Seguridad<br>';
            echo 'y da permisos de escritura al usuario del servidor (IUSR o SYSTEM).';
            echo '</div>';
        }
        ?>
    </main>

    <footer>
        <p>Prueba de permisos - <?php echo date('Y-m-d H:i:s'); ?></p>
    </footer>
</body>
</html>
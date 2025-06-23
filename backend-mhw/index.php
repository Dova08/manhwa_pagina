<?php
// Verifica Ghostscript
exec('gs --version', $output, $returnCode);

if ($returnCode === 0) {
    echo "✅ Ghostscript instalado: " . $output[0];
} else {
    echo "❌ Ghostscript NO detectado.";
}

// Verifica Imagick
if (extension_loaded('imagick')) {
    echo "<br><br>🔹 Imagick está activado.";
    
    // Ruta absoluta recomendada (ajusta esto)
    $pdfPath = __DIR__ . '/public/uploads/pdfs/26/6824e5e6e0c39-capitulo2.pdf'; // Mismo directorio que el script
    
    if (file_exists($pdfPath)) {
        $imagick = new Imagick();
        try {
            $imagick->readImage($pdfPath);
            echo "<br>✅ Imagick puede procesar PDFs con Ghostscript.";
        } catch (ImagickException $e) {
            echo "<br>❌ Error en Imagick: " . $e->getMessage();
        }
    } else {
        echo "<br>❌ El archivo PDF no existe en: " . htmlspecialchars($pdfPath);
    }
} else {
    echo "<br>❌ Imagick NO está instalado.";
}
?>
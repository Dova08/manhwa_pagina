import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function ManhwaCapitulo() {
  const { manhwaId, capituloId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleImages, setVisibleImages] = useState([]);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  // Cargar datos del capítulo
  useEffect(() => {
    const fetchChapterData = async () => {
      if (!manhwaId || !capituloId) {
        setError("IDs no proporcionados");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Agregar parámetro de caché para evitar imágenes en caché
        const cacheBuster = new Date().getTime();
        const response = await fetch(
          `http://localhost:8060/backend-mhw/api/capitulos/get/imagenes.php?id=${capituloId}&cache=${cacheBuster}`
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.data || !Array.isArray(data.data.imagenes)) {
          throw new Error(data.message || 'Datos inválidos del capítulo');
        }

        setChapterData(data.data);
        
        // Precargar las primeras 3 imágenes inmediatamente
        data.data.imagenes.slice(0, 3).forEach((imagen) => {
          const img = new Image();
          img.src = `${imagen}?cache=${cacheBuster}`;
          img.onload = () => {
            setLoadedImages(prev => ({...prev, [imagen]: 'full'}));
            setVisibleImages(prev => [...prev, imagen]);
          };
          img.onerror = () => {
            console.error('Error al cargar imagen:', imagen);
          };
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching chapter data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [manhwaId, capituloId]);

  // Configurar Intersection Observer para lazy loading mejorado
  useEffect(() => {
  if (!chapterData?.imagenes || !containerRef.current) return;

  const options = {
    root: null,
    rootMargin: '500px',
    threshold: 0.01
  };

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const imgUrl = entry.target.dataset.src;
        if (!loadedImages[imgUrl]) {
          const img = new Image();
          img.src = imgUrl;
          img.onload = () => {
            setLoadedImages(prev => ({...prev, [imgUrl]: 'full'}));
            // No necesitas setVisibleImages si ya usas loadedImages
          };
          img.onerror = () => {
            console.error('Error al cargar imagen:', imgUrl);
            setLoadedImages(prev => ({...prev, [imgUrl]: 'error'}));
          };
          
          // Forzar la desconexión y reconexión del observer
          observerRef.current.unobserve(entry.target);
          observerRef.current.observe(entry.target);
        }
      }
    });
  };

  observerRef.current = new IntersectionObserver(handleIntersect, options);
  
  // Asegúrate de que los elementos tienen el atributo data-src
  const imageContainers = containerRef.current.querySelectorAll('.page-container');
  imageContainers.forEach((container, index) => {
    const imgUrl = chapterData.imagenes[index];
    container.setAttribute('data-src', imgUrl);
    observerRef.current.observe(container);
  });

  return () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };
}, [chapterData, loadedImages]);

  if (loading) return (
    <div className="loading" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.5rem'
    }}>
      Cargando capítulo...
    </div>
  );

  if (error) return (
    <div className="error" style={{
      color: 'red',
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem'
    }}>
      Error: {error}
    </div>
  );

  if (!chapterData || !chapterData.imagenes) return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem'
    }}>
      No se encontraron imágenes
    </div>
  );

  return (
    <div 
      className="manhwa-chapter-container" 
      style={{ 
        padding: '0',
        backgroundColor: '#f0f0f0', // Fondo similar a un libro
        maxWidth: '800px',
        margin: '0 auto'
      }}
      ref={containerRef}
    >
      <div style={{
        padding: '1rem',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '0.5rem',
          fontSize: '1.5rem'
        }}>{chapterData.titulo}</h1>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '0',
          color: '#666',
          fontSize: '1.2rem'
        }}>
          Capítulo {chapterData.numero}
        </h2>
      </div>

      <div className="image-viewer" style={{
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {chapterData.imagenes.map((imagen, index) => (
          <div
            key={`${imagen}-${index}`}
            className="page-container"
            style={{
              width: '100%',
              maxWidth: '100%',
              marginBottom: '0', // Eliminamos el espacio entre imágenes
              position: 'relative',
              borderBottom: '1px solid #e0e0e0', // Línea sutil entre imágenes
              backgroundColor: 'white' // Fondo blanco para cada imagen
            }}
          >
            {loadedImages[imagen] ? (
              <img
                src={imagen}
                alt={`Página ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block', // Elimina espacio debajo de la imagen
                  objectFit: 'contain',
                  transition: 'opacity 0.5s ease-in-out',
                  opacity: loadedImages[imagen] ? 1 : 0
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  // Mostrar placeholder de error si falla la carga
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '500px', // Altura aproximada mientras carga
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                color: '#999'
              }}>
                Cargando página {index + 1}...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManhwaCapitulo;
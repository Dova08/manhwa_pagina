import React, { useState, useEffect } from "react";

const Carrusel = () => {
  const [manhwas, setManhwas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para normalizar géneros
  const normalizeGenres = (generos) => {
    if (!generos) return ['Género no especificado'];
    
    if (Array.isArray(generos)) {
      return generos.map(g => g.nombre || g);
    }

    if (typeof generos === 'object' && generos !== null) {
      return [generos.nombre || 'Género no especificado'];
    }

    if (typeof generos === 'string') {
      return generos.split(", ");
    }

    return ['Género no especificado'];
  };

  // Función para extraer el array de manhwas de la respuesta
  const extractManhwasArray = (responseData) => {
    if (Array.isArray(responseData)) return responseData;
    if (responseData?.data && Array.isArray(responseData.data)) return responseData.data;
    if (responseData?.manhwas && Array.isArray(responseData.manhwas)) return responseData.manhwas;
    return [];
  };

  useEffect(() => {
    const fetchManhwas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:8060/backend-mhw/api/manhwas.php");
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const responseData = await response.json();
        const manhwasArray = extractManhwasArray(responseData);
        
        if (manhwasArray.length === 0) {
          throw new Error('La respuesta no contiene datos de manhwas');
        }
        
        // Normalización mejorada
        const normalizedData = manhwasArray.map(manhwa => ({
          id: manhwa.id || Date.now() + Math.random(),
          title: manhwa.titulo || 'Título desconocido',
          author: manhwa.autor || 'Autor desconocido',
          description: manhwa.descripcion || 'Descripción no disponible',
          status: manhwa.estado || 'Estado desconocido',
          publicationDate: manhwa.fecha_publicacion || '',
          image: manhwa.portada_url || 'https://via.placeholder.com/800x450?text=Portada+no+disponible',
          genres: normalizeGenres(manhwa.generos), // Usamos la nueva función
          formattedDate: formatDate(manhwa.fecha_publicacion)
        }));
        
        setManhwas(normalizedData);
      } catch (err) {
        console.error("Error al obtener manhwas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManhwas();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch {
      return dateString;
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % manhwas.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? manhwas.length - 1 : prev - 1));
  };

  // Estados de interfaz
  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Cargando manhwas...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorContainer}>
      <div style={styles.errorIcon}>⚠️</div>
      <h3 style={styles.errorTitle}>Error al cargar los manhwas</h3>
      <p style={styles.errorText}>{error}</p>
      <button 
        style={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        Reintentar
      </button>
    </div>
  );

  if (manhwas.length === 0) return (
    <div style={styles.emptyContainer}>
      <p style={styles.emptyText}>No se encontraron manhwas</p>
    </div>
  );

  // Renderizado principal
  return (
    <div style={styles.carouselContainer}>
      <div style={styles.carousel}>
        {manhwas.map((manhwa, index) => (
          <div
            key={manhwa.id}
            style={{
              ...styles.slide,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${manhwa.image})`,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 2 : 1
            }}
          >
            <div style={styles.textContainer}>
              <h1 style={styles.title}>{manhwa.title}</h1>
              
              <div style={styles.metaContainer}>
                <p style={styles.author}>Por {manhwa.author}</p>
                <p style={styles.status}>{manhwa.status} • Publicado el {manhwa.formattedDate}</p>
              </div>
              
              <p style={styles.description}>{manhwa.description}</p>
              
              <div style={styles.genresContainer}>
                {manhwa.genres.map((genre, i) => (
                  <span key={i} style={styles.genreTag}>
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {manhwas.length > 1 && (
        <>
          <button style={styles.prevButton} onClick={prevSlide} aria-label="Anterior">‹</button>
          <button style={styles.nextButton} onClick={nextSlide} aria-label="Siguiente">›</button>
          <div style={styles.dotsContainer}>
            {manhwas.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentIndex && styles.activeDot)
                }}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ==============================================
// ESTILOS DEL COMPONENTE
// ==============================================
const styles = {
  // Estilos del contenedor principal
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh', // Ocupa toda la altura de la pantalla
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    color: 'white'
  },
  
  // Estilos del carrusel
  carousel: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  
  // Estilos de cada slide
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.8s ease-in-out', // Transición suave
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    padding: '0 5%'
  },
  
  // Contenedor de texto
  textContainer: {
    width: '100%',
    maxWidth: '800px',
    padding: '2rem',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    backdropFilter: 'blur(4px)' // Efecto de desenfoque
  },
  
  // Estilos del título
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    lineHeight: 1.1,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  },
  
  // Contenedor de metadatos (autor y fecha)
  metaContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap'
  },
  
  // Estilos del autor
  author: {
    fontSize: '1.2rem',
    color: '#f8f8f8',
    margin: 0
  },
  
  // Estilos del estado y fecha
  status: {
    fontSize: '1.1rem',
    color: '#ddd',
    margin: 0,
    fontStyle: 'italic'
  },
  
  // Estilos de la descripción
  description: {
    fontSize: '1.2rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    maxWidth: '700px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
  },
  
  // Contenedor de géneros
  genresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  
  // Estilos de cada etiqueta de género
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    backdropFilter: 'blur(2px)'
  },
  
  // Botón anterior
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '2rem',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(2px)',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-50%) scale(1.1)'
    }
  },
  
  // Botón siguiente
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '2rem',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(2px)',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-50%) scale(1.1)'
    }
  },
  
  // Contenedor de puntos indicadores
  dotsContainer: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.8rem',
    zIndex: 3
  },
  
  // Estilo de punto indicador
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease'
  },
  
  // Estilo de punto activo
  activeDot: {
    backgroundColor: 'white',
    transform: 'scale(1.2)'
  },
  
  // Estilos para estado de carga
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '1rem',
    backgroundColor: '#f5f5f5'
  },
  
  // Spinner de carga
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(0, 0, 0, 0.1)',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  
  // Texto de carga
  loadingText: {
    fontSize: '1.2rem',
    color: '#333'
  },
  
  // Contenedor de error
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '1rem',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#fff5f5'
  },
  
  // Icono de error
  errorIcon: {
    fontSize: '3rem',
    color: '#e74c3c'
  },
  
  // Título de error
  errorTitle: {
    fontSize: '1.8rem',
    color: '#c0392b',
    margin: 0
  },
  
  // Texto de error
  errorText: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    maxWidth: '500px'
  },
  
  // Botón de reintentar
  retryButton: {
    padding: '0.8rem 1.8rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  
  // Contenedor vacío
  emptyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  
  // Texto cuando no hay manhwas
  emptyText: {
    fontSize: '1.5rem',
    color: '#7f8c8d'
  }
};

// ==============================================
// ANIMACIÓN DEL SPINNER
// ==============================================
const spin = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Crear e insertar los estilos de animación en el head del documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = spin;
document.head.appendChild(styleSheet);

export default Carrusel;
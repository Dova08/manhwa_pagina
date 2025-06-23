import React, { useState, useEffect } from "react";

const Carrusel = () => {
  const [manhwas, setManhwas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formatea fechas en español
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchManhwas = async () => {
      try {
        setLoading(true);
        setError(null);
const response = await fetch("http://localhost:8060/backend-mhw/api/manhwas/get/manhwa-genero.php");
        
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const { data, success, message } = await response.json();
        
        if (!success) {
          throw new Error(message || "Error al obtener los datos");
        }

        const normalizedData = data.map(manhwa => ({
          id: manhwa.id,
          title: manhwa.titulo || 'Título desconocido',
          author: manhwa.autor || 'Autor desconocido',
          description: manhwa.descripcion || 'Descripción no disponible',
          status: manhwa.estado || 'Estado desconocido',
          publicationDate: manhwa.fecha_publicacion,
          image: manhwa.portada_url || 'https://via.placeholder.com/800x450?text=Portada+no+disponible',
          genres: manhwa.generos || ['Género no especificado'],
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

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % manhwas.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? manhwas.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Efecto para auto-rotación cada 8 segundos
  useEffect(() => {
    if (manhwas.length > 1) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, manhwas]);

  // Estados de carga y error
  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando manhwas...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Error al cargar los manhwas</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>
        Reintentar
      </button>
    </div>
  );

  if (manhwas.length === 0) return (
    <div className="empty-container">
      <p>No se encontraron manhwas</p>
    </div>
  );

  return (
    <div className="carousel-container">
      <div className="carousel">
        {manhwas.map((manhwa, index) => (
          <div
            key={manhwa.id}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${manhwa.image})`
            }}
          >
            <div className="text-container">
              <h1 className="title">{manhwa.title}</h1>
              
              <div className="meta-container">
                <p className="author">Por {manhwa.author}</p>
                <p className="status">{manhwa.status} • Publicado el {manhwa.formattedDate}</p>
              </div>
              
              <p className="description">{manhwa.description}</p>
              
              <div className="genres-container">
                {manhwa.genres.map((genre, i) => (
                  <span key={i} className="genre-tag">
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
          <button className="nav-button prev" onClick={prevSlide} aria-label="Anterior">‹</button>
          <button className="nav-button next" onClick={nextSlide} aria-label="Siguiente">›</button>
          
          <div className="dots-container">
            {manhwas.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        /* Estilos generales */
        .loading-container, .error-container, .empty-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          gap: 1rem;
        }
        
        .loading-container {
          background-color: #f5f5f5;
        }
        
        .error-container {
          background-color: #fff5f5;
          text-align: center;
          padding: 2rem;
        }
        
        .empty-container {
          background-color: #f5f5f5;
        }
        
        /* Spinner de carga */
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        /* Carrusel */
        .carousel-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          color: white;
        }
        
        .carousel {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 0.8s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          padding: 0 5%;
          opacity: 0;
          z-index: 1;
        }
        
        .slide.active {
          opacity: 1;
          z-index: 2;
        }
        
        .text-container {
          width: 100%;
          max-width: 800px;
          padding: 2rem;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          backdrop-filter: blur(4px);
        }
        
        .title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.1;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .meta-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .author {
          font-size: 1.2rem;
          color: #f8f8f8;
          margin: 0;
        }
        
        .status {
          font-size: 1.1rem;
          color: #ddd;
          margin: 0;
          font-style: italic;
        }
        
        .description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 700px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .genres-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        
        .genre-tag {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          backdrop-filter: blur(2px);
        }
        
        /* Controles de navegación */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 2rem;
          cursor: pointer;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
          transition: all 0.3s ease;
        }
        
        .nav-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }
        
        .prev {
          left: 2rem;
        }
        
        .next {
          right: 2rem;
        }
        
        /* Indicadores */
        .dots-container {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.8rem;
          z-index: 3;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        
        .dot.active {
          background-color: white;
          transform: scale(1.2);
        }
        
        /* Animaciones */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Carrusel;
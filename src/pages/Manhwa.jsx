import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../pages/css/manhwa-styles.css'

const Manhwa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manhwa, setManhwa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchManhwa = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:8060/backend-mhw/api/manhwas/get/manhwa-genero-id.php?id=${id}`,
          {
            signal: abortController.signal
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error ${response.status}: ${errorData}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Error al cargar el manhwa');
        }

        setManhwa(data.data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('La petición fue cancelada');
          return;
        }
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManhwa();

    return () => {
      abortController.abort();
    };
  }, [id]);

  const handleChapterClick = (chapterId) => {
    navigate(`/manhwa/${id}/ManhwaCapitulo/${chapterId}`);
  };

  if (loading) {
    return (
      <div className="loading-container actualizaciones-root">
        <div className="spinner"></div>
        <p>Cargando manhwa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container actualizaciones-root">
        <h4>Error al cargar el manhwa</h4>
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (!manhwa) {
    return (
      <div className="error-container actualizaciones-root">
        <h4>No se encontró el manhwa</h4>
        <p>Verifica que la URL sea correcta</p>
      </div>
    );
  }

  return (
    <div className="actualizaciones-root">
      <div className="updates-container">
        {/* Sección de información principal del manhwa */}
        <div className="manhwa-detail-section">
          <div className="manhwa-header">
            <div className="manhwa-cover">
              <div className="image-container">
                <img 
                  src={manhwa.portada_url} 
                  alt={`Portada de ${manhwa.titulo}`}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x450?text=Portada+no+disponible';
                  }}
                />
              </div>
            </div>
            <div className="manhwa-info">
              <div className="section-header">
                <h1>{manhwa.titulo}</h1>
              </div>
              
              <div className="meta-info">
                <span className="status">{manhwa.estado}</span>
                <span className="date">Publicado: {new Date(manhwa.fecha_publicacion).toLocaleDateString()}</span>
              </div>
              
              <div className="author-info">
                <span className="author">Autor: {manhwa.autor}</span>
              </div>
              
              <div className="genres-section">
                <h5>Géneros:</h5>
                <div className="genres">
                  {manhwa.generos.map((genero, index) => (
                    <span key={index} className="genre-badge">
                      {genero}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="description-section">
                <h5>Descripción:</h5>
                <p className="description-text">{manhwa.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección de capítulos */}
        <div className="chapters-section">
          <div className="manhwa-card">
            <div className="card-header">
              <h3>Capítulos</h3>
            </div>
            <div className="card-body">
              {manhwa.capitulos && manhwa.capitulos.length > 0 ? (
                <ul className="chapters-list">
                  {manhwa.capitulos.map((capitulo) => (
                    <li
                      key={capitulo.id}
                      onClick={() => handleChapterClick(capitulo.id)}
                      className="chapter-item"
                    >
                      <div className="chapter-content">
                        <strong>Capítulo {capitulo.numero}</strong>
                        <div className="chapter-meta">
                          <span className="chapter-date">
                            {new Date(capitulo.fecha_publicacion).toLocaleDateString()}
                          </span>
                          <span className="chapter-available">Disponible</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-chapters">
                  No hay capítulos disponibles para este manhwa.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manhwa;
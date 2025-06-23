import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/css/capitulos-styles.css';

const Capitulos = () => {
  const [data, setData] = useState({ nuevos_capitulos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8060/backend-mhw/api/manhwas/get/novedades.php', {
          signal: abortController.signal
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        if (!abortController.signal.aborted) {
          setData(data);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => abortController.abort();
  }, []);

  const handleChapterClick = (manhwaId, capituloId) => {
    navigate(`/manhwa/${manhwaId}/manhwacapitulo/${capituloId}`);
  };

  if (loading) {
    return (
      <div className="capitulos-loading">
        <div className="loading-spinner"></div>
        <p>Cargando capítulos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="capitulos-error">
        <p>Error: {error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  // Group chapters by manhwa
  const groupedChapters = data.nuevos_capitulos.reduce((acc, chapter) => {
    const existingManhwa = acc.find(m => m.manhwa_id === chapter.manhwa_id);
    if (existingManhwa) {
      existingManhwa.chapters.push(chapter);
    } else {
      acc.push({
        manhwa_id: chapter.manhwa_id,
        manhwa_titulo: chapter.manhwa_titulo,
        estado: chapter.estado,
        portada_url: chapter.portada_url,
        chapters: [chapter]
      });
    }
    return acc;
  }, []);

  return (
    <div className="capitulos-container">
      <div className="capitulos-header">
        <h1>Últimos capítulos publicados</h1>
        <p className="page-indicator">Página {currentPage}</p>
      </div>
      
      <div className="capitulos-grid">
        {groupedChapters.map((manhwa) => (
          <div key={`manhwa-${manhwa.manhwa_id}`} className="manhwa-card">
            <div className="manhwa-image-container">
              <img 
                src={manhwa.portada_url} 
                alt={manhwa.manhwa_titulo} 
                className="manhwa-cover" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x450/161b22/8b949e?text=No+Image';
                }}
              />
            </div>
            <div className="manhwa-info">
              <h3>{manhwa.manhwa_titulo}</h3>
              <span className={`status-badge ${manhwa.estado === 'Finalizado' ? 'finished' : 'ongoing'}`}>
                {manhwa.estado}
              </span>
              
              <ul className="chapter-list">
                {manhwa.chapters.map((chapter) => (
                  <li 
                    key={`chapter-${chapter.capitulo_id}`} 
                    className="chapter-item"
                    onClick={() => handleChapterClick(manhwa.manhwa_id, chapter.capitulo_id)}
                  >
                    <div className="chapter-info">
                      <span className="chapter-number">Capítulo {chapter.numero}</span>
                      {chapter.capitulo_titulo && chapter.capitulo_titulo !== `Capitulo ${chapter.numero}` && (
                        <span className="chapter-title">: {chapter.capitulo_titulo}</span>
                      )}
                    </div>
                    <span className="chapter-date">
                      {new Date(chapter.fecha_publicacion).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Capitulos;
import React, { useEffect, useState } from 'react';
import './Actualizaciones.css';

const Actualizaciones = () => {
  const [latestUpdates, setLatestUpdates] = useState({
    newChapters: [],
    newReleases: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchLatestUpdates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8060/backend-mhw/api/manhwas/get/novedades.php', {
          signal,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');

        const data = await response.json();

        setLatestUpdates({
          newChapters: data.nuevos_capitulos || [],
          newReleases: data.nuevos_manhwas || []
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error al obtener novedades:', err);
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchLatestUpdates();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="actualizaciones-root">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando actualizaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="actualizaciones-root">
        <div className="error-container">
          <p>Error al cargar los datos: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="actualizaciones-root">
      <div className="updates-container">
        {/* Últimos capítulos */}
        <section className="updates-section">
          <div className="section-header">
            <h2>Últimos Capítulos</h2>
            <a href="/capitulos" className="view-all">Ver todos</a>
          </div>

          <div className="manhwas-grid">
            {latestUpdates.newChapters.length > 0 ? (
              latestUpdates.newChapters.map(cap => (
                <ManhwaCard
                  key={`chapter-${cap.capitulo_id}`}
                  manhwa={{
                    id: cap.manhwa_id,
                    titulo: cap.manhwa_titulo,
                    autor: cap.capitulo_titulo,
                    portada_url: cap.portada_url,
                    estado: cap.estado,
                    generos: cap.generos || [],
                    total_capitulos: cap.total_capitulos || 0,
                    fecha_publicacion: cap.fecha_publicacion
                  }}
                  isNewChapter={true}
                  dateField="fecha_publicacion"
                />
              ))
            ) : (
              <div className="no-results">
                <p>No hay nuevos capítulos recientes</p>
              </div>
            )}
          </div>
        </section>

        {/* Nuevos lanzamientos */}
        <section className="updates-section">
          <div className="section-header">
            <h2>Nuevos Lanzamientos</h2>
            <a href="/series" className="view-all">Ver todos</a>
          </div>

          <div className="manhwas-grid">
            {latestUpdates.newReleases.length > 0 ? (
              latestUpdates.newReleases.map(manhwa => (
                <ManhwaCard
                  key={`release-${manhwa.id}`}
                  manhwa={manhwa}
                  isNewRelease={true}
                  dateField="fecha_publicacion"
                />
              ))
            ) : (
              <div className="no-results">
                <p>No hay nuevos lanzamientos</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const ManhwaCard = ({ manhwa, isNewChapter, isNewRelease, dateField }) => {
  const getStatusClass = (estado) => {
    if (!estado) return '';
    
    const estadoLower = estado.toLowerCase();
    if (estadoLower.includes('finalizado')) return 'status-completed';
    if (estadoLower.includes('en curso')) return 'status-ongoing';
    if (estadoLower.includes('cancelado')) return 'status-cancelled';
    if (estadoLower.includes('hiatus')) return 'status-hiatus';
    return '';
  };

  const statusClass = getStatusClass(manhwa.estado);
  const date = dateField && manhwa[dateField] ? new Date(manhwa[dateField]) : null;

  return (
    <div className="manhwa-card">
      {(isNewChapter || isNewRelease) && (
        <div className="badge">{isNewChapter ? 'Nuevo Capítulo' : 'Nuevo'}</div>
      )}
      <div className="image-container">
        <img
          src={manhwa.portada_url || '/default-cover.jpg'}
          alt={manhwa.titulo || 'Manhwa sin título'}
          onError={(e) => {
            e.target.src = '/default-cover.jpg';
            e.target.alt = 'Portada no disponible';
          }}
        />
      </div>
      <div className="card-content">
        {manhwa.estado && (
          <span className={`status ${statusClass}`}>{manhwa.estado}</span>
        )}
        <h3>{manhwa.titulo || 'Título no disponible'}</h3>
        {manhwa.autor && <p className="author">{manhwa.autor}</p>}
        {date && (
          <p className="date">
            {isNewChapter ? 'Último capítulo: ' : 'Publicado: '}
            {date.toLocaleDateString('es-ES')}
          </p>
        )}
        {manhwa.total_capitulos && (
          <p className="chapters-count">{manhwa.total_capitulos} capítulos</p>
        )}
        {manhwa.generos && manhwa.generos.length > 0 && (
          <div className="genres">
            {manhwa.generos.slice(0, 3).map((genero, index) => (
              <span key={index} className="genre-badge">{genero}</span>
            ))}
            {manhwa.generos.length > 3 && (
              <span className="genre-badge">+{manhwa.generos.length - 3}</span>
            )}
          </div>
        )}
        <a 
          href={`/manhwa/${manhwa.id}`} 
          className="series-btn"
        >
          Ver más
        </a>
      </div>
    </div>
  );
};

export default Actualizaciones;
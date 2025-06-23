import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Buscar = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8060/backend-mhw/api/manhwas/get/buscar.php?q=${encodeURIComponent(searchQuery)}`
        );
        setResults(response.data || []);
      } catch (error) {
        console.error('Error de búsqueda:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <div className="series-container">
      <div className="series-content">
        <div className="series-header">
          <h2>
            {searchQuery ? `Resultados para: "${searchQuery}"` : 'Buscar manhwas'}
          </h2>
        </div>
        
        {loading ? (
          <div className="series-loading">
            <div className="series-spinner" role="status"></div>
            <span>Cargando...</span>
          </div>
        ) : results.length > 0 ? (
          <div className="series-grid">
            {results.map((manhwa) => (
              <div key={manhwa.id} className="series-card">
                <div className="series-card-img">
                  <img 
                    src={manhwa.portada_url || 'https://via.placeholder.com/300x400'} 
                    alt={manhwa.titulo}
                  />
                </div>
                <div className="series-card-body">
                  <h3>{manhwa.titulo}</h3>
                  <p className="series-desc">{manhwa.descripcion?.substring(0, 100)}...</p>
                  <a 
                    href={`/manhwa/${manhwa.id}`} 
                    className="series-btn"
                  >
                    Ver más
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="series-empty">
            No se encontraron manhwas con el título "{searchQuery}"
          </div>
        ) : (
          <div className="series-empty">
            Ingresa un término de búsqueda para encontrar manhwas
          </div>
        )}
      </div>
    </div>
  );
};

export default Buscar;
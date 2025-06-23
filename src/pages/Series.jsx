import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../pages/css/series-styles.css';

const API = 'http://localhost:8060/backend-mhw/api/manhwas/get/manhwa-genero.php';

const Series = () => {
    const { categoria } = useParams();
    const [manhwas, setManhwas] = useState([]);
    const [filteredManhwas, setFilteredManhwas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [allGenres, setAllGenres] = useState([]);

    const fetchManhwas = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const url = categoria ? `${API}?category=${categoria}` : API;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.success || !Array.isArray(data.data)) {
                throw new Error("La respuesta no contiene un array de manhwas");
            }
            
            const receivedManhwas = data.data;
            setManhwas(receivedManhwas);
            setFilteredManhwas(receivedManhwas);
            
            // Extraer todos los géneros únicos
            const genres = extractAllUniqueGenres(receivedManhwas);
            setAllGenres(genres);
        } catch (err) {
            console.error("Error al cargar los manhwas:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para extraer todos los géneros únicos
    const extractAllUniqueGenres = (manhwaList) => {
        const genreSet = new Set();
        
        manhwaList.forEach(manhwa => {
            if (manhwa.generos && Array.isArray(manhwa.generos)) {
                manhwa.generos.forEach(genre => {
                    if (genre) genreSet.add(genre);
                });
            }
        });
        
        return Array.from(genreSet).sort((a, b) => a.localeCompare(b));
    };

    // Función para filtrar manhwas por búsqueda y género
    const filterManhwas = () => {
        let results = manhwas;
        
        // Filtrar por término de búsqueda
        if (searchTerm) {
            results = results.filter(manhwa =>
                manhwa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (manhwa.descripcion && manhwa.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (manhwa.autor && manhwa.autor.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        
        // Filtrar por género seleccionado
        if (selectedGenre) {
            results = results.filter(manhwa =>
                manhwa.generos && manhwa.generos.includes(selectedGenre)
            );
        }
        
        setFilteredManhwas(results);
    };

    useEffect(() => {
        fetchManhwas();
    }, [categoria]);

    useEffect(() => {
        filterManhwas();
    }, [searchTerm, selectedGenre, manhwas]);

    if (loading) {
        return (
            <div className="series-container">
                <div className="series-loading">
                    <div className="series-spinner"></div>
                    <p>Cargando manhwas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="series-container">
                <div className="series-error">
                    <h3>Error al cargar los manhwas</h3>
                    <p>{error}</p>
                    <button 
                        className="series-retry-btn"
                        onClick={fetchManhwas}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="series-container">
            <div className="series-content">
                <div className="series-header">
                    <h2>
                        {categoria 
                            ? `Manhwas de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)} (${filteredManhwas.length})` 
                            : `Todos los Manhwas (${filteredManhwas.length})`
                        }
                    </h2>
                    <p>Descubre nuestras mejores recomendaciones</p>
                    
                    {/* Barra de búsqueda y filtro por género */}
                    <div className="series-search-container">
                        <input
                            type="text"
                            placeholder="Buscar manhwas por título, autor o descripción..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="series-search-input"
                        />
                        
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="series-genre-select"
                        >
                            <option value="">Todos los géneros</option>
                            {allGenres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="series-grid">
                    {filteredManhwas.length > 0 ? (
                        filteredManhwas.map(manhwa => (
                            <div key={manhwa.id} className="series-card">
                                <div className="series-card-img">
                                    <img 
                                        src={manhwa.portada_url || 'https://via.placeholder.com/300x450?text=Portada+no+disponible'} 
                                        alt={manhwa.titulo}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x450?text=Portada+no+disponible';
                                        }}
                                    />
                                </div>
                                <div className="series-card-body">
                                    <div>
                                        <span className={`series-status ${
                                            manhwa.estado === 'En curso' ? 'series-status-warning' : 
                                            manhwa.estado === 'Finalizado' ? 'series-status-success' : 
                                            manhwa.estado === 'Cancelado' ? 'series-status-danger' : 
                                            'series-status-secondary'
                                        }`}>
                                            {manhwa.estado}
                                        </span>
                                        <h3>{manhwa.titulo}</h3>
                                        <p className="series-author">Por {manhwa.autor || 'Autor desconocido'}</p>
                                        {manhwa.generos && (
                                            <p className="series-genres">
                                                Géneros: {manhwa.generos.join(', ')}
                                            </p>
                                        )}
                                        <p className="series-desc">
                                            {manhwa.descripcion 
                                                ? `${manhwa.descripcion.substring(0, 100)}...` 
                                                : 'Descripción no disponible'}
                                        </p>
                                    </div>
                                    <div>
                                        <a 
                                            href={`/manhwa/${manhwa.id}`} 
                                            className="series-btn"
                                        >
                                            Ver más
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="series-empty">
                            No se encontraron manhwas{categoria ? ` en la categoría ${categoria}` : ''} que coincidan con tu búsqueda
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Series;
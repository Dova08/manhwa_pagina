import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = 'http://localhost:8060/backend-mhw/api/manhwas.php'; // Define la constante API

const Series = () => {
    const { categoria } = useParams();
    const [manhwas, setManhwas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchManhwas = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const url = categoria ? `${API}?category=${categoria}` : API;
          const response = await fetch(url);
          
          // Debug: Verifica el estado y contenido de la respuesta
          console.log("Status:", response.status);
          const rawResponse = await response.text();
          console.log("Raw response:", rawResponse); // ← Aquí verás qué devuelve realmente el servidor
          
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          
          const data = JSON.parse(rawResponse); // Parsea manualmente el texto
          const receivedManhwas = data.data || data;
          
          if (!Array.isArray(receivedManhwas)) {
            throw new Error("La respuesta no contiene un array de manhwas");
          }
          
          setManhwas(receivedManhwas);
        } catch (err) {
          console.error("Error completo:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchManhwas();
    }, [categoria]);

    if (loading) {
        return (
            <section className="trending-product section" style={{ marginTop: '12px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p>Cargando manhwas...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="trending-product section" style={{ marginTop: '12px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center text-danger">
                            <h3>Error al cargar los manhwas</h3>
                            <p>{error}</p>
                            <button 
                                className="btn btn-primary"
                                onClick={fetchManhwas}
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="trending-product section" style={{ marginTop: '12px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2>
                                {categoria 
                                    ? `Manhwas de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)} (${manhwas.length})` 
                                    : `Todos los Manhwas (${manhwas.length})`
                                }
                            </h2>
                            <p>Descubre nuestras mejores recomendaciones</p>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    {manhwas.length > 0 ? (
                        manhwas.map(manhwa => (
                            <div key={manhwa.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                <div className="card h-100">
                                    <img 
                                        src={manhwa.portada_url || 'https://via.placeholder.com/300x450?text=Portada+no+disponible'} 
                                        className="card-img-top" 
                                        alt={manhwa.titulo}
                                        style={{ height: '450px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{manhwa.titulo}</h5>
                                        <p className="card-text text-muted">
                                            <small>Por {manhwa.autor || 'Autor desconocido'}</small>
                                        </p>
                                        <p className="card-text">
                                            {manhwa.descripcion 
                                                ? `${manhwa.descripcion.substring(0, 100)}...` 
                                                : 'Descripción no disponible'}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className={`badge ${
                                              manhwa.estado === 'En curso' ? 'bg-warning' : 
                                              manhwa.estado === 'Finalizado' ? 'bg-success' : 
                                              manhwa.estado === 'Cancelado' ? 'bg-danger' : 
                                              'bg-secondary' // Para Hiatus
                                            }`}>
                                              {manhwa.estado}
                                            </span>
                                            <a 
                                                href={`/manhwa/${manhwa.id}`} 
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                Ver más
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <div className="alert alert-info">
                                No se encontraron manhwas{categoria ? ` en la categoría ${categoria}` : ''}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Series;
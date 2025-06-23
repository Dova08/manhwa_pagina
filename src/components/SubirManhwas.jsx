import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubirManhwas = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    descripcion: '',
    estado: 'En curso',
    fecha_publicacion: '',
    portada_url: '',
    generos: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [useImageUrl, setUseImageUrl] = useState(false);

  const availableGenres = [
    { id: 1, nombre: 'Acción' },
    { id: 2, nombre: 'Fantasía' },
    { id: 3, nombre: 'Aventura' },
    { id: 4, nombre: 'Romance' },
    { id: 5, nombre: 'Ciencia Ficción' },
    { id: 6, nombre: 'Comedia' },
    { id: 7, nombre: 'Drama' },
    { id: 8, nombre: 'Horror' },
    { id: 9, nombre: 'Misterio' },
    { id: 10, nombre: 'Deportes' },
    { id: 11, nombre: 'Sobrenatural' },
    { id: 12, nombre: 'Histórico' },
    { id: 13, nombre: 'Psicológico' },
    { id: 14, nombre: 'Mecha' },
    { id: 15, nombre: 'Slice of Life' },
    { id: 16, nombre: 'Thriller' },
    { id: 17, nombre: 'Ecchi' },
    { id: 18, nombre: 'Magia' },
    { id: 19, nombre: 'Superpoderes' },
    { id: 20, nombre: 'Josei' },
    { id: 21, nombre: 'Reencarnación' },
    { id: 22, nombre: 'Apocalíptico' },
    { id: 23, nombre: 'Supervivencia' },
    { id: 24, nombre: 'Artes Marciales' },
    { id: 25, nombre: 'Tragedia' },
    { id: 26, nombre: 'Escolar' },
    { id: 27, nombre: 'Harem' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreToggle = (genreId) => {
    setFormData(prev => {
      if (prev.generos.includes(genreId)) {
        return {
          ...prev,
          generos: prev.generos.filter(id => id !== genreId)
        };
      } else {
        return {
          ...prev,
          generos: [...prev.generos, genreId]
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setPreview('');
      setImageFile(null);
      return;
    }

    // Validar tipo de archivo
    if (!file.type.match('image.*')) {
      setError('Por favor, sube solo archivos de imagen (JPEG, PNG, etc.)');
      return;
    }

    // Validar tamaño (aumentado a 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError('La imagen no debe exceder los 20MB');
      return;
    }

    const reader = new FileReader();
    
    reader.onloadend = () => {
      setPreview(reader.result);
      setError(null);
    };

    reader.onerror = () => {
      setError('Error al leer la imagen');
    };

    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleImageUrlChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      portada_url: value
    }));
    
    if (value.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
      setPreview(value);
    } else {
      setPreview('');
    }
  };

  const toggleImageInput = () => {
    setUseImageUrl(!useImageUrl);
    setPreview('');
    setImageFile(null);
    setFormData(prev => ({ ...prev, portada_url: '' }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.titulo.trim()) {
      setError('El título es obligatorio');
      return false;
    }
    if (!formData.autor.trim()) {
      setError('El autor es obligatorio');
      return false;
    }
    if (formData.descripcion.length < 30) {
      setError('La descripción debe tener al menos 30 caracteres');
      return false;
    }
    if (formData.generos.length === 0) {
      setError('Selecciona al menos un género');
      return false;
    }
    if (!useImageUrl && !imageFile) {
      setError('Debes seleccionar una imagen para la portada');
      return false;
    }
    if (useImageUrl && !formData.portada_url.trim()) {
      setError('Debes proporcionar una URL válida para la portada');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!validateForm()) {
      setLoading(false);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      let formDataToSend;
      let headers = {
        'Authorization': `Bearer ${token}`
      };
  
      if (useImageUrl) {
        headers['Content-Type'] = 'application/json';
        formDataToSend = JSON.stringify({
          titulo: formData.titulo,
          autor: formData.autor,
          descripcion: formData.descripcion,
          estado: formData.estado,
          fecha_publicacion: formData.fecha_publicacion,
          portada_url: formData.portada_url,
          generos: formData.generos
        });
      } else {
        formDataToSend = new FormData();
        formDataToSend.append('portada', imageFile);
        formDataToSend.append('data', JSON.stringify({
          titulo: formData.titulo,
          autor: formData.autor,
          descripcion: formData.descripcion,
          estado: formData.estado,
          fecha_publicacion: formData.fecha_publicacion,
          generos: formData.generos
        }));
      }
  
      const response = await fetch('http://localhost:8060/backend-mhw/api/manhwas/post/subir-manhwa.php', {
        method: 'POST',
        headers: headers,
        body: formDataToSend
      });
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Respuesta inesperada: ${text.substring(0, 100)}...`);
      }
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Error al subir el manhwa');
      }
  
      setSuccess(true);
      setTimeout(() => navigate('/series'), 2000);
    } catch (err) {
      console.error('Error detallado:', err);
      // Manejo específico para errores de tamaño
      if (err.message.includes('413') || err.message.includes('demasiado grande')) {
        setError('El archivo es demasiado grande. Límite: 20MB');
      } else {
        setError(err.message || 'Error al subir el manhwa');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Subir Nuevo Manhwa</h2>
            </div>
            <div className="card-body">
              {success && (
                <div className="alert alert-success">
                  ¡Manhwa subido exitosamente! Redirigiendo...
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">Título *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="autor" className="form-label">Autor *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="autor"
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción *</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    rows="4"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="estado" className="form-label">Estado *</label>
                  <select
                    className="form-select"
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="En curso">En curso</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Hiatus">Hiatus</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="fecha_publicacion" className="form-label">Fecha de Publicación *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_publicacion"
                    name="fecha_publicacion"
                    value={formData.fecha_publicacion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="useImageUrl"
                      checked={useImageUrl}
                      onChange={toggleImageInput}
                    />
                    <label className="form-check-label" htmlFor="useImageUrl">
                      Usar URL de imagen en lugar de subir archivo
                    </label>
                  </div>
                </div>

                {useImageUrl ? (
                  <div className="mb-3">
                    <label htmlFor="portada_url" className="form-label">
                      URL de la Portada *
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="portada_url"
                      name="portada_url"
                      value={formData.portada_url}
                      onChange={handleImageUrlChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      required={useImageUrl}
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="portada" className="form-label">
                      Subir Portada * (Máximo 20MB) - Formatos: JPG, JPEG, PNG, GIF, WEBP
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="portada"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!useImageUrl}
                    />
                  </div>
                )}

                {preview && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Previsualización:</h6>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setPreview('');
                          if (useImageUrl) {
                            setFormData(prev => ({ ...prev, portada_url: '' }));
                          } else {
                            setImageFile(null);
                            document.getElementById('portada').value = '';
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="border rounded p-2" style={{ maxWidth: '300px' }}>
                      <img 
                        src={preview} 
                        alt="Previsualización de portada" 
                        className="img-fluid rounded"
                        style={{ 
                          maxHeight: '200px',
                          display: 'block',
                          margin: '0 auto'
                        }}
                        onError={() => setPreview('')}
                      />
                      {!useImageUrl && imageFile && (
                        <div className="text-center small text-muted mt-2">
                          {imageFile.name} - {(imageFile.size / 1024).toFixed(2)} KB
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label">Géneros *</label>
                  <div className="d-flex flex-wrap gap-2">
                    {availableGenres.map(genre => (
                      <div key={genre.id} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`genre-${genre.id}`}
                          checked={formData.generos.includes(genre.id)}
                          onChange={() => handleGenreToggle(genre.id)}
                        />
                        <label className="form-check-label" htmlFor={`genre-${genre.id}`}>
                          {genre.nombre}
                        </label>
                      </div>
                    ))}
                  </div>
                  <small className="text-muted">Selecciona al menos un género</small>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || formData.generos.length === 0}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Subiendo...
                      </>
                    ) : 'Subir Manhwa'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubirManhwas;
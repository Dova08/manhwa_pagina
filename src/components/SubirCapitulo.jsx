import { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import '../components/css/SubirCapitulo.css';

// Componente para cada elemento de imagen que puede ser arrastrado
const DraggableImageItem = ({ image, index, moveImage, removeImage }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="file-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="file-thumbnail">
        <img 
          src={image.preview} 
          alt={`Vista previa ${index + 1}`}
        />
      </div>
      <div className="file-name" title={image.name}>
        {image.name}
      </div>
      <div className="file-size">
        {(image.size / 1024 / 1024).toFixed(2)} MB
      </div>
      <div className="file-actions">
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => removeImage(index)}
          title="Eliminar"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

const SubirCapitulo = () => {
  const [form, setForm] = useState({
    manhwa_id: '',
    numero: '',
    titulo: '',
    fecha_publicacion: ''
  });
  
  const [manhwas, setManhwas] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);

  // Fetch manhwas on component mount
  useEffect(() => {
    const fetchManhwas = async () => {
      try {
        const response = await axios.get('http://localhost:8060/backend-mhw/api/capitulos/post/crear.php');
        setManhwas(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de manhwas:', error);
      }
    };
    
    fetchManhwas();
  }, []);

  const handleNewFiles = (files) => {
    setError('');
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024;
    });

    if (validFiles.length !== files.length) {
      setError('Algunos archivos no son válidos (solo JPEG/PNG/WEBP, máx. 10MB)');
    }

    if (validFiles.length > 0) {
      const filesWithPreview = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }));
      setImagenes(prev => [...prev, ...filesWithPreview]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleNewFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index) => {
    const newImages = [...imagenes];
    const [removedImage] = newImages.splice(index, 1);
    URL.revokeObjectURL(removedImage.preview);
    setImagenes(newImages);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const dragItem = imagenes[dragIndex];
    const newImages = [...imagenes];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, dragItem);
    setImagenes(newImages);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleNewFiles(Array.from(e.dataTransfer.files));
    }
  };

  useEffect(() => {
    return () => {
      imagenes.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    
    if (!form.manhwa_id || !form.numero || !form.titulo) {
      setError('Faltan datos obligatorios');
      return;
    }

    if (imagenes.length === 0) {
      setError('Debes seleccionar al menos una imagen');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('manhwa_id', form.manhwa_id);
    formData.append('numero', form.numero);
    formData.append('titulo', form.titulo);
    formData.append('fecha_publicacion', form.fecha_publicacion || new Date().toISOString().split('T')[0]);

    imagenes.forEach((imagen, index) => {
      formData.append(`imagenes[${index}]`, imagen.file);
    });

    try {
      const response = await axios.post('http://localhost:8060/backend-mhw/api/capitulos/post/crear.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress({ percent: percentCompleted });
        }
      });

      setMensaje('Capítulo subido exitosamente');
      
      setForm({
        manhwa_id: '',
        numero: '',
        titulo: '',
        fecha_publicacion: ''
      });
      setImagenes([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError(error.response?.data?.error || 'Error al conectar con el servidor');
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="subir-capitulo">
        <div className="container">
          <h2>Subir Capítulo</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Manhwa</label>
              <select
                name="manhwa_id"
                className="form-control"
                value={form.manhwa_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un manhwa</option>
                {manhwas.map(manhwa => (
                  <option key={manhwa.id} value={manhwa.id}>
                    {manhwa.id} - {manhwa.titulo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Número del Capítulo</label>
              <input
                type="number"
                name="numero"
                className="form-control"
                value={form.numero}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Título del Capítulo</label>
              <input
                type="text"
                name="titulo"
                className="form-control"
                value={form.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha de Publicación (opcional)</label>
              <input
                type="date"
                name="fecha_publicacion"
                className="form-control"
                value={form.fecha_publicacion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Imágenes del Capítulo</label>
              <div 
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <div className="drop-zone-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
                  <small>Formatos permitidos: JPEG, PNG, WEBP (máx. 10MB por imagen)</small>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="d-none"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileInputChange}
                multiple
              />
            </div>

            {imagenes.length > 0 && (
              <div className="file-explorer">
                <div className="file-explorer-header">
                  <span>Miniatura</span>
                  <span>Nombre del archivo</span>
                  <span>Tamaño</span>
                  <span>Acciones</span>
                </div>
                
                <div className="file-list">
                  {imagenes.map((imagen, index) => (
                    <DraggableImageItem
                      key={index}
                      index={index}
                      image={imagen}
                      moveImage={moveImage}
                      removeImage={removeImage}
                    />
                  ))}
                </div>
                
                <div className="file-explorer-footer">
                  Total: {imagenes.length} archivo(s) seleccionado(s)
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Subiendo...
                </>
              ) : 'Subir Capítulo'}
            </button>
          </form>
        </div>
      </div>
    </DndProvider>
  );
};

export default SubirCapitulo;
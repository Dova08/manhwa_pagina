import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaSearch, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

const Contrasena = ({ valor, onChange }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="position-relative">
      <input
        type={mostrar ? "text" : "password"}
        className="form-control"
        value={valor}
        onChange={onChange}
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={() => setMostrar(!mostrar)}
        className="btn btn-sm btn-outline-secondary position-absolute end-0 top-0 mt-1 me-2"
        aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {mostrar ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

const Header = () => {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombreExiste, setNombreExiste] = useState(false);

  const togglePopup = () => {
    setMostrarPopup(!mostrarPopup);
    if (!mostrarPopup) {
      setNombre("");
      setContrasena("");
      setNombreExiste(false);
    }
  };

  const manejarEnvioNombre = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      setNombreExiste(true);
    }
  };

  const manejarLogin = (e) => {
    e.preventDefault();
    setMostrarPopup(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/inicio" className="navbar-brand fs-3 fw-bold text-danger">
          ImNotScanlation
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1">
              <Link to="/inicio" className="nav-link active fw-semibold">
                Inicio
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link to="/series" className="nav-link">
                Series
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link to="/capitulos" className="nav-link">
                Capítulos
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link to="/subirseries" className="nav-link">
                Subir Series
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center position-relative">
            <form className="d-flex me-3">
              <div className="input-group">
                <input 
                  className="form-control border-end-0 rounded-start-pill" 
                  type="search" 
                  placeholder="Buscar..." 
                />
                <button className="btn btn-danger rounded-end-pill">
                  <FaSearch />
                </button>
              </div>
            </form>
            
            <button 
              onClick={togglePopup}
              className="btn btn-outline-light rounded-circle p-2"
            >
              <FaRegUser size={18} />
            </button>

            {mostrarPopup && (
              <div className="bg-dark text-white p-3 rounded shadow position-absolute top-100 end-0 mt-2" style={{width: '320px', zIndex: 1000}}>
                <button 
                  onClick={togglePopup}
                  className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-1"
                >
                  <FaTimes />
                </button>
                
                {!nombreExiste ? (
                  <form onSubmit={manejarEnvioNombre}>
                    <div className="mb-3">
                      <label className="form-label d-block">
                        Nombre de usuario:
                        <input 
                          className="form-control mt-1"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                      </label>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-primary">
                        <strong>Elegir nombre</strong>
                      </button>
                      <button type="button" onClick={togglePopup} className="btn btn-outline-secondary">
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={manejarLogin}>
                    <p className="text-danger mb-2">El nombre ya está registrado.</p>
                    <p className="mb-3">Si es tu cuenta:</p>
                    
                    <div className="mb-3">
                      <label className="form-label d-block">
                        Nombre:
                        <input 
                          type="text" 
                          className="form-control-plaintext text-white border-bottom mb-2"
                          value={nombre} 
                          readOnly
                        />
                      </label>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label d-block">
                        Contraseña:
                        <Contrasena valor={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                      </label>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-3">
                      <button type="submit" className="btn btn-primary">
                        <strong>Iniciar sesión</strong>
                      </button>
                      <button type="button" onClick={togglePopup} className="btn btn-outline-secondary">
                        Cancelar
                      </button>
                    </div>
                    
                    <div className="text-center my-3">
                      <span className="bg-dark px-2 position-relative">o</span>
                      <hr className="mt-0 mb-3" />
                    </div>
                    
                    <p className="mb-2">Si es de otra persona:</p>
                    <button type="button" onClick={() => setNombreExiste(false)} className="btn btn-outline-light w-100">
                      Elegir otro nombre
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
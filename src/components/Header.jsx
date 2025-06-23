import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <Link to="/inicio" className="navbar-brand fs-3 fw-bold text-danger me-4">
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
            <li className="nav-item">
              <Link to="/inicio" className="nav-link active fw-semibold px-3">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/series" className="nav-link px-3">
                Series
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/capitulos" className="nav-link px-3">
                Capítulos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/subirseries" className="nav-link px-3">
                Subir Series
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            <form className="d-flex w-100" onSubmit={handleSearch}>
              <div className="input-group">
                <input 
                  className="form-control border-end-0 rounded-start-pill" 
                  type="search" 
                  placeholder="Buscar manhwas..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Buscar manhwas"
                />
                <button 
                  className="btn btn-danger rounded-end-pill" 
                  type="submit"
                  aria-label="Buscar"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
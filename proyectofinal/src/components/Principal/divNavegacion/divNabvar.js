//divNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Carrito/CarritoCompra/CartContext';  // Asegúrate de importar el useCart

function Navbar({ searchTerm, setSearchTerm }) {
  const { cartItems } = useCart();  // Acceder al cartItems desde el contexto

  // Al hacer clic en una categoría, actualiza el término de búsqueda
  const handleCategoryClick = (category) => {
    setSearchTerm(category); // Establecer el término de búsqueda como el nombre de la categoría
  };

  // Al hacer clic en el home, limpia el término de búsqueda
  const handleHomeClick = () => {
    setSearchTerm(""); // Restablecer el término de búsqueda
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={handleHomeClick}>TechStore</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleHomeClick}>INICIO</Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                CATEGORÍAS
              </span>
              <ul className="dropdown-menu">
                <li><span className="dropdown-item" onClick={() => handleCategoryClick("telefono")}>Teléfono</span></li>
                <li><span className="dropdown-item" onClick={() => handleCategoryClick("tablet")}>Tablet</span></li>
                <li><span className="dropdown-item" onClick={() => handleCategoryClick("laptop")}>Laptop</span></li>
                <li><span className="dropdown-item" onClick={() => handleCategoryClick("apple")}>Apple</span></li>
                <li><span className="dropdown-item" onClick={() => handleCategoryClick("audifonos")}>Audífonos</span></li>
              </ul>
            </li>
            <li className="nav-item"><Link className="nav-link" to='/account'>MI CUENTA</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/account'>ADMINISTRACIÓN</Link></li>
          </ul>

          <form className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos"
              aria-label="Search"
              value={searchTerm} // El término de búsqueda se vincula al estado
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda cuando el usuario escribe
              style={{ height: '30px', width:'200px', padding: '20px 10px', fontSize: '0.8rem' }}
            />
          </form>

          <div className="carrito">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






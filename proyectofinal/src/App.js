import './components/Login/divInicio/loginPrincipal.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Principal/divNavegacion/divNabvar';
import Inicio from './components/Principal/divInicio/divInicio';
import DivPrincipal from './components/Principal/divPrincipal/divPrincipal';
import AppLogin from './components/Login/divInicio/loginApp';
import AppRegistro from './components/RegistroUsuario/divRegistroUsuario/RegistroUsuarioApp';
import AppCrearProducto from './components/Administración/CrearProducto/CrearProductoApp';
import Cart from './components/Carrito/CarritoCompra/Cart';
import Pago from './components/Carrito/CarritoCompra/Pago';
import ProductoDetalle from './components/Principal/divPrincipal/ProductoDetalle';
import { CartProvider } from './components/Carrito/CarritoCompra/CartContext';
import Footer from './components/Principal/divInicio/footer';

// Ruta protegida para verificar el rol de administrador
const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  return role === 'admin' ? children : <Navigate to="/" />;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]); // Iniciar como arreglo vacío

  // Obtener productos de la base de datos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/productos'); // Cambia la URL según tu API
        setProductos(response.data); // Asume que response.data contiene el array de productos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider productos={productos} setProductos={setProductos}>
      <Router>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path='/' element={
            <div>
              <Inicio />
              <div className='linea'>
                <h1 className='titulos'>PRODUCTOS</h1>
                <div className="grid-container">
                  {productosFiltrados.map((producto) => (
                    <DivPrincipal
                      key={producto._id}
                      id={producto._id}
                      titulo={producto.nombre}
                      imagenes={producto.imagenes} // Mostrar las imágenes desde la base de datos
                      informacion={producto.descripcion}
                      precio={producto.precio}
                      stock={producto.cantidad_stock}
                    />
                  ))}
                </div>
              </div>
            </div>
          } />
          <Route path='/account' element={<AppLogin />} />
          <Route path='/register' element={<AppRegistro />} />
          <Route
            path='/products'
            element={
              <ProtectedRoute>
                <AppCrearProducto />
              </ProtectedRoute>
            }
          />
          <Route path='/producto/:id' element={<ProductoDetalle productos={productos} setProductos={setProductos} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pago' element={<Pago />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;


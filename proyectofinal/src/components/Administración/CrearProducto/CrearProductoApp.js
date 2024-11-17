//CrearProductoApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes
import CrearProducto from './CrearProductoPrincipal';// Importa el componente del formulario

const AppCrearProducto = () => {
  return (
    <Routes>
      <Route path='/' element={<CrearProducto/>} /> {/* Cambia a '/' si es necesario */}
    </Routes>
  );
};

export default AppCrearProducto;
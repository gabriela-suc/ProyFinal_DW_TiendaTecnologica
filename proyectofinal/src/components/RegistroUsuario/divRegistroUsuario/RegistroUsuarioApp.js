import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes
import RegistrarUsuario from './RegistroUsuarioPrincipal'; // Importa el componente del formulario

const AppRegistro = () => {
  return (
    <Routes>
      <Route path='/' element={<RegistrarUsuario />} /> {/* Cambia a '/' si es necesario */}
    </Routes>
  );
};

export default AppRegistro;

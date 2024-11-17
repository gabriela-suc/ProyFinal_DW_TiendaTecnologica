// components/Login/divInicio/loginApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes
import MiCuenta from './loginPrincipal'; // Ruta a loginPrincipal


const AppLogin = () => {
  return (
    <Routes>
      <Route path='/' element={<MiCuenta/>} />
    </Routes>
  );
};

export default AppLogin;














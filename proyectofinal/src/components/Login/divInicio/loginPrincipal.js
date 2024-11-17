import './loginPrincipal.css'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar axios para hacer solicitudes HTTP

const MiCuenta = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Realiza la solicitud al backend para validar el login
      const response = await axios.post('http://localhost:3001/api/user-login/', { correo: email, password });

      // Si la respuesta tiene un rol, maneja la redirección
      if (response.data.role) {
        if (response.data.role === 'admin') {
          setShowMessage('Usted se logeó como administrador');
          localStorage.setItem('token', response.data.token); // Guardar token
          localStorage.setItem('role', response.data.role); // Guardar role

          setTimeout(() => {
            setShowMessage('');
            navigate('/products'); // Redirige a la página de administración de productos
          }, 3000);
        } else {
          setShowMessage('Inicio de sesión exitoso');
          localStorage.setItem('token', response.data.token); // Guardar token
          localStorage.setItem('role', response.data.role); // Guardar role

          setTimeout(() => {
            setShowMessage('');
            navigate('/'); // Redirige al inicio
          }, 3000);
        }
      } else {
        setShowMessage('Credenciales incorrectas o no se recibió el rol');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setShowMessage('Error en la respuesta del servidor');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg" style={{ width: '400px', paddingTop: '20px' }}>
        <div className="text-center">
          <i className="fas fa-user-circle fa-3x mb-3 user-icon"></i>
          <h2 className="mb-4">Iniciar Sesión</h2>
        </div>

        {/* Mensaje de éxito */}
        {showMessage && (
          <div className="alert alert-success text-center" role="alert">
            {showMessage}
          </div>
        )}

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary d-flex justify-content-center align-items-center mx-auto" style={{ width: '350px' }}>
              Iniciar Sesión
            </button>
          </form>
          <div className="text-center mt-3">
            <a href="#" className="text-muted">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="text-center mt-3">
            <span className="text-muted">¿No tienes una cuenta? </span>
            <Link to="/register" className="text-primary">Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;

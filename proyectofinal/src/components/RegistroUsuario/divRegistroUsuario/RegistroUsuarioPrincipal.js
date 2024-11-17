import React, { useState } from 'react';
import './RegistrarUsuario.css';

function RegistrarUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '', // Cambiado de email a correo
    password: '',
    confirmPassword: '',
    direccion: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.correo) newErrors.correo = 'El correo es obligatorio';
    if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/api/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            correo: formData.correo, // Asegúrate de que este campo coincida con el modelo del backend
            password: formData.password,
            direccion: formData.direccion,
            telefono: formData.telefono,
            role: 'user' // El rol predeterminado es 'user'
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Usuario registrado exitosamente');
          setFormData({
            nombre: '',
            correo: '', // Cambiado de email a correo
            password: '',
            confirmPassword: '',
            direccion: '',
            telefono: ''
          });
        } else {
          // Si hay error, muestra un mensaje adecuado
          alert(data.mensaje || 'Error en el registro');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Hubo un error al registrar el usuario');
      }
    }
  };

  return (
    <div className="containerRegistro">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            name="correo" // Cambiado de email a correo
            className="form-control"
            value={formData.correo}
            onChange={handleChange}
          />
          {errors.correo && <p className="text-danger">{errors.correo}</p>}
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>Confirmación de Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
          />
          {errors.direccion && <p className="text-danger">{errors.direccion}</p>}
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarUsuario;

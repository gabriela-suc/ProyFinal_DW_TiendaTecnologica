import React, { useState } from 'react';
import { useCart } from './CartContext'; // Asegúrate de que useCart esté importado
import './Pago.css'; // Archivo de estilos

const Pago = () => {
  const { cartItems, calculateTotal, reduceStock, clearCart } = useCart(); // Destructuramos reduceStock
  const [formData, setFormData] = useState({
    direccion: '',
    numeroTarjeta: '',
    fecha: new Date().toLocaleDateString(), // Fecha actual
    nit: '',
    nombreFactura: '',
  });

  // Función para manejar los cambios de los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para simular el pago
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length > 0) {
      reduceStock(); // Llamamos a reduceStock para actualizar el stock
      clearCart(); // Llamamos a clearCart para vaciar el carrito
      alert('¡Pago realizado con éxito! El stock ha sido actualizado y el carrito está vacío.');
    } else {
      alert('No hay productos en el carrito para procesar el pago.');
    }
  };

  return (
    <div className="pago-container">
      <h1>Formulario de Pago</h1>

      <form onSubmit={handleSubmit} className="form-pago">
        {/* Campo para Dirección */}
        <div className="campo">
          <label htmlFor="direccion">Dirección de Envío:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo para Número de Tarjeta */}
        <div className="campo">
          <label htmlFor="numeroTarjeta">Número de Tarjeta:</label>
          <input
            type="text"
            id="numeroTarjeta"
            name="numeroTarjeta"
            value={formData.numeroTarjeta}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo para Fecha de vencimiento de la tarjeta */}
        <div className="campo">
          <label htmlFor="fecha">Fecha (Vencimiento):</label>
          <input
            type="month"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo para NIT */}
        <div className="campo">
          <label htmlFor="nit">NIT:</label>
          <input
            type="text"
            id="nit"
            name="nit"
            value={formData.nit}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo para nombre de la factura */}
        <div className="campo">
          <label htmlFor="nombreFactura">A nombre de la factura:</label>
          <input
            type="text"
            id="nombreFactura"
            name="nombreFactura"
            value={formData.nombreFactura}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Mostrar productos en el carrito */}
        <div className="productos">
          <h3>Productos en el carrito:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="producto-pago">
                <img src={item.imagenes[0]} alt={item.titulo} className="producto-image" />
                <div>
                  <p>{item.titulo}</p>
                  <p>Precio: Q.{item.precio}</p>
                  <p>Cantidad: {item.cantidad}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mostrar el total */}
        <div className="total-pago">
          <h3>Total a Pagar: Q.{calculateTotal()}</h3>
        </div>

        {/* Botón para simular el pago */}
        <button type="submit" className="btn-pagar">
          Realizar Pago
        </button>
      </form>
    </div>
  );
};

export default Pago;

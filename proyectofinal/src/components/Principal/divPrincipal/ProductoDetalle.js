import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../Carrito/CarritoCompra/CartContext';
import './divPrincipal.css';

const ProductoDetalle = ({ productos }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Nuevo estado para la cantidad seleccionada
  const { addToCart } = useCart();

  useEffect(() => {
    const productoEncontrado = productos.find((prod) => prod._id === id);
    setProducto(productoEncontrado);
  }, [id, productos]);

  if (!producto) return <div>Producto no encontrado</div>;

  const handleAgregarACarrito = () => {
    if (cantidad > 0 && cantidad <= producto.cantidad_stock) {
      addToCart({ ...producto, cantidad });
      alert(`Has añadido ${cantidad} ${producto.nombre} al carrito.`);
    } else {
      alert('Cantidad no válida.');
    }
  };

  return (
    <div className="producto-detalle">
      <img src={producto.imagenes[0]} alt={producto.nombre} className="imagen-grande" />
      <div className="info">
        <h1>{producto.nombre}</h1>
        <p className="precio-detalle">Precio: Q.{producto.precio}</p>
        <p>{producto.descripcion}</p>
        <p>Stock disponible: {producto.cantidad_stock}</p>
        <div>
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            min="1"
            max={producto.cantidad_stock}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <button onClick={handleAgregarACarrito}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductoDetalle;

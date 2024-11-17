import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Carrito/CarritoCompra/CartContext';
import './divPrincipal.css';

const DivPrincipal = ({ titulo, imagenes, informacion, id, precio }) => {
  console.log(precio); // Verifica que el precio se pasa correctamente

  const [imagenActual, setImagenActual] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const handleImageClick = () => {
    navigate(`/producto/${id}`);
  };

  const handleAddToCart = () => {
    const producto = { id, titulo, imagenes, informacion, precio }; // Incluye el precio en el producto
    addToCart(producto); // Añade el producto con el precio al carrito
    alert(`Has añadido ${titulo} al carrito.`);
  };

  return (
    <div className="div-principal">
      <h1 className="titulo" dangerouslySetInnerHTML={{ __html: titulo }} />
      <div className="imagen-carrusel">
        <button onClick={anteriorImagen} className="flecha-izquierda">{"<"}</button>
        <img
          src={imagenes[imagenActual]}
          alt={`Imagen ${imagenActual + 1}`}
          className="imagen-pequena"
          onClick={handleImageClick}
        />
        <button onClick={siguienteImagen} className="flecha-derecha">{">"}</button>
      </div>
      
      <div className="informacion" dangerouslySetInnerHTML={{ __html: informacion }} />
      
      {/* Muestra el precio debajo de las características */}
      <p className="precio">Precio: Q.{precio || "Precio no disponible"}</p>

      {/* Botón para agregar al carrito */}
      <button onClick={handleAddToCart} className="boton-añadir">Añadir al carrito</button>
    </div>
  );
};

export default DivPrincipal;



import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';  // Verifica que 'style.css' esté en la misma carpeta que 'Inicio.js'
import './divCarrusel.css';  // Verifica que 'divCarrusel.css' esté en la misma carpeta que 'Inicio.js'

// Importación de imágenes, asegúrate de que estas imágenes estén en la misma carpeta que 'Inicio.js'
import foto1 from './foto1.jpg';
import foto2 from './foto2.jpg';
import foto3 from './foto3.jpg';

const images = [foto1, foto2, foto3];

const Inicio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const siguiente = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const anterior = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="inicio">
      <div className="carrusel">
        <button className="carrusel-izq" onClick={anterior}>
          &#10094;
        </button>
        <img src={images[currentIndex]} alt="carrusel" className="carrusel-img" />
        <button className="carrusel-der" onClick={siguiente}>
          &#10095;
        </button>
      </div>
      {/* Agrega aquí cualquier otro contenido adicional */}
    </div>
  );
};

export default Inicio;

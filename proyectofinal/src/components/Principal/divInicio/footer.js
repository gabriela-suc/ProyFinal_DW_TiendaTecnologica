// src/components/Principal/Footer.js
import React from 'react';
import './footer.css';  // Importa el archivo de estilos para el footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Tu Tienda. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/about" className="footer-link">Sobre Nosotros</a>
          <a href="/contact" className="footer-link">Contacto</a>
          <a href="/privacy" className="footer-link">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

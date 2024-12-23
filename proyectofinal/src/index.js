import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './components/Carrito/CarritoCompra/CartContext'; // Asegúrate de importar el CartProvider

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


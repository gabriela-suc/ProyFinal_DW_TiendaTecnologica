// Cart.js
// Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Carrito/CarritoCompra/CartContext'; // Importamos el hook del contexto
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, calculateTotal } = useCart();  // Ahora accedemos a setCartItems y calculateTotal desde el contexto

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <p className="empty-cart-message">Tu carrito está vacío.</p>;
  }

  const removeFromCart = (productId) => {
    console.log('Eliminando producto con id:', productId); 
    const newCart = cartItems.filter(item => item.id !== productId); 
    console.log('Nuevo carrito después de eliminar:', newCart); 
    setCartItems(newCart); 
  };

  const handleCheckout = () => {
    navigate('/pago');
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      <ul className="cart-items-list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.imagenes[0]} alt={item.titulo} className="cart-item-image" />
            <div className="cart-item-info">
              <h2 className="cart-item-title">{item.titulo}</h2>
              <p className="cart-item-price">Precio: Q.{item.precio}</p>
              <p className="cart-item-description" dangerouslySetInnerHTML={{ __html: item.informacion }} />
              <p className="cart-item-quantity">Cantidad: {item.cantidad}</p>
              <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total: Q.{calculateTotal()}</h3>
      </div>

      <button className="checkout-button" onClick={handleCheckout}>
        Realizar Pedido
      </button>
    </div>
  );
};

export default Cart;

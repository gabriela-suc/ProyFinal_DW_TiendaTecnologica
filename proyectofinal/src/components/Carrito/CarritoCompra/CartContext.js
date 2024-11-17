import React, { createContext, useState, useContext } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado para las solicitudes HTTP

const CartContext = createContext();

export const CartProvider = ({ children, productos, setProductos }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito con la cantidad seleccionada
  const addToCart = (producto) => {
    const existingProduct = cartItems.find(item => item.id === producto.id);

    if (!producto.cantidad) {
      producto.cantidad = 1;
    }

    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + producto.cantidad }
          : item
      ));
    } else {
      setCartItems([...cartItems, producto]);
    }
  };

  // Función para calcular el total de todos los productos en el carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * (item.cantidad || 0)), 0).toFixed(2);
  };

  // Reducir el stock localmente y actualizar la base de datos
  const reduceStock = async () => {
    setProductos((prevProducts) => {
      return prevProducts.map((product) => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
          return { 
            ...product, 
            stock: Math.max(product.stock - cartItem.cantidad, 0) 
          };
        }
        return product;
      });
    });

    // Llamada al backend para actualizar el stock en la base de datos
    try {
      await Promise.all(cartItems.map(async (item) => {
        const product = productos.find(p => p.id === item.id); // Encuentra el producto original
        const nuevoStock = product ? Math.max(product.cantidad_stock - item.cantidad, 0) : 0;
        
        await axios.put(`/api/productos/${item.id}`, {
          cantidad_stock: nuevoStock,
        });
      }));
      console.log("Stock actualizado en la base de datos");
    } catch (error) {
      console.error("Error al actualizar el stock en la base de datos:", error);
    }
    

  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, calculateTotal, reduceStock, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

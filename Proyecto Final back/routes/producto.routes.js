const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// Rutas para la gestión de productos
router.post('/productos', productoController.crearProducto); // Crear producto
router.get('/productos', productoController.obtenerProductos); // Obtener todos los productos
router.get('/productos/:id', productoController.obtenerProductoPorId); // Obtener producto por ID
router.put('/productos/:id', productoController.actualizarProducto); // Actualizar producto
router.delete('/productos/:id', productoController.eliminarProducto); // Eliminar producto

module.exports = router;

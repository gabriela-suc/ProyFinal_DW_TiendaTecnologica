const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidos.controller');

// Rutas para la gestión de pedidos
router.get('/pedidos', pedidoController.getAllPedidos);
router.post('/pedido', pedidoController.addPedido);
router.get('/pedido/:id', pedidoController.getPedidoPorID);
router.put('/pedido/:id', pedidoController.updatePedido);
router.delete('/pedido/:id', pedidoController.deletePedido);
router.put('/pedido/status/:id', pedidoController.updatePedidoStatus);

module.exports = router;

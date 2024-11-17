const Pedido = require('../models/pedido.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';

// Obtener lista de todos los pedidos
exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pedidos', error });
    }
};

// Crear un nuevo pedido
exports.addPedido = async (req, res) => {
    try {
        const nuevoPedido = await Pedido.create(req.body);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el pedido', error });
    }
};

// Obtener un pedido por ID
exports.getPedidoPorID = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findById(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el pedido', error });
    }
};

// Actualizar un pedido
exports.updatePedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!pedidoActualizado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el pedido', error });
    }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(id);
        if (!pedidoEliminado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json({ mensaje: 'Pedido eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el pedido', error });
    }
};

// Actualizar el estado de un pedido
exports.updatePedidoStatus = async (req, res) => {
    const { estado } = req.body;
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByIdAndUpdate(id, { estado }, { new: true });
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido', error });
    }
};
     
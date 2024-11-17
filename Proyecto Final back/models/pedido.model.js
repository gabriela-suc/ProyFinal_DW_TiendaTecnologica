const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Hace referencia a la colección de usuarios
    required: true
  },
  productos: [
    {
      productoId: {
        type: Schema.Types.ObjectId,
        ref: 'Producto', // Hace referencia a la colección de productos
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1 // Asegura que la cantidad mínima sea 1
      }
    }
  ],
  direccionEnvio: {
    type: String,
    required: true
  },
  MetodoDePago: {
    type: String,
    enum: ['tarjeta de crédito', 'PayPal', 'otro'], // Opciones de método de pago
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'completado', 'cancelado'], // Estados posibles
    default: 'pendiente'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true,
    min: 0 // Asegura que el total no sea negativo
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);

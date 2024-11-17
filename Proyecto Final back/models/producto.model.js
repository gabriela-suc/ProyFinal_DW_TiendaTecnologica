const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0 // Validación para asegurarse de que el precio sea positivo
  },
  cantidad_stock: {
    type: Number,
    required: true,
    min: 0 // Validación para asegurarse de que el stock sea positivo
  },
  imagenes: [{ // Cambia a un arreglo de imágenes (URLs)
    type: String,
    required: true
  }],
  especificaciones: {
    pantalla: String,
    procesador: String,
    ram: String,
    almacenamiento: String
  },
  especificaciones_adicionales: [{ // Especificaciones adicionales
    key: String,
    value: String
  }]
});

module.exports = mongoose.model('Producto', ProductoSchema);

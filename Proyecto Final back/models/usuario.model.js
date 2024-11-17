const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema para Usuario
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      unique: true, // Garantiza que no haya correos duplicados
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6 // La contraseña debe tener al menos 6 caracteres
    },
    direccion: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // El rol puede ser 'user' o 'admin'
      default: 'user' // El rol predeterminado será 'user'
    }
  },
  { timestamps: true } // Agrega automáticamente campos de fecha de creación y actualización
);

// Método para hacer el hash de la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, no hace nada
  try {
    const salt = await bcrypt.genSalt(10); // Genera un salt con 10 rondas
    this.password = await bcrypt.hash(this.password, salt); // Hash de la contraseña
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar la contraseña durante la autenticación
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña proporcionada con la almacenada
};

// Crear el modelo basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

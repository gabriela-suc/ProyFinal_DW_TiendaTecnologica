const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey'; // Asegúrate de definir SECRET_KEY en tus variables de entorno

// Obtener lista de todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

// Agregar un nuevo usuario
exports.addUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al agregar usuario', error });
  }
};

// Obtener un usuario por ID
exports.getUsuarioPorID = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
};

// Autenticar usuario
exports.authenticateUser = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: 'Correo o contraseña inválidos' });

    // Verificar si la contraseña es correcta
    const esPasswordCorrecta = await usuario.comparePassword(password);
    if (!esPasswordCorrecta) return res.status(400).json({ mensaje: 'Correo o contraseña inválidos' });

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      SECRET_KEY,
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    // Enviar el token y el rol al frontend
    res.status(200).json({ token, role: usuario.role });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en la autenticación', error });
  }
};

// Actualizar el rol de un usuario
exports.putUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, { role }, { new: true });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar rol', error });
  }
};

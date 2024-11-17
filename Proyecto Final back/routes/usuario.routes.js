const express = require('express');
const router = express.Router();
const {
  getAllUsuarios,
  addUsuario,
  getUsuarioPorID,
  updateUser,
  deleteUser,
  authenticateUser,
  putUserRole
} = require('../controllers/usuario.controller');
const { checkRole } = require('../middleware/auth'); // Importa checkRole del middleware

// Mostrar todos los usuarios - Solo accesible para usuarios con rol 'user'
router.get('/usuarios', checkRole('user'), getAllUsuarios);

// Creación de usuario - No requiere autenticación
router.post('/usuario', addUsuario);

// Buscar un usuario específico - Solo accesible para usuarios con rol 'user'
router.get('/usuario/:id', checkRole('user'), getUsuarioPorID);

// Actualizar usuario - Solo accesible para admin
router.put('/usuario/:id', checkRole('admin'), updateUser);

// Eliminar usuario - Solo accesible para admin
router.delete('/usuario/:id', checkRole('admin'), deleteUser);

// Ruta de login
router.post('/user-login', authenticateUser);

// Ruta para actualizar el rol de un usuario - Solo accesible para admin
router.put('/usuarioRol/:id', checkRole('admin'), putUserRole);

module.exports = router;

console.log('Middleware auth cargado'); // Comprobación de carga de middleware

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

// Autenticación de usuario
exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo: email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const esPasswordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esPasswordCorrecta) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign({ id: usuario._id, role: usuario.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, role: usuario.role });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

// Middleware para verificar el rol del usuario
exports.checkRole = (role) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ mensaje: 'Acceso denegado: No se proporcionó token' });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ mensaje: 'Token no válido o expirado' });
            }

            // Verifica si el rol del usuario coincide con el rol requerido
            if (decoded.role !== role) {
                return res.status(403).json({ mensaje: 'No tienes permiso para acceder a este recurso' });
            }

            req.userId = decoded.id; // Guarda el id del usuario en la solicitud
            next();
        });
    };
};

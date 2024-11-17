const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Middleware para analizar solicitudes JSON

// Importar rutas de productos, usuarios y pedidos
const productoRoutes = require('./routes/producto.routes');  // Verifica los nombres de archivo
const usuarioRoutes = require('./routes/usuario.routes');    
const pedidoRoutes = require('./routes/pedidos.routes');     

// Usar rutas con prefijo /api
app.use('/api', productoRoutes);
app.use('/api', usuarioRoutes); 
app.use('/api', pedidoRoutes);

// Ruta básica para verificar el funcionamiento del servidor
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente para la gestión de productos, usuarios y pedidos!');
});

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ProductosTecnologicos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conexión a MongoDB exitosa');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está listo en el puerto ${port}`);
});

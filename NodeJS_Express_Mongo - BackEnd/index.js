const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el middleware de CORS
const { swaggerUi, swaggerSpec } = require('./swagger/Swagger'); // Importa Swagger

// Importar rutas
const cursosRoutes = require('./routes/cursos_routes');
const usuariosRoutes = require('./routes/usuarios_routes');

// Importar la función de semillas
const seedDatabase = require('./seed/seeds');

// Crear la aplicación Express
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', //reemplaza con el dominio permitido 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], //METODOS PERMITIDOS
    allowedHeaders: ['Content-Type', 'Authorization'], //encabezados permitidos
};
app.use(cors(corsOptions)); // Habilita CORS con las opciones especificadas
app.options('*', cors(corsOptions)); // Permite las opciones preflight para todos los métodos

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb+srv://miguelgomezan439:E1488fUTOuI6ePhs@cluster0.fjqxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(async () => {
        console.log('Conectado a MongoDB');

        // Ejecutar la siembra de la base de datos
        await seedDatabase();

        // Middleware
        // Carga el certificado SSL y la clave privada
        const options = {
            key: fs.readFileSync(path.join(__dirname, 'ssl', 'privatekey.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem')),
        };
        app.use(express.json()); // Middleware para parsear JSON
        app.use(express.urlencoded({ extended: true }));

        // Rutas de la aplicación
        app.use('/api/cursos', cursosRoutes);
        app.use('/api/usuarios', usuariosRoutes);

        // Manejo de errores
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Algo salió mal!');
        });

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;

        https.createServer(options, app).listen(PORT, () => {
            console.log('API Rest OK y ejecutándose...');
            console.log('Servidor https corriendo en https://localhost:3000');
        });
    })
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));

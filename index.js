const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://miguelgomezan439:<G2ul5mqXBwz3InTM>@cluster0.fjqxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar a MongoDB...', err));

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Cursos y Usuarios',
            version: '1.0.0',
            description: 'Documentación de la API de Cursos y Usuarios'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
    },
    apis: ['./controllers/*.js'], // Aquí es donde defines qué archivos contienen anotaciones Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoints
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

// Inicio del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API REST ejecutándose en el puerto ${port}...`);
});

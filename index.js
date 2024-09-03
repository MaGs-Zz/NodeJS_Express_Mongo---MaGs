const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');

const express = require('express');
const mongoose = require('mongoose');

// Configuración de la conexión a la base de datos MongoDB
const uri = 'mongodb+srv://miguelgomezan439:<TeABxr954XxoYuBE>@cluster0.fjqxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conectar a MongoDB
mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.error('No se pudo conectar con MongoDB:', err));

// Configuración de Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// end points(recursos)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API REST OK, y ejecutándose en el puerto ${port}...`);
});

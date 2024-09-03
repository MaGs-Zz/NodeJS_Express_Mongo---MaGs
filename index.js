const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');


const express = require('express');
const mongoose = require('mongoose');

// conexion a la base de datos mongodb 'mongodb://localhost:27017'
mongoose.connect( 'mongodb+srv://miguelgomezan439:<G2ul5mqXBwz3InTM>@cluster0.fjqxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'  , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongo...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


    // middleware
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));


    // end points(recursos)
    app.use('/api/usuarios', usuarios);
    app.use('/api/cursos', cursos);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log('Api REST OK, y ejecutandose...');

    })
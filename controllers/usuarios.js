const express = require('express');
const logic = require('../logic/usuario_logic');
const schema = require('../validaciones/usuarios_validations').schema; // Importa el schema correctamente
const ruta = express.Router();

// Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;

    // Usar el schema para validar los datos de entrada
    const { error, value } = schema.validate(body); // Validar todos los campos del body
    if (!error) {
        let resultado = logic.crearUsuario(body);

        resultado.then(user => {
            res.json({ valor: user });
        }).catch(err => {
            res.status(400).json({ err });
        });
    } else {
        res.status(400).json({ error: error.details }); // Devolver detalles del error de validación
    }
});

// Endpoint de tipo PUT para actualizar los datos del usuario
ruta.put('/:email', (req, res) => {
    const { error, value } = schema.validate(req.body); // Validar todos los campos del body

    if (!error) {
        let resultado = logic.actualizarUsuario(req.params.email, req.body);

        resultado.then(valor => {
            res.json({ valor });
        }).catch(err => {
            res.status(400).json({ err });
        });
    } else {
        res.status(400).json({ error: error.details });
    }
});

// Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        });
    }).catch(err => {
        res.status(400).json({
            err
        });
    });
});

// Endpoint de tipo GET para listar todos los usuarios activos
ruta.get('/', async (req, res) => {
    try {
        let resultado = logic.listarUsuarioActivos();
        resultado.then(usuarios => {
            res.json(usuarios);
        }).catch(err => {
            res.status(400).json({ err });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = ruta;

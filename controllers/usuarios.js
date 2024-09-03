const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.json('Respuesta a peticion GET de CURSOS funcionando correctamente...');

});

// Definir el esquema de validación para el usuario
const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required().pattern(/^[A-Za-záéíóú ]{3,30}$/),
    password: Joi.string().min(3).max(30).optional().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    // Validar los datos usando Joi
    const { error } = schema.validate(body);
    if (error) {
        throw new Error(`Validación fallida: ${error.details.map(detail => detail.message).join(', ')}`);
    }

    // Verificar si el email ya existe
    const existingUsuario = await Usuario.findOne({ email: body.email });
    if (existingUsuario) {
        throw new Error('El correo electrónico ya está registrado.');
    }

    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password
    });

    return await usuario.save();
}
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

// Función asíncrona para actualizar un usuario
async function actualizarUsuario(email, body) {
    // Validar los datos usando Joi
    const { error } = schema.validate(body);
    if (error) {
        throw new Error(`Validación fallida: ${error.details.map(detail => detail.message).join(', ')}`);
    }

    // Verificar si el nuevo email ya existe (si es que se intenta cambiar el email)
    if (body.email && body.email !== email) {
        const existingUsuario = await Usuario.findOne({ email: body.email });
        if (existingUsuario) {
            throw new Error('El nuevo correo electrónico ya está registrado.');
        }
    }

    let usuario = await Usuario.findOneAndUpdate(
        { email: email },
        { $set: { nombre: body.nombre, password: body.password, email: body.email || email } },
        { new: true }
    );

    if (!usuario) {
        throw new Error('Usuario no encontrado.');
    }

    return usuario;
}
module.exports = ruta;
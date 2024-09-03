const express = require('express');
const logic = require('../logic/usuario_logic');
const schema = require('../validaciones/usuarios_validations').schema; // Importa el schema correctamente
const ruta = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valor:
 *                   type: object
 */
ruta.post('/', (req, res) => {
    let body = req.body;

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

/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               password:
 *                 type: string
 *                 example: "nuevo_password123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valor:
 *                   type: object
 */
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

/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     summary: Desactiva un usuario
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario a desactivar
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 */
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

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos los usuarios activos
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 */
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

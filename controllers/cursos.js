const express = require('express');
const ruta = express.Router();
const Joi = require('@hapi/joi');
const logic = require('../logic/curso_logic');
const cursoSchema = require('../validaciones/cursos_validations');

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos los cursos activos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   alumnos:
 *                     type: number
 *                   calificacion:
 *                     type: number
 */
ruta.get('/', (req, res) => {  // Cambié POST por GET
    let resultado = logic.listarCursosActivos();

    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    });
});

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Curso de Node.js"
 *               descripcion:
 *                 type: string
 *                 example: "Un curso avanzado de Node.js"
 *               alumnos:
 *                 type: number
 *                 example: 50
 *               calificacion:
 *                 type: number
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 curso:
 *                   type: object
 */
ruta.post('/', (req, res) => {
    const { error } = cursoSchema.validate(req.body);  // Realizar la validación
    if (error) return res.status(400).send(error.details[0].message);  // Enviar error si la validación falla

    let resultado = logic.crearCurso(req.body);

    resultado.then(curso => {
        res.json({ curso });
    }).catch(err => {
        res.status(400).json({ err });
    });
});

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Actualiza un curso existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Curso actualizado de Node.js"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción actualizada del curso"
 *               alumnos:
 *                 type: number
 *                 example: 60
 *               calificacion:
 *                 type: number
 *                 example: 4.7
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body);

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Desactiva un curso existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso a desactivar
 *     responses:
 *       200:
 *         description: Curso desactivado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});

module.exports = ruta;

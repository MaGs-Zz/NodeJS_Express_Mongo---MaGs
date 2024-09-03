const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();


ruta.get('/', (req, res) => {
    res.json('Respuesta a peticion GET de CURSOS funcionando correctamente...');

});
// Función asíncrona para crear un curso
async function crearCurso(body) {
    // Validar los datos del curso
    const { error, value } = cursoSchema.validate(body);
    if (error) {
        throw new Error(`Validación fallida: ${error.message}`);
    }

    // Verificar si el título del curso ya existe
    const cursoExistente = await Curso.findOne({ titulo: body.titulo });
    if (cursoExistente) {
        throw new Error('El título del curso ya existe.');
    }

    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });

    return await curso.save();
}
// Endpoint de tipo POST para el recurso CURSOS
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

module.exports = ruta;
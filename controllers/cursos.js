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
// Endpoint de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body);  // Aquí debes asegurarte de usar 'logic'

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});

// Función asíncrona para actualizar un curso
async function actualizarCurso(id, body) {
    // Validar los datos del curso
    const { error, value } = cursoSchema.validate(body);
    if (error) {
        throw new Error(`Validación fallida: ${error.message}`);
    }

    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion,
            alumnos: body.alumnos,
            calificacion: body.calificacion
        }
    }, { new: true });
    
    if (!curso) {
        throw new Error('Curso no encontrado.');
    }

    return curso;
}

// Endpoint para desactivar un curso (DELETE)
ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);  // Asegúrate de usar 'logic.desactivarCurso'

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});


// Función asíncrona para desactivar un curso
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });

    if (!curso) {
        throw new Error('Curso no encontrado.');
    }

    return curso;
}
module.exports = ruta;
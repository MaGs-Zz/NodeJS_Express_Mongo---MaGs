const Curso = require('../models/curso_model');
const cursoSchema = require('../validaciones/cursos_validations');

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

// Función asíncrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({ estado: true });
    return cursos;
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
};

const Joi = require('@hapi/joi');


const cursoSchema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-z0-9\s]{3,100}$/),
    descripcion: Joi.string()
        .max(500)
        .optional()
        .pattern(/^[A-Za-z0-9\s.,!?]{0,500}$/),
    alumnos: Joi.number()  // Cambiar aquí para aceptar un número en lugar de un array
        .required(),
    calificacion: Joi.number()
        .min(0)
        .max(10)
        .required()
});

module.exports = cursoSchema;  // Exporta solo el esquema, no un objeto

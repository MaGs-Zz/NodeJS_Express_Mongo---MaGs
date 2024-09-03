const Joi = require('@hapi/joi');

// Definir el esquema de validación para el usuario
const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required().pattern(/^[A-Za-záéíóú ]{3,30}$/),
    password: Joi.string().min(3).max(30).optional().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});


// Validación para el email en la URL
const emailSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
        .required()
});

module.exports = {
    schema
}

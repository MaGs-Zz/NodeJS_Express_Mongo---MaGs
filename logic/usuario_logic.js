const Usuario = require('../models/usuario_model');
const schema = require('../validaciones/usuarios_validations').schema; // Importa el schema correctamente

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

// Función asíncrona para desactivar un usuario
async function desactivarUsuario(email) {
    try {
        let usuario = await Usuario.findOneAndUpdate(
            { email: email },
            { $set: { estado: false } },
            { new: true }
        );
        return usuario;
    } catch (error) {
        throw new Error('Error al desactivar el usuario: ' + error.message);
    }
}

// Función asíncrona para listar todos los usuarios activos
async function listarUsuarioActivos() {
    let usuarios = await Usuario.find({ estado: true });
    return usuarios;
}

module.exports = {
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuarioActivos
};

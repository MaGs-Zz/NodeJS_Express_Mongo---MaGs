const { required, boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    Imagen: {
        type: String,
        required: false
    }
});

// Asegúrate de exportar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);

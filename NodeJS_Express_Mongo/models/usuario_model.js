const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
<<<<<<< HEAD:models/usuario_model.js
email: {
type:String,
required: true
},
nombre: {
type:String,
required:true
},
password: {
type:String,
required: true
},
estado: {
type: Boolean,
default: true
},
imagen: {
type: String,
required: false
},
cursos: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Curso', // Referencia al modelo Curso
required:false
}]
=======
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso', // Referencia al modelo Curso
        required: false
    }]
>>>>>>> main:NodeJS_Express_Mongo/models/usuario_model.js
});
module.exports = mongoose.model('Usuario', usuarioSchema);
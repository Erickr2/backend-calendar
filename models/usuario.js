const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

//exporto el model y le paso el nombre del modelo y el schema del modelo
module.exports = model('Usuario', UsuarioSchema);
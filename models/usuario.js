const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }

});

//exporto el model y le paso el nombre del modelo y el schema del modelo
module.exports = model('Usuario', UsuarioSchema);
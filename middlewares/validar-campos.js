//este es un custom middleware que me ayuda a optimizar la validacion de mis peticiones
const { response } = require('express');
const { validationResult } = require('express-validator');

//next es una callback que se va ejecutar si el middleware se ejecuta correctamente
const validarCampos = (req, res = response, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
};

module.exports = {
    validarCampos
};